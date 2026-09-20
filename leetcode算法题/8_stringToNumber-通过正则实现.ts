// 你没解出来，因为题目没了解，以为是你想那样，其实只要第三个字符不是数字则返回0，无论之后是不是数字（比如--42 返回0 ，-42次才返回-42）
function myAtoi(s: string): number {
    // 数组里面放
    // const arr = ['-','']
    // 正则
    // const reg1 = /^-/
    // 先用最简单的，然后再优化，因为正则不怎么熟
    let result
    if(s.includes('-') && s[0]!=='-' || s.includes('+') && s[0] !== '+') {
        const index =  s.indexOf('-')?s.indexOf('-'):s.indexOf('+')
        result = s.slice(0,index)
    }
    // 判断是否为数字，必须用正则了
    const reg = /d/g
    if()
};

function myAtoi(s: string): number {
    const INT_MIN = -(2 ** 31)
    const INT_MAX = 2 ** 31 - 1

    // ^ 表示只能从字符串开头匹配
    // \s* 匹配开头空白
    // [+-]? 匹配可选的正负号
    // \d+ 匹配至少一个连续数字
    const matched = s.match(/^\s*[+-]?\d+/)

    if (!matched) {
        return 0
    }

    const result = Number(matched[0])

    return Math.max(INT_MIN, Math.min(result, INT_MAX))
}