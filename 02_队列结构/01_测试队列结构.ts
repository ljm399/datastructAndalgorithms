import queueArray from "./01_实现队列结构-数组";
import queueLink from "./02_实现队列结构-链表";
const queue1 = new queueArray<string>()
queue1.enqueue('cao')
queue1.enqueue("wbd")
queue1.enqueue("faker")

console.log(queue1.dequeue());
console.log(queue1.peek());
console.log(queue1.isempty());
console.log(queue1.size);

const queue2 = new queueLink<number>()
queue2.enqueue(100)
queue2.enqueue(200)
queue2.enqueue(300)

console.log(queue2.dequeue());
console.log(queue2.peek());
console.log(queue2.isempty());
console.log(queue2.size);

