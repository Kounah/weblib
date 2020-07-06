export namespace NodeListHelper {
    /**
     * converts a NodeListOf<T> to T[]
     * @param list 
     */
    export function toArray<T extends Node>(list: NodeListOf<T>): T[] {
        return Array.prototype.slice.call(list) as T[];
    }

}

declare global {
    interface NodeList {
        toArray: typeof NodeListHelper.toArray
    }
}

window.NodeList.prototype.toArray = function() {
    return NodeListHelper.toArray(this);
};