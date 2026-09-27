// 状态压缩
// 目前的问题就是dp这个数组保存了很多没用的值
function fib(n:number):number {
    if(n<=1) return n
    let pre:number = 0
    let cur:number = 1
    for(let i=2;i<=n;i++) {         
        const val = pre + cur
        pre = cur
        cur = val
    }
    return cur
}

console.log(fib(10));
console.log(fib(50));
export {}