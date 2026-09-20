import Heap from "../09_堆结构heap/07_堆结构heap-打印堆结构"
class PQNode {
    priority:number
    name:string
    constructor(name:string,priority:number) {
        this.name = name
        this.priority = priority
    }
    valueOf() {
        return this.priority
    }
}

class priorityQueue<T> {
    newHeap = new Heap<T>()
    enqueue(element:T) {
        this.newHeap.insert(element)
    }
    dequeue():T | undefined {
        return this.newHeap.extract()
    }
    isEmpty():boolean {
        return this.newHeap.isEmpty()
    }
    peek():T|null {
        return this.newHeap.peek()
    }
    size():number {
        return this.newHeap.size()
    }
    print() {
        this.newHeap.print()
    }
}
const p1 = new PQNode('cao',140)
const p2 = new PQNode('mj',141)
const p3 = new PQNode('mjl',142)

const newPQ = new priorityQueue()
newPQ.enqueue(p1)
newPQ.enqueue(p2)
newPQ.enqueue(p3)
newPQ.print()
while(!newPQ.isEmpty()) {
    console.log(newPQ.dequeue());
}