export namespace NodeListHelper {
    /**
     * converts a NodeListOf<T> to T[]
     * @param list 
     */
    export function toArray<TNode extends Node>(list: NodeListOf<TNode>): TNode[] {
        return Array.prototype.slice.call(list) as TNode[];
    }
}