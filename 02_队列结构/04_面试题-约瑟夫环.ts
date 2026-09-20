import queueArray from "./01_实现队列结构-数组"
// n 个人围成一个圆圈，从某个人开始报数，每报到第 m 个人，就把这个人杀掉，然后从下一个人继续报数，直到最后只剩下一个人。
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

