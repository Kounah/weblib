export namespace Base64 {
    /**
     * wraps the `window.btoa` function
     * @param str input string
     */
    export function encode(str: string): string {
        return window.btoa(str);
    }
    
    /**
     * wraps the `window.atob` function
     * @param enc the base64 encoded input string
     */
    export function decode(enc: string): string {
        return window.atob(enc);
    }
}