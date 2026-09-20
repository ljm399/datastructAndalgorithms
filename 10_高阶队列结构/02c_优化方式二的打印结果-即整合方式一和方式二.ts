import Heap from "../09_堆结构heap/07_堆结构heap-打印堆结构"
// 优化前一次优化的打印结果，使打印结果更加全面
// 但优先队列拿到的本来就只有name罢了，具体优先级不用展示，所以优先以02b_实现方式二.ts为主
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
    dequeue():PQNode<T> | undefined {
        return this.newHeap.extract() //为什么这样写报错
    }
    isEmpty():boolean {
        return this.newHeap.isEmpty()
    }
    peek():PQNode<T>|null {
        return this.newHeap.peek()// 这个一样
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
newPQ.enqueue(123,142)
newPQ.print()
while(!newPQ.isEmpty()) {
    console.log(newPQ.dequeue());
}