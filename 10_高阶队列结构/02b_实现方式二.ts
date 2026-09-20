import Heap from "../09_堆结构heap/07_堆结构heap-打印堆结构"
class PQNode<T> {
    name:T
    priority:number
    constructor(name:T,priority:number) {
        this.name = name
        this.priority = priority
    }
    valueOf() {
        return this.priority
    }
}

class priorityQueue<T> {
    private newHeap: Heap<PQNode<T>> = new Heap()
    enqueue(name:T,value:number) {
        const newNode = new PQNode(name,value)
        this.newHeap.insert(newNode)
    }
    dequeue():T | undefined {
        return this.newHeap.extract()?.name //为什么这样写报错
    }
    isEmpty():boolean {
        return this.newHeap.isEmpty()
    }
    peek():T|undefined {
        return this.newHeap.peek()?.name // 这个一样
    }
    size():number {
        return this.newHeap.size()
    }
    print() {
        this.newHeap.print()
    }
}
// const p1 = new PQNode('cao',140)
// const p2 = new PQNode('mj',141)
// const p3 = new PQNode('mjl',142)

const newPQ = new priorityQueue()
newPQ.enqueue('cao',140)
newPQ.enqueue('mj',141)
newPQ.enqueue('mjl',142)
newPQ.print()
while(!newPQ.isEmpty()) {
    console.log(newPQ.dequeue());
}