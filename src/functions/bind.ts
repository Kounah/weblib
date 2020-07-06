export default function bind(arg: any, target: (typeof Object), ...path: string[]) {
    // target must be an object
    if(typeof target != 'object')
        throw new Error('target is not an object');

    // there are paths
    if(path.length > 0) {
        let pivot = target;
        let history: string[] = [];
        do {
            let current = path.shift();
            switch(typeof pivot[current]) {
                case 'object':
                    pivot = pivot[current];
                    break
                case 'undefined':
                    Object.defineProperty(pivot, current, path.length > 0 ? {} : arg);
                    pivot = pivot[current];
                    break;
                default:
                    throw new Error(`cannot assign ${current} on ${history.join('>')} since it is already defined`);
            }
            history.push(current);
        } while(path.length > 0)
    } else {
        target = arg;
    }
}