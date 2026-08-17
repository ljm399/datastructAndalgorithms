import queueArray from "./01_实现队列结构-数组"

function hotPotato(arr:string[], count:number):number {
    const queue = new queueArray<string>()
    for (const i of arr) { // 不知道i是元素还是index，以及为什么不用in
        queue.enqueue(i)
    }

    while(queue.size>1) {
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
