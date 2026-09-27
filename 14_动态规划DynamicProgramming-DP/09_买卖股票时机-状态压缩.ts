/** 
 * 状态压缩：一般就是不要使用数组，用几个变量就行(到底几个变量看你初始化值和状态转换方程有几个变量)
 *  比如下面有两个怎么来的呢
 *  状态转移方程
 *      f(n) = Math.max(f(n) - minPrice,0)
 *  初始化 
 *      f(0) = 0 
 *      f(1) = Math.max(f(n) - minPrice,0)
 *    观察可知有一个变量
 */
function maxProfit(prices: number[]): number {
    const n = prices.length
    if(n===0) {
        return 0
    }
    // else if(n===1) {
    //     return prices[1] - prices[0] 这里
    // } 

    let minPrice = prices[0]
    let pre:number = 0 // 消除这种情况f(1) = 0 而不是-6 // 注意这里要是为-6，则可以当天买入当天卖出即最大利润为0，而不是-6,所以Math.max(prices[i]-minPrice,0)
    for(let i=1;i<=n-1;i++) {
        pre = Math.max(prices[i]-minPrice,pre)
        minPrice = Math.min(prices[i],minPrice)
    }
    return pre
};
console.log(maxProfit([7,1,5,3,6,4]));

export {}