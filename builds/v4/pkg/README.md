# RayVenture ([Showcase](https://github.com/Blatko1/rayventure-preview))

`RayVenture` is a game engine. Check out [`pixels`](https://github.com/parasyte/pixels) which helped me learn more about this type of rendering.

Excellent explanations about the raycaster [here](https://lodev.org/cgtutor/raycasting.html#The_Basic_Idea_) and [here](https://permadi.com/1996/05/ray-casting-tutorial-table-of-contents/).

> NOTE to me: all walls and platforms are being drawn from bottom to top! 

## Roadmap

### General

- [x] Benchmark with criterion
- [x] Modify the ray traversal over tiles so it renders only the current tile (before it was rendering the current tile platforms and the next tile walls) 
- [x] Add a feature to draw on wall textures with non square dimensions
- [ ] Add lightning from a source
- [ ] Feature to make walls shrink and have variable width
- [ ] Unroll the render loops and try skipping every next pixel
- [ ] Implement SIMD functions into render loops
- [ ] Optimize the engine through benchmarking with criterion
- [ ] Rename from 'height' or 'heights' to y_pos
- [ ] Remember to remove old commented-out parts
- [ ] Remember to not leave any TODO comments after all is done 
- [ ] Go unsafe for performance increase after most of the project is finished
- [ ] Try using less `usize` and more `u32`
- [ ] Try using less `log` and more writing text to in app UI
- [ ] Reduce amount of functions which panic
- [ ] Remove all println!() and similar functions!
- [ ] Try removing Clone derives from some types!

### Gameplay

- [ ] Fix collision with floor and ceiling portals

### Sprites

- [x] Implement two types of sprites: Billboard (always facing the camera) and Fixed (not moving)
- [ ] Implement fixed sprites but as platform types in addition to wall types

### 3D voxels

- [ ] Feature for drawing 3D voxel models
- [ ] more yet to come...

### Map, Levels, Rooms

- [x] Feature for when multiple portals point to the same level, they can also reference the same room instance (the default is that each portal points to a new unique room)
- [x] Add platform portals which would appear on the floor or on the ceiling. It would take you to some other room which could potentially add a feature for multiple floors through which the player could traverse
- [ ] Ensure that each portal and it's potential link have the same height size

## Notes

- Cilindri mogu samo izvirati iz podova i iz stropova, ne mogu biti u zraku i biti normalno renderirani
- Kvadri koji bi izvirali iz podova i stropova slično kao i cilindri
- Nakošeni zidovi bi izvirali iz podova i stropova
- Leteće stvari u zraku se mogu postići sprite-ovima (imati i neprozirne sprite-ove koji se mogu puno brže renderirati)
- Možda: Stepenište kojimu bi se moglo postaviti broj stepenica, visina i smjer
- Koliko znam, nakošene podove je nemoguće dodati na raycaster način

- Should I use different lightning for each side or just diffuse light?
- Maybe there is a simpler way to deal with rotations?

- I did some benchmarking over functions: 
    * *render_wall()* - renders the wall with RGB data stored in structs for each pixel together with doing repeated calculations in the render loop
    * *render_wall_cached()* - renders the wall with RGB data stored in structs for each pixel where each pixel also contains cached data of the repeated calculations
    * *render_wall_linear()* - renders the wall with RGB data stored linearly in a Vec together with doing repeated calculations in the render loop

and have found that the *render_wall_cached()* function is the fastest. The repeated functions contain calculating the magnitude of a 2D vector. I have also noticed that the function with linearly stored data (*render_wall_linear()*) usually has the same performance as the *render_wall()* function.

If there is platform texture bleeding try increasing the increasing texture coordinate by 1 or similar.  

> When building for web with `wasm-pack` use:
> ```powershell
> set RUSTFLAGS=--cfg getrandom_backend="wasm_js"
> ```
> or
> ```powershell
> $env:RUSTFLAGS='--cfg getrandom_backend="wasm_js"'
> ```
> on Windows. Remove it when not building for web!

## Relevant Issues and Links

### Performance and Bugs

- https://www.youtube.com/watch?v=FSvyScMe_u0

* Some Rust code performance optimizations - https://users.rust-lang.org/t/rust-vs-c-vs-go-runtime-speed-comparison/104107
* Faster repeated modulo (remainder) operations - https://docs.rs/strength_reduce/latest/strength_reduce/ (search term: *rust remainder speed*)
* Faster divisions - https://crates.io/crates/quickdiv

* Compiling egui-winit with wasm-pack - https://github.com/emilk/egui/discussions/3124
* Wrong high performance device selected - https://issues.chromium.org/issues/369219127
* Reduced time Instant precision on WASM - https://issues.chromium.org/issues/369219127
* *[Fixed]* Performance drop and stutters for WASM run in Firefox - https://github.com/rust-windowing/winit/issues/3105
* Mouse movement massively slower on WASM - https://github.com/bevyengine/bevy/issues/18855
* event.movement returning odd values - https://stackoverflow.com/questions/48179912/event-movement-returning-odd-values

### Collision Detection and Resolution

* Where I first heard of AABB - https://www.youtube.com/watch?v=NNFW9wM7xU0&ab_channel=ThibsWorkshop
* Swept AABB collision explanation (non working code) - https://www.gamedev.net/tutorials/programming/general-and-gameplay-programming/swept-aabb-collision-detection-and-response-r3084/
* Swept AABB collision with Minkowski Sum - https://blog.hamaluik.ca/posts/swept-aabb-collision-using-minkowski-difference/
* Simple AABB Collision using Minkowski Difference - https://blog.hamaluik.ca/posts/simple-aabb-collision-using-minkowski-difference/
* Swept AABB implementation tutorial - https://www.youtube.com/watch?v=3dIiTo7mlnU&ab_channel=DylanFalconer
* Swept AABB collision example - https://emanueleferonato.com/2021/10/21/understanding-physics-continuous-collision-detection-using-swept-aabb-method-and-minkowski-sum/
* Swept AABB collision full working code example - https://luisreis.net/blog/aabb_collision_handling/
* Ray-Plane intersection - https://www.scratchapixel.com/lessons/3d-basic-rendering/minimal-ray-tracer-rendering-simple-shapes/ray-plane-and-ray-disk-intersection.html
* Ray-Ray intersection - https://www.gamedev.net/forums/topic/647810-intersection-point-of-two-vectors/
* Swept AABB vs Line segment 2D - https://gamedev.stackexchange.com/questions/29479/swept-aabb-vs-line-segment-2d


### Useful Tools

* Convert 360° panorama images to cubemaps: https://jaxry.github.io/panorama-to-cubemap/
* Free 360° panorama images: https://polyhaven.com/hdris, https://www.poliigon.com/hdrs?page=2

### Some old comments

- For the record, I have tried adding FXAA in the fragment shader, which ended up in a weird output, have tried MSAA, but it doesn't work on textures, have tried applying bilinear texture filtering but unnoticeable.

## Bare-bones Roadmap (deprecated)

- [x] Implement a working 2D raycaster with a specific FOV 
- [x] Draw walls out of distance values
- [x] Add textures to walls
- [x] Add special textures with half transparency or full transparency
- [x] Add textures to floor and ceiling
- [x] Add voxel objects
- [x] Add colors to voxel objects
- [x] Render objects from closest to furthest while skipping drawing over already drawn full opacity pixels in order to increase performance
- [x] Implement drawing directly in the ray casting function to avoid memory allocations and preserve performance
- [x] Add different floor and ceiling textures for different map tiles
- [x] Add an ability to look freely up and down, moving up and down
- [x] Improve how map tiles are stored, split the map into three maps, one for regular wall tiles, one for ceiling tiles and one for floor tiles
- [x] Rotate the canvas by 90 degrees so drawing is more efficient
- [x] Simplify map creation by making possible creating maps in external .txt files while following a defined format
- [x] Add portals
- [x] Add shading/lightning effects
- [x] Draw a skybox
- [x] Add different height walls while also their tops sides (floor), if seen from above, and bottom sides (ceilings), if seen from below
- [x] Reimplement voxel objects again :/
- [x] Implement a new system for generating a map of rooms instead of the old one with only *rng*.
- [x] Add collision detection (circle-rectangle collision detection)
- [x] Add an UI
- [ ] Add removable object walls (cool opening or moving animation with voxels)
- [ ] Go unsafe for performance increase after most of the project is finished
