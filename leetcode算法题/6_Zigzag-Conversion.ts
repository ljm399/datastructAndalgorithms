/**
 * 逐行模拟 Z 字形排列。
 *
 * 例如 s = "PAYPALISHIRING"，numRows = 3：
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 *
 * 按行读取后得到 "PAHNAPLSIIGYIR"。
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
/**
 * 为什么我想不到
 * 因为题目给的是二维排版图，很容易让人去研究空格、列坐标和数学规律。其实这道题的关键是：最终只关心每一行有哪些字符，并不关心字符具体在第几列。
 * 
 * 列举（下次做题没思路就列举，看规律，而不是想）
 * 比如 numRows = 3，字符所在行的变化是：
    字符： P A Y P A L I S H I R I N G
    行号： 0 1 2 1 0 1 2 1 0 1 2 1 0 1
    行号一直按照下面的规律移动：
    0 -> 1 -> 2 -> 1 -> 0 -> 1 -> 2 ...
    这就变成了一个很熟悉的“往返运动”：
    - 当前在哪一行：currentRow
    - 当前向上还是向下：direction
    - 到达第一行：转为向下
    - 到达最后一行：转为向上
 */
function convert(s: string, numRows: number): string {
    // 只有一行，或者行数不少于字符数时，排列结果不会发生变化。
    if (numRows === 1 || numRows >= s.length) {
        return s
    }

    const rows = new Array<string>(numRows).fill('')
    let currentRow = 0
    let direction = 1

    for (const char of s) {
        rows[currentRow] += char

        // 到达最上面或最下面时改变移动方向。
        if (currentRow === 0) {
            direction = 1
        } else if (currentRow === numRows - 1) {
            direction = -1
        }

        currentRow += direction
    }

    return rows.join('')
}

console.log(convert("PAYPALISHIRING",3));
