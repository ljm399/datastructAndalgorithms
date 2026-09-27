// 递归实现的问题就是重复计算
function fib(n:number,arr:number[]=[]):number {
    // arr的作用每次递归都用一个数组同时每次调用fib都是新数组（不是函数外定义的数组）
    if(n<=1) return n
    if(arr[n]) return arr[n]
    let res = fib(n-1,arr) + fib(n-2,arr)
    arr[n] = res
    return res
}

console.log(fib(10));
export {}