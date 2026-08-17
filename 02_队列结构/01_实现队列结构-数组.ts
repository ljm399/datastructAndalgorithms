import queue from "./队列接口";
export default class queueArray<T> implements queue<T> {
    private data:T[] = []
    enqueue(element: T): void {
        this.data.push(element)
    }
    dequeue(): T | undefined {
        return this.data.shift()
    }
    peek(): T | undefined {
        return this.data[0]
    }
    get size(): number {
        return this.data.length
    }
    isempty(): boolean {
        return this.data.length === 0
    }

}