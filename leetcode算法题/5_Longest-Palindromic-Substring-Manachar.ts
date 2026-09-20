/**
 * Manacher 算法
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
// 回文就是正着读和倒着读完全一样的内容。

// 看代码先找核心代码，比如下面的while (transformed[i + radius[i] + 1] === transformed[i - radius[i] - 1]) 这就是核心，其他条件判断，只不过是更好的延续这个核心代码
function longestPalindrome(s: string): string {
    if (s.length < 2) {
        return s
    }

    // 插入分隔符后，奇数和偶数长度的回文可以用同一种方式处理。
    //加 # 后，两者都能以某个下标为中心向两边扩展。
    // 就没有"aba""abba" 即中间点不是某个字符，而全都是以#为中间点
    const transformed = `^#${s.split('').join('#')}#$` // 这一步解决了传统中字符可能分奇数偶数的情况
    /**
     * radius[i] 的含义是
     * 以 transformed[i] 为中心，左右各能对称扩展多少格。
     * 创建一个和 transformed 等长的数组，用来记录每个位置作为回文中心时，能向两边扩展多远。
     */
    const radius = new Array<number>(transformed.length).fill(0)
    let center = 0
    let right = 0
    let maxRadius = 0
    let maxCenter = 0

    for (let i = 1; i < transformed.length - 1; i++) {
        // mirror 是 i 相对于 center 的镜像位置
        const mirror = 2 * center - i // 1，2，3 -》 2*2-3 = 1 

        //先借 mirror 的结果，少做比较
        if (i < right) { //要是为true，说明此时在
        // 保留这段才是 Manacher 算法的线性优化。使得O(n2) 变为O(n)
            radius[i] = Math.min(right - i, radius[mirror])
        }
        // 举例解释
        /**
         *   已知最大回文的下标是：0 1 2 3 4 5 6 7 8 9
            center = 5
            right = 9
            当前 i = 7

            则56789正反读不一样，但是 1，2，3 和 7 8 9 一定是一样的，所以radius[i] = radius[mirror]
            但radius[mirror]可能不是1，2，3这些，然后可能导致radius[i]超出边界，所以还有个取最小值
         * 
         */
        /**
         * 
         */
        /** 
         * 解释为什么要去最小值 和 为什么还有个right - i呢
             因为radius[mirror]可能让radius[i]超出范围，所以right-i可以限制住radius[mirror]，让radius[mirror]的半径是回文范围内，而不是回文范围外 即 cabcdcba 在abc中比较而不是cabc

            你前面的说的已经验证过的意思是 abcdcba后面那个c就等于前面那个c，因为他两验证数据即while (transformed[i + radius[i] + 1] === transformed[i - radius[i] - 1]) {是一样的
          
         */

        //最下面有详细解释if(i<right)
        

        //再比较未知的部分，尽量扩展
        while (transformed[i + radius[i] + 1] === transformed[i - radius[i] - 1]) {
            radius[i]++
        }

        //更新“目前最靠右”的回文
        if (i + radius[i] > right) {
            center = i
            right = i + radius[i]
        }

        //更新“目前最长”的回文
        if (radius[i] > maxRadius) {
            maxRadius = radius[i]
            maxCenter = i
        }
    }

    const start = Math.floor((maxCenter - maxRadius) / 2) // 这个拿到开始点，便是中心-半径得到开始点

    return s.slice(start, start + maxRadius)
    // 为什么这里时start+maxRadius而不是start+2*maxRadius
    // 因为maxRadius要先除以2来把#去掉先
}

console.log(longestPalindrome('babad')) // "bab" 或 "aba"
// console.log(longestPalindrome('cbbd')) // "bb"
// console.log(longestPalindrome('xaabacxcabaaxcabaax')) // "xaabacxcabaax"



/**
 * 上面的if(i<right) {...} 讲解
        *  这段代码不多余，它不影响“能不能找到答案”，但决定算法是不是 `O(n)`。

        `right` 不是“前一次 `for` 的值”这么简单，而是截至当前 `i` 之前，所有已处理中心中能覆盖到的最右位置。它只有遇到更靠右的回文时才更新：

        ```ts
        if (i + radius[i] > right) {
        center = i
        right = i + radius[i]
        }
        ```

        所以某一轮中可能是：

        ```text
        已知最大回文覆盖：    [--------]
        下标：              0 1 2 3 4 5 6 7 8 9
        center = 5
        right = 9
        当前 i = 7
        ```

        此时 `7 < 9`，说明 `i` 在已经验证过的回文范围内部。

        ```ts
        radius[i] = Math.min(right - i, radius[mirror])
        ```

        能直接给 `radius[7]` 一个已经确定的初始半径，`while` 只需要尝试比较 `right` 外的新字符，而不是从半径 `0` 重新向两边比较。

        如果删掉这段：

        ```ts
        // radius[i] 保持 0
        while (...) {
        radius[i]++
        }
        ```

        结果通常仍正确，但每个 `i` 都可能重复比较已经验证过的区间，最坏退化为 `O(n²)`；保留这段才是 Manacher 算法的线性优化。
 */