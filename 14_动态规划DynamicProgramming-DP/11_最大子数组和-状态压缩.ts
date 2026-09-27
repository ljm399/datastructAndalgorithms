/** 
 *  状态压缩：一般就是不要使用数组，用几个变量就行(到底几个变量看你初始化值和状态转换方程有几个变量)
 * 状态转换方程
 *  f(n) = math.max(f(n) + f(n-1),f(n))
 * 初始化
 *  f(0) = -2
 *  第二个就符合公式 f(1) = math.max(f(1) + f(0),f(1))
 *  所以可能一个变量或两个变量就行
 *  到底几个
 *  直接显示通过状态数组+动态规则这基本做出了先，再去想怎么优化，因为优化要看着做出来的代码设置变量 
 */
function maxSubArray(nums: number[]): number {
    const n = nums.length
    let max:number = nums[0]
    let pre:number = nums[0]
    for(let i=1;i<n;i++) {
        pre = Math.max(nums[i] + pre,nums[i]) // 发现就一个arr[i-1]和arr[i]要保持
        max = Math.max(max,pre)
    }
    return max
};
export {}