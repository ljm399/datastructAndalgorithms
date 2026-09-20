import queueArray from '../02_队列结构/01_实现队列结构-数组'
//Double-Ended Queue(deque)
class deque<T> extends queueArray<T> {
    addFront(element:T):void {
        this.data.unshift(element)
    }

    removeEnd():T {
        return this.data.pop()!
    }

}
const deq = new deque()
deq.enqueue('no1')
deq.enqueue('no2')
deq.enqueue('no3')
deq.addFront('no0')
deq.addFront('no-1')

while(!deq.isempty()) {
    console.log(deq.removeEnd());
    
}

const deq2 = new deque()
deq2.enqueue('no1')
deq2.enqueue('no2')
deq2.enqueue('no3')
deq2.addFront('no0')
deq2.addFront('no-1')

console.log('----------deq2-----------');
while(!deq2.isempty()) {
    console.log(deq2.dequeue());
    
}