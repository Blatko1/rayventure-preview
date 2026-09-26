# RayVenture ([Showcase](https://github.com/Blatko1/rayventure-preview))

`RayVenture2` is a game engine. It is a successor to the original `RayVenture` game engine. Check out [`pixels`](https://github.com/parasyte/pixels) which helped me learn more about this type of rendering.

Excellent explanations about the raycaster [here](https://lodev.org/cgtutor/raycasting.html#The_Basic_Idea_) and [here](https://permadi.com/1996/05/ray-casting-tutorial-table-of-contents/).

> NOTE to me: all walls and platforms are being drawn from bottom to top! 
> [Trello Board](https://trello.com/b/yev9Lj14/rayventure)

## Roadmap

### General

- Benchmark with criterion
- Remember to remove old commented-out parts
- Remember to remove unneeded TODO comments 
- Remove pub keywords where they aren't needed
- Try using less `usize` and more `u32`
- Try using less `log` and more writing text to in app UI
- Reduce amount of functions which panic
- Remove all println!() and similar functions!
- Try removing Clone derives from some types!

### 3D voxels

- [ ] Feature for drawing 3D voxel models
- [ ] more yet to come...

### Map, Levels, Rooms

- Feature for when multiple portals point to the same level, they can also reference the same room instance (the default is that each portal points to a new unique room)
- Ensure that each portal and it's potential link have the same size

## Notes 

- TB - TrenchBroom

- Vidljivi objekti u RayVenture2:
    * Imam dodane horizontalne platforme (podove i stropove) sa korektno podesivom teksturom u TB-u (offsetting, scaling, rotating)
    * Imam vertikalne zidove bilo koje orijentacije, teksture su podesive pomoću x i y pomaka (offsets), a skaliranje još nije dodano te se ne mogu rotirati što vjerojatno neće nikada ni trebati
    * Imam nakošene platforme za koje još moram testirati prikazuju li dobro, odnosno prihvatljivo, teksture. Teksture još nemaju offsetting, scaling i rotating
    * Imam cilindrične zidove kojima se može uključiti-isključiti zaobljen zid, okrugla gornja strana (pod) te okrugla donja strana (strop)

- Planiram dodati dvije vrste portala:
    * vertikalni - portali koji stoje na vertikalnim zidovima i vode do drugih vertikalnih (ili sebe)
    * horizontalni - portali koji stoje na horizontalnim platformama (pod ili strop) te vode do drugih horizontalnih (ili sebe)
    * nakošeni - stoje na nakošenim platformama te vode do drugih nakošenih portala, puno kompliciraniji i nefleksibilniji jer nisam siguran je li moguće dobiti zadovoljavajuću verziju ovih portala zbog toga jer engine nije 3D te je jedini način za pomicanje gledišta gore-dolje putem y-shearing metode, a pomoću nje nije moguće gledati savršeno gore, odnosno dolje
    * Možda čak i portali na zidu koji zamijeni strop i pod (sve naopačke) - zahtijeva promjene i u rendereru 

- Najvažnije je također dodati fiziku odnosno pravilnu koliziju s prostorom
- Dodati billboard sprite-ove (vjerojatno i prozirne sprite-ove,alpha između 0% i 100%, i neprozirne, alpha 100%)
- Dodati `particles` koji su ustvari jednobojni billboard sprite-ovi - brzi za nacrtati 

- Svjetlost:
    * Želim dodati svjetlost u igru, makar bila statična. Svaka površina bi bila podijeljena na manje kvadratiće te bi se za svaki izračunala njegova svjetlost. To bi vjerojatno uzimalo dosta memorije, ali će barem postojati nekakva vrsta svjetlosti.
    * Ipak koristiti GPU za svjetlost

- Želim dodati animaciju koja se može staviti na bilo koju površinu, ili billboard sprite.

- Za bolju kvalitetu dodati mipmaps te pomoću x gradijenta teksture kod crtanja odrediti koji mipmap level koristiti.

- Iskoristi layers u TB-u kako bi, na primjer, označio prozirne objekte i slično

- Isprobaj assert kod čitanja podataka iz teksture ili modificiranja piksela zbog brzine

- Računanjem sa f32 se mogu dobiti rezultati za EPSILON netočni od pravog rješenja, stoga se treba implementirati provjera sa EPSILON-om svugdje gdje je potrebno.

- Napraviti debug renderer pomoću kojeg se može lagano provjeriti što se renderira kao vertikalni zid, što kao horizontalni pod, a što kao nagib.

- Poboljšanja performansi:
    * iskoristiti `bvh2d` biblioteku koja je brža verzija originalne `bvh` biblioteke
    * column interlacing - iskoristiti samo za stupce blizu kraja ekrana, efekt nije previše uočljiv, ali povećava performance - **nepotreban kod manjih rezolucija!!!**
    * probati smanjiti broj alokacija memorije s obzirom da se ponovno alocira za svaki frame, npr. buffer arena
    * pronaći nove optimizacije kod samog crtanja piksela s obzirom da to uzima najviše procesorske snage
    * SIMD je nazad u igri? - probati iskoristiti SIMD za crtanje više piksela od jednom ili isprobati druge slične metode (https://docs.rs/rten-simd/latest/rten_simd/)
    * Unroll the render loop - možda se postigne automatski ako uvedem SIMD
    * korištenje `copy_rgb_f32_to_dest` je puno sporije zbog pretvaranja svakog piksela iu u8 u f32 pa nazad u u8, brže je odmah kopiranje pomoću `copy_from_slice`
    * Za sada je bez svjetlosti 60 FPS uz FullHD
    * Isprobati unsafe metode radi brzine nakon što je većina glavnih funkcija implementirano
    * VELIKA IDEJA - pakirati sve u8 podatke u jedan u32 za svaku teksturu te samo kopirati taj jedan u32 u `buffer`. S obzirom da ne modificiram piksele na CPU, nego na GPU, to bi moglo donijeti veliko ubrzanje.
    * JOŠ VEĆA IDEJA - cijeli buffer spremiti kao u32 ili f32 te s obzirom da će boje biti pakirane u u32, a pozicije već jesu f32, tada je samo potrebno napraviti maksimalno 7 kopiranja (1 za boje, 3 za poziciju, 3 za normalu)  
    * Probati upotrijebiti 3D texture za spremanje pozicija, normala, boja i dodatnih atributa
    * IDEJA - za svaki frame provjeriti koje površine su u vidnom polju, a zatim samo njih koristiti u izračunima kod svakog stupca. Uz to, spremiti prvi stupac kod kojeg se površina prvo javlja te zadnji stupac kod koje se zadnje javlja i taj podatak koristiti kod biranja koje površine uzimati u obzir za koji stupac.
    * Staviti više opcija za renderiranje kao što su: sa i bez framebuffer-a, koristiti f16 umjesto f32, isl.
    * Isprobati svjetlosne efekte opisane u LearnOpenGL tutorijalu kao što su: bloom, SSAO, teksture s normal mapping, teksture sa specular lighting
    * Imati jedan BVH za statične objekte (od trokuta), te drugi za dinamične objekte u koje spadaju trokuti i cilindri (te možda kugle). Imati buffer u kojem pišu indeksi za svaki BVH i za svjetla u pojedinoj sobi. Svaki piksel na ekranu ima indeks kojoj sobi pripada.
    * S obzirom da RogStrix laptop ne koristi diskretni GPU za Chrome, možda bi bilo dobro detektirati koji se GPU koristi i javiti igraču da proba koristiti diskretni GPU ako je moguće. 
    * S obzirom da je CPU učitava memoriju po npr 64 bajta, bolje je kod struktura za renderiranje smanjiti broj elemenata te ostaviti samo one sasvim nužne, a sve koje se ne koriste u renderiranju izbaciti u neku vanjsku strukturu.
    * Možda svaki poligon pretvoriti u triangle ili kvadrate radi jednostavnijeg spremanja? Kod računanja slope koristim dva dijeljenja, a možda je samo jedno dovoljno?
    * Umjesto unwrap() koristi ? i anyhow
    * Seems that WASM actually does support SIMD??? https://emscripten.org/docs/porting/simd.html
    * Mogu prebaciti pristup teksturama s CPU na GPU što će uvelike povećati performanse
    * Dodatno napravi testove na kompjuterima koji nemaju diskretni GPU
    * Teleportiranje vektora više puta kroz više portala nakuplja grešku tako da je bolje raditi svaku teleportaciju nekako izbjegavajući zbrajanje transformacija
    * Specular lightning je čudna gledajući kroz portal
    * https://registry.khronos.org/webgl/specs/latest/2.0/
    * Izgleda da će biti dovoljno mjesta za prebaciti sve BVH, triangle i cylinder podatke na GPU za više od 10 soba odjednom. Stoga je moguće kod svakog prolaza kroz portal ažurirati sve nizove podataka bez brige za dovoljno mjesta (max dimenzija teksture barem 4096x4096) što je daleko više nego dovoljno za barem 10 soba
    * Makni '.await' gdje tamo gdje nije potrebno


    [ ] Renderirati gornji i donji dio cilindra.
    [ ] IPAK NE OSIM AKO IMA DOBAR RAZLOG -> Ipak se prebaciti nazad na winit najnoviju verziju.
    [ ] Popraviti modificiranje tekstura (skaliranje, rotiranje) na nakošenim površinama i zidovima.
    [ ] Kada krenem dodavati portale koristiti bolji dizajn za iteraciju preko površina za renderiranje. Za svaku sobu na ekranu provjeriti koje površine su vidljive na ekranu i staviti ih u niz. Upariti RoomID sa površinama.


- Prva ideja za igru:
    * Mislio sam uzeti ideju iz igre Portal te omogućiti proizvoljno postavljanje ulaznog i izlaznog portala. Mogli bi postojati samo oni koji stoje na zidovima i oni koji stoje na podovima, a međusobno ne bi mogli voditi jedan u drugi (npr. iz zidnog u podni).
    * Igrač bi pomoću portala prolazio kroz levele, odnosno mapu i tako rješavao puzle
    * NPC-evi kojima bi igrač mogao stvarati prolaze pomoću portala i na taj način rješavao zagonetke
    * Igrač bi mogao nositi i pomicati kutije i predmete
    * Pogledati još ideje iz Portal, The Talos Principle i drugih... 
    * Ova ideja je odlična ako bi igru objavio na CoolMathGames

- Ostale ideje:
    * Escape igra slična kao Deep sleep i ostale
    * Igra u kojoj se mapa širi u beskonačnost
    


- Should I use different lightning for each side or just diffuse light?

- I did some benchmarking over functions: 
    * *render_wall()* - renders the wall with RGB data stored in structs for each pixel together with doing repeated calculations in the render loop
    * *render_wall_cached()* - renders the wall with RGB data stored in structs for each pixel where each pixel also contains cached data of the repeated calculations
    * *render_wall_linear()* - renders the wall with RGB data stored linearly in a Vec together with doing repeated calculations in the render loop

and have found that the *render_wall_cached()* function is the fastest. The repeated functions contain calculating the magnitude of a 2D vector. I have also noticed that the function with linearly stored data (*render_wall_linear()*) usually has the same performance as the *render_wall()* function.

> If there is platform texture bleeding try increasing the increasing texture coordinate by 1 or similar.  

> When building for web with `wasm-pack` use:
> ```shell
> set RUSTFLAGS=--cfg getrandom_backend="wasm_js"
> ```
> or
> ```powershell
> $env:RUSTFLAGS='--cfg getrandom_backend="wasm_js"'
> ```
> on Windows. Use when building while developing 'cargo build --target wasm32-unknown-unknown' Remove it when not building for web! Use 'wasm-pack build -t web --no-opt' when building for web (without optimizations). 

## Relevant Issues and Links

### Performance and Bugs

- https://www.youtube.com/watch?v=QQ3jr-9Rc1o
- https://lisyarus.github.io/blog/posts/point-light-attenuation.html
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

- [ ] Add voxel objects
- [ ] Add an UI
- [ ] Add removable object walls (cool opening or moving animation with voxels)
- [ ] Go unsafe for performance increase after most of the project is finished
