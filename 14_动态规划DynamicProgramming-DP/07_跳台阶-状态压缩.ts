/** 
 * 状态压缩：一般就是不要使用数组，用几个变量就行(到底几个变量看你初始化值和状态转换方程有几个变量)
 *  比如下面有两个怎么来的呢
 *    状态转换方程
 *      f(n) = f(n-1) + f(n-2)
 *    初始化值
 *      f(0) = 1,f(1) = 1 
 *      为什么没有f(2),因为f(2)=f(0)+f(1)
 *    观察可知有两个变量
 */
function climbStairs(n: number): number {
    if(n<=1) return n
    // const arr:number[] = []
    let pre = 1
    let cur = 1
    for(let i = 2;i<=n;i++) {
        let val = pre + cur
        pre = cur
        cur = val
    }
    return cur
};
console.log(climbStairs(3));

export {}