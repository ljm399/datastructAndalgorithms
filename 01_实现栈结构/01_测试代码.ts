import {ArrayStack} from './01_实现栈结构_数组.ts'
const stack1 = new ArrayStack<string>() //ts问题：怎么调用传入对应类型呢
const stack2 = new ArrayStack<number>()
stack1.push('cao')
stack1.push('maiya')


stack2.push(1)
stack1.pop()
console.log(stack1);
console.log(stack1.isEmtry());
console.log(stack1.peek());
stack1.push('cao12')

console.log(stack1.size());
