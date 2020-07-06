export namespace Named {
    let _: {[T: string]: {(...args: any[]): void}[]} = {};
    export let error_handler: {(err: Error): void} = (err) => console.log(err);

    export function register(fn: {(...args: any[]): any}, name: string) {
        if(typeof _[name] === 'object' && Array.isArray(_[name]))
            _[name].push(fn);
        else
            _[name] = [fn];
    }
    
    export function call(thisArg: any, name: string, ...args: any[]) {
        if(typeof _[name] !== 'object' || !Array.isArray(_[name]))
            return;

        for(let fn in _[name]) {
            try {
                _[name][fn].call(thisArg, ...args);
            } catch (err) {
                if(typeof error_handler === 'function')
                    error_handler(err);
            }
        }
    }

    export function apply(thisArg: any, name: string, ...args: any[]) {
        if(typeof _[name] !== 'object' || !Array.isArray(_[name]))
            return;

        for(let fn in _[name]) {
            try {
                _[name][fn].apply(thisArg, ...args);
            } catch (err) {
                if(typeof error_handler === 'function')
                    error_handler(err);
            }
        }
    }

    export function execute(name: string, ...args: any[]) {
        if(typeof _[name] !== 'object' || !Array.isArray(_[name]))
            return;

        for(let fn in _[name]) {
            try {
                _[name][fn](...args);
            } catch (err) {
                if(typeof error_handler === 'function')
                    error_handler(err);
            }
        }
    }
}
