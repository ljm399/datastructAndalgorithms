export class ArrayStack<T>{
    private data:T[] = []

    // 增
    push(element:T):void {
        this.data.push(element)
    }

    // 删
    pop():T | undefined { // 问题感觉void|undefined不对，这里实际上没有 return，所以这个方法返回的是 void，不是 undefined。
        return this.data.pop()
    }

    // 看栈顶元素
    peek(): T | undefined {
        return this.data[this.data.length-1]
    }

    // 判断是否为空
    isEmtry(): boolean {
        return this.data.length === 0
    }

    // 看栈的大小
    get size() : number {
        return this.data.length
    }
}
// const stack1 = new ArrayStack<string>() //ts问题：怎么调用传入对应类型呢
// const stack2 = new ArrayStack<number>()
// stack1.push('cao')
// stack1.push('maiya')


// stack2.push(1)
// stack1.pop()
// console.log(stack1);
// console.log(stack1.isEmtry());
// console.log(stack1.peek());
// stack1.push('cao12')

// console.log(stack1.size());




