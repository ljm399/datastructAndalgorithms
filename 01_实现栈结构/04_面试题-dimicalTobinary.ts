import { ArrayStack } from "./01_实现栈结构_数组.ts"
function dimicalToBinary(num:number):string { //为什么会是string呢
    const stack1 = new ArrayStack<number>()
    let binaryNum = 0
    let result = ''
    // 计算
    while (num > 0) { 
        const binary = num % 2
        stack1.push(binary)
        num = Math.floor(num/2)
    }

    // 输出（出栈）
    while(!stack1.isEmtry()) {
        // result =+ stack1.pop() // 为什么这里的result是NAN,一，number不能给string，二，值可能是undefined
        // stack1.pop() !== undefined ? result += stack1.pop() : ''
        const value = stack1.pop()
        if (value !== undefined) {
            result += String(value)
        }

    }
    console.log(result); 
        

    return ''
}

dimicalToBinary(100)
dimicalToBinary(34)