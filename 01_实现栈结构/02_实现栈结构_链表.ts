// 由于栈结构数组和链表实现的方法都一样，所以用接口然后实现接口；而不是继承类，因为这样就不能对接口的方法进行补充
import type stack from "./03_栈结构接口.ts";
// 导入导出出现问题，因为是默认导出
class stackLink<T> implements stack<T> {
    isempty(): boolean {
        throw new Error("Method not implemented.");
    }
    private data:T[] = []

    // 增
    push(element:T):void { // 这个有报错：
        this.data.push(element)
    }

    // 删
    pop():T | undefined { 
        return this.data.pop()
    }

    // 看栈顶元素
    peek(): T | undefined {
        return this.data[this.data.length-1]
    }

    // 判断是否为空
    isEmpty(): boolean {
        return this.data.length === 0
    }

    // 看栈的大小
    get size() : number {
        return this.data.length
    }
}
const stack1 = new stackLink<string>()
stack1.push('ai')
stack1.push('you')
console.log(stack1.peek());

