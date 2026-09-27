/**
 * Given an integer array nums, find the subarray with the largest sum, and return its sum.即[-2,1,-3,4,-1,2,1,-5,4]里面的[4,-1,2,1] has the largest sum 6.
 * 定义状态（分析问题：举例第一开始，然后最后，不行就包括中间）
 *  第一个
 *  f(0) = -2
 *  第二个 f(1) = math.max(f(1) + f(0),f(0))
 *      分情况： f(0)是负数时
 *                  f(0)>f(1)：f(1) = math.max(f(1) + f(0),f(0),f(1))
 *                  f(0)<f(1)：f(1) = math.max(f(1) + f(0),f(0),f(1))
 *              f(1)时负数
 *                  f(0)>f(1):f(1) = math.max(f(1) + f(0),f(0),f(1))
 *                  f(1)<f(0):f
 *              f(1)时正数。。。。 
 *      当你发现你处理怎么多个条件时，大概率你思考错了，漏了什么
 *      答案：你漏掉了状态数组以及最终结果的作用，每个位置保存当前位置的最大值，而不是
 *      所以你直接f(1) = math.max(f(1) + f(0)，f(1))就行，至于f(0)是否大于f(1)不重要，你最后会return math.max(...arr)

 *  第三个 f(2) = math.max(f(2) + f(1),f(2))
 *  第4个 f(3) = math.max(f(3) + f(2),f(3))
 *  第n个（最后一个） f(n) = math.max(f(n) + f(n-1),f(n))
 * 状态转换方程
 *  f(n) = math.max(f(n) + f(n-1),f(n))
 * 初始化
 *  f(0) = -2
 *  第二个 f(1) = math.max(f(1) + f(0),f(1),f(0))
 *  第三个后才符合f(n) = math.max(f(n) + f(n-1),f(n))
 * 最终结果
 *  返回math.max(...arr)
 */
function maxSubArray(nums: number[]): number {
    const n = nums.length
    const arr:number[] = []
    arr[0] = nums[0]
    for(let i=1;i<n;i++) {
        arr[i] = Math.max(nums[i]+arr[i-1],nums[i])
    }

    return Math.max(...arr)
};
export {}