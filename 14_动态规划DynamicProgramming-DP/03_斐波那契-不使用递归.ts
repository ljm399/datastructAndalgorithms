// 不用递归实现
function fib(n:number):number {
    let arr:number[] = []
    for(let i=0;i<n+1;i++) { 
        if(i<=1) {
            arr[i] = i
            continue
        }
        arr[i] =  arr[i-1] + arr[i-2]
    }
    // console.log(arr);
    
    return arr[n]
}

console.log(fib(10));
export {}