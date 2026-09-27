/** [7,1,5,3,6,4]数组中每个值是每天股票的价格，目标是maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock，比如买了第二天的价格为1，然后第5天卖出则赚了6-1
 * 定义状态（分析题目：举例先从开头例子，然后再从末尾分析，要是还不行就在举例分析中间）
 *  例子：[7,1,5,3,6,4]
 *  买了第一天
 *      f(0) = 0// 只是买入又没出，所以为0卖
 *  第二个
 *      f(1) = 0 而不是-6 // 注意这里要是为-6，则可以当天买入当天卖出即最大利润为0，而不是-6,所以Math.max(prices[i]-minPrice,0)
 *      
 *  第三天
 *      f(2) = 5-1 = 4 为什么不是5-7等于-2，因为你的目标是求出最大利润值
 *      f(n) = f(n) - 某一天最小价格买入的值
 * 状态转移方程
 *      f(n) = Math.max(f(n) - minPrice,0)
 * 初始化 
 *      f(0) = 0 
 *      f(1) = Math.max(f(n) - minPrice,0)
 * 返回结果
 *      math.max(记录状态中的最大值)
 */
function maxProfit(prices: number[]): number {
    const n = prices.length
    // if(n===0) {
    //     return 0
    // }
    // else if(n===1) {
    //     return prices[1] - prices[0] 这里
    // } 

    let minPrice = prices[0]
    const arr:number[] = []
    arr[0] = 0
    for(let i=1;i<=n-1;i++) {
        arr[i] = Math.max(prices[i]-minPrice,0)
        minPrice = Math.min(prices[i],minPrice)
    }
    return Math.max(...arr)
};
console.log(maxProfit([7,1,5,3,6,4]));

export {}