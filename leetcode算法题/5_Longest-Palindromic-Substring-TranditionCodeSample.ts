/**
 * 中心扩展法
 * 时间复杂度：O(n^2) ：
    *   解释：  外层中心数量：约 2n
                每个中心扩展次数：最坏约 n
                总时间：O(2n × n) = O(n²)
 * 空间复杂度：O(1)
 */
function longestPalindrome(s: string): string {
    if (s.length < 2) {
        return s
    }

    let start = 0
    let maxLength = 1

    function expandFromCenter(left: number, right: number): void {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const currentLength = right - left + 1 // 为什么要加+1，看例子就懂了
            /**
                 * 第 1 次：s[1] === s[1]  -> "a" // 要是不加1，那数组里面明明有一个，却为0
                第 2 次：s[0] === s[2]  -> "bab"
                第 3 次：左边越界，停止
             * 
             */

            if (currentLength > maxLength) {
                start = left
                maxLength = currentLength
            }

            left--
            right++
        }
    }

    for (let i = 0; i < s.length; i++) {
        // 例如 "aba"：中心是下标 i 的字符。
        expandFromCenter(i, i)
        // 例如 "abba"：中心在 i 和 i + 1 两个字符之间。
        expandFromCenter(i, i + 1)
    }

    return s.slice(start, start + maxLength)
}

console.log(longestPalindrome('babad')) // "bab" 或 "aba"
console.log(longestPalindrome('cbbd')) // "bb"
console.log(longestPalindrome('xaabacxcabaaxcabaax')) // "xaabacxcabaax"

export {}