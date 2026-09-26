import init, { GameStateReal } from './pkg/rayventure2_web.js';

let gameState = null;
let pendingWidth = 0;
let pendingHeight = 0;

self.onmessage = async (e) => {
    const { type, canvas, event, url } = e.data;
    if (type === 'init') {
        await init();
        console.log("WASM WebWorker thread Loaded");

        gameState = await GameStateReal.init(canvas, url);
        if (pendingWidth > 0 && pendingHeight > 0) {
            gameState.handle_resize(pendingWidth, pendingHeight);
        }
        renderRequestLoop();
    } 
    else if (type === 'raw_mouse_move') gameState.handle_mouse_move(e.data.dx, e.data.dy); 
    else if (type === 'key_input') gameState.handle_key_input(e.data.code, e.data.is_pressed); 
    else if (type === 'resize') {
            pendingWidth = e.data.width;
            pendingHeight = e.data.height;
            if (gameState) {
                gameState.handle_resize(pendingWidth, pendingHeight);
            }
    }
};

function renderRequestLoop() {
    function tick() {
        gameState.render();
        self.requestAnimationFrame(tick);
    }
    self.requestAnimationFrame(tick);
}