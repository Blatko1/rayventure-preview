console.log("Starting...");

const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });

worker.onerror = (err) => console.error("Worker error:", err);

const canvas = document.getElementById('canvas');
const offscreen = canvas.transferControlToOffscreen();

worker.postMessage({ 
    type: 'init',             
    canvas: offscreen,
    url: window.location.href
}, [offscreen]);

const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        const box = entry.devicePixelContentBoxSize?.[0];
        const width = box ? box.inlineSize : Math.round(entry.contentRect.width * devicePixelRatio);
        const height = box ? box.blockSize : Math.round(entry.contentRect.height * devicePixelRatio);
    
        console.log("width ", width, " height ", height);
        worker.postMessage({ type: 'resize', width, height });
    }
});

//TODO doing this creates new eventListeners but never cleans them up
function watchDevicePixelRatio(onChange) {
    const query = matchMedia(`(resolution: ${devicePixelRatio}dppx)`);
    query.addEventListener('change', () => {
        onChange(devicePixelRatio);
        watchDevicePixelRatio(onChange); // re-arm for the *new* DPR value
    }, { once: true });
}

watchDevicePixelRatio((dpr) => {
    // re-run the same size calculation you use in ResizeObserver
    const rect = canvas.getBoundingClientRect();
    const width = Math.round(rect.width * dpr);
    const height = Math.round(rect.height * dpr);
    console.log("pxRatioChange: ", width, " ", height)
    worker.postMessage({ type: 'resize', width, height });
});
  
resizeObserver.observe(canvas);

canvas.addEventListener('click', () => {
    if (document.pointerLockElement !== canvas) {
        canvas.requestPointerLock({
            // TODO maybe this fixes the large mouse spikes?
            // TODO decide if true or false. maybe give the player an option to change this
            unadjustedMovement: false,
        });
    }
});

let accumulatedDx = 0;
let accumulatedDy = 0;
let isFrameScheduled = false;

document.addEventListener('mousemove', (e) => {
    if (document.pointerLockElement === canvas) {
        accumulatedDx += e.movementX;
        accumulatedDy += e.movementY;
    
        if (!isFrameScheduled) {
            isFrameScheduled = true;
            requestAnimationFrame(flushMouseInput);
        }
    }
});

function flushMouseInput() {
    if (accumulatedDx !== 0 || accumulatedDy !== 0) {
        worker.postMessage({
            type: 'raw_mouse_move',
            dx: accumulatedDx,
            dy: accumulatedDy,
        });
    
        accumulatedDx = 0;
        accumulatedDy = 0;
    }
    
    isFrameScheduled = false;
}

function handleKeyDown(e) {
    e.preventDefault();
    // Ignore repeat key events triggered by holding down a key
    if (e.repeat) return;
    
    worker.postMessage({
        type: 'key_input',
        code: e.code,
        is_pressed: true,
    });
}

function handleKeyUp(e) {
    worker.postMessage({
        type: 'key_input',
        code: e.code,
        is_pressed: false,
    });
}

window.addEventListener('keydown', handleKeyDown);
  
window.addEventListener('keyup', handleKeyUp);

worker.onmessage = (e) => {
    if (e.data.type === 'CLOSE_GAME') {
        if (document.pointerLockElement) {
            document.exitPointerLock();
        }
        worker.terminate();
        console.log("Ended WASM worker");
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    }
  };