declare module WL {
    interface SingleResult {
        (err: Error, model: any): void;
    }

    interface MultipleResult {
        (err: Error, models: any[]): void;
    }

    interface Result<T> {
        done(callback: T): void;
    }

    interface IQuery {
        where(query: {}): IQuery;
        skip(count: number): IQuery;
        limit(count: number): IQuery;
        sort(query: string): IQuery;
        sort(query: {}): IQuery;
        done(callback: MultipleResult): void;
    }

    interface CollectionInitializeCallback {
        (err: Error, model: Collection): void;
    }

    class Collection {
        constructor(options: {}, callback: CollectionInitializeCallback);
        findOne(filter: any): Result<SingleResult>;
        find(): IQuery;
        find(query: {}): IQuery;
        query(query: string): Result<MultipleResult>;

        create(model: {}): Result<SingleResult>;
        update(query: {}, change: {}, callback: Result<SingleResult>);
        destroy(query: {}): Result<SingleResult>;

        static extend(model: {}): any;
    }

    class CollectionStatic {
        extend(model: {}): any;
    }

    class Waterline {
        public Collection: CollectionStatic;
    }
}