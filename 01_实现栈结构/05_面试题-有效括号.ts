import { ArrayStack } from "./01_实现栈结构_数组"
function isvalid(brakit:string):boolean {
    const stack = new ArrayStack<string>()
    for (let i=0; i<brakit.length; i++) {
        const bk = brakit[i]
        switch(bk) {
            case "(" :
                stack.push(")")
                break;
            case "{":
                stack.push("}")
                break;
            case "[":
                stack.push("]")
                break;
            default :
                if(bk !== stack.pop()) return false
        }
    }
    return stack.isEmtry()
}
console.log(isvalid("([]){"));
console.log(isvalid("([])"));

