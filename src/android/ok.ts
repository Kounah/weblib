export namespace OK {
    const items: {(...args: any[]): any}[] = [];
    
    export function confirm(id: number, ...args: any[]) {
        items[id].call(null, ...args);
    }
    
    export function setup(cb: {(...args: any[]): any}): number {
        return items.push(cb) - 1;
    }
}
