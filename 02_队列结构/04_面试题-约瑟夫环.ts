import queueArray from "./01_实现队列结构-数组"
function lastremaining(n:number, m:number) {
        const queue = new queueArray<string>()
        for (let i=0;i<n;i++) { // 不知道i是元素还是index，以及为什么不用in
            queue.enqueue(String(i))
        }
    
        while(queue.size>1) {
            for (let i = 1; i < m; i++) {
                const item = queue.dequeue()!
                queue.enqueue(item)
            }
            queue.dequeue()
        }
    
        return queue.dequeue()!
}
console.log(lastremaining(5,3));
console.log(lastremaining(10,17));

