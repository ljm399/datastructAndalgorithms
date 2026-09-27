function fib(n:number):number {
    // 1.定义状态
    // dp保留斐波那契数列中每个位置对应的值（状态）
    // dp[x]表示x位置的值（状态）
    let dp:number[] = []

    // 2.设置初始化值
    dp[0] = 0
    dp[1] = 1
    for(let i=2;i<n+1;i++) {         
        // 3.状态转移方程：dp[i] = dp[i-1] - dp[i-2],一般写在for或while中
        dp[i] =  dp[i-1] + dp[i-2]
    }
    // console.log(arr);
    
    // 4.计算最终结果
    return dp[n]
}

console.log(fib(10));
export {}