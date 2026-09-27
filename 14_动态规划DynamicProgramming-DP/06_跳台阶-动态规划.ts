/** 问题：每次只能跳一次或两次台阶，则跳到n次台阶最多有多少次跳法
 * 使用动态规划推导过程
 * 1.定义状态
 *  第一个值
 *      f(0) = 0
 *  第二个值
 *      f(1) = 1//就一种跳法
 *  第三个值
 *      f(2)= 最多就两种所以为2，但f(0)+f(1) = 1,所以给f(0)特殊值即f(0)=1
 *  f(3) = f(2) + f(1)
 *  最后一个值
 *  由于一次只能跳一次或两次，所以f(n)等于倒数一次所有的跳法 加上 倒数第二次所有跳法得出方程
 * 2.状态转换方程
 *  f(n) = f(n-1) + f(n-2)
 * 3.初始化值
 *  f(0) = 1,f(1) = 1 
 *  为什么没有f(2),因为f(2)=f(0)+f(1)
 * 4.得出结构
 *  return f(n)
 */

function climbStairs(n: number): number {
    if(n<=1) return n
    const arr:number[] = []
    arr[0] = 1
    arr[1] = 1
    for(let i = 2;i<=n;i++) {
        arr[i] = arr[i-1] + arr[i-2]
    }
    return arr[n]
};
console.log(climbStairs(3));

export {}