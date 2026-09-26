/* tslint:disable */
/* eslint-disable */

export class GameStateReal {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    exit(): void;
    handle_key_input(code: string, is_pressed: boolean): void;
    handle_mouse_move(dx: number, dy: number): void;
    handle_resize(width: number, height: number): void;
    static init(offscreen_canvas: OffscreenCanvas, url: string): Promise<GameStateReal>;
    render(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_gamestatereal_free: (a: number, b: number) => void;
    readonly gamestatereal_exit: (a: number) => void;
    readonly gamestatereal_handle_key_input: (a: number, b: number, c: number, d: number) => void;
    readonly gamestatereal_handle_mouse_move: (a: number, b: number, c: number) => void;
    readonly gamestatereal_handle_resize: (a: number, b: number, c: number) => void;
    readonly gamestatereal_init: (a: any, b: number, c: number) => any;
    readonly gamestatereal_render: (a: number) => void;
    readonly wasm_bindgen_e6416b7953859f04___convert__closures_____invoke___js_sys_616b7789ca7f1e60___Function_fn_wasm_bindgen_e6416b7953859f04___JsValue_____wasm_bindgen_e6416b7953859f04___sys__Undefined___js_sys_616b7789ca7f1e60___Function_fn_wasm_bindgen_e6416b7953859f04___JsValue_____wasm_bindgen_e6416b7953859f04___sys__Undefined_______true_: (a: number, b: number, c: any, d: any) => void;
    readonly wasm_bindgen_e6416b7953859f04___convert__closures_____invoke___wasm_bindgen_e6416b7953859f04___JsValue__core_ed718c3d60ebd546___result__Result_____wasm_bindgen_e6416b7953859f04___JsError___true_: (a: number, b: number, c: any) => [number, number];
    readonly wasm_bindgen_e6416b7953859f04___convert__closures_____invoke_______true_: (a: number, b: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_destroy_closure: (a: number, b: number) => void;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
