import queueArray from "./01_实现队列结构-数组"
// 在数组中，不断删除数组中count的元素
function hotPotato(arr:string[], count:number):number {
    const queue = new queueArray<string>()
    for (const i of arr) { // 不知道i是元素还是index，以及为什么不用in
        queue.enqueue(i)
    }

    while(queue.size>1) {
        // 这里的i不是索引
        // 解释：count=3，则第三个就淘汰，要是i=0，则是第4个才淘汰，所以要
        for (let i = 1; i < count; i++) {
            const item = queue.dequeue() as string
            queue.enqueue(item)
        }
        queue.dequeue()
    }

    // const thatman = queue.dequeue() as string // 没有加as string就会报错
    const thatman = queue.dequeue()! // 解决办法二：用！

    const index = arr.indexOf(thatman)

    return index
}

console.log(hotPotato(['cao','li','wang','zhang', 'yang'],3));
