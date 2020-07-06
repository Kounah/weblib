import { Log } from "./log";

export namespace Resource {
    export let host = 'http://localhost:25252';

    const resources: {[U: string]: string} = {};
    const __tag = 'resource-function';

    export function load(key: string, cb: {(result: string): void}) {
        Log.tag(__tag).v(`trying to find resource for key ${key}`);
        if(typeof resources[key] === 'string') {
            const result = resources[key]
            Log.tag(__tag).v(`found in cache: ${result}`);
            if(typeof cb === 'function') cb(result);
            return result;
        }

        const request = new XMLHttpRequest();
        const url = host + '/resource?key=' + encodeURIComponent(key);
        Log.tag(__tag).d(`loading XMLHttpRequest from ${url}`);
        request.open('GET', url);
        // request.setRequestHeader('cache-control', 'no-cache, must-revalidate, post-check=0, pre-check=0');
        // request.setRequestHeader('cache-control', 'max-age=0');
        // request.setRequestHeader('expires', '0');
        // request.setRequestHeader('expires', 'Tue, 01 Jan 1980 1:00:00 GMT');
        // request.setRequestHeader('pragma', 'no-cache');
        request.onload = function(ev) {
            Log.tag(__tag).v(`resource server responded with: [${this.status} ${this.statusText}] ${this.responseText}`);
            resources[key] = this.responseText;

            if(typeof cb === 'function')
                cb(this.responseText);
        };
        request.send();
    }
}