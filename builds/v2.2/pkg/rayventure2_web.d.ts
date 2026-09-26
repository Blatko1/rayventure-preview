/* tslint:disable */
/* eslint-disable */

export function run(): Promise<void>;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly run: () => void;
    readonly wasm_bindgen__closure__destroy__h99f14842fbc346a0: (a: number, b: number) => void;
    readonly wasm_bindgen__closure__destroy__h92e83bf85e4e06e7: (a: number, b: number) => void;
    readonly wasm_bindgen__closure__destroy__h27324cc845f1c71d: (a: number, b: number) => void;
    readonly wasm_bindgen__closure__destroy__hf986f73f30db26a2: (a: number, b: number) => void;
    readonly wasm_bindgen__convert__closures_____invoke__hbf1448195ad1540e: (a: number, b: number, c: any, d: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h1b27c539c3ef025a: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h036e79fcb2006e36: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__he4b7331575e9188b: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__hfc374ae55df19ade: (a: number, b: number) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h51e45ffd400b371c: (a: number, b: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
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
