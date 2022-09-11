declare class FSCacheNode<TValue> {
    prev?: FSCacheNode<TValue> | null;
    next?: FSCacheNode<TValue> | null;
    key: string | null;
    value: TValue | null;
    constructor(key?: string, value?: TValue);
}
declare class FSCache<TValue> {
    private dictionary;
    private head;
    private tail;
    capacity: number;
    pattern: string;
    constructor(capacity: number, pattern: string);
    get(key: string): TValue | null | undefined;
    put(key: string, value: TValue): Map<string, FSCacheNode<TValue>> | undefined;
    getItems(): (TValue | null)[];
    private add;
    private remove;
    private updateRecent;
}
export default FSCache;
