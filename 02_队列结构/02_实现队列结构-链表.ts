import queue from "./队列接口";

class Node<T> {
    value: T;
    next: Node<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

export default class queueLink<T> implements queue<T> {
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;
    private length = 0;

    enqueue(element: T): void {
        const newNode = new Node(element);

        if (this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
    }

    dequeue(): T | undefined {
        if (this.head === null) return undefined;

        const currentHead = this.head;
        this.head = currentHead.next;
        this.length--;

        if (this.head === null) {
            this.tail = null;
        }

        return currentHead.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }

    get size(): number {
        return this.length;
    }

    isempty(): boolean {
        return this.length === 0;
    }
}
