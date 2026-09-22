// 你认为if很多，大概率题目条件判断错了
function myAtoi(s: string): number {
    let index = 0
    let result = 0
    let sign = 1 // 记录正负符号

    // 问：这里31还是32还是不懂
    
    const INT_MAX = 2**31 -1
    const INT_MIN = -(2**31)

    // 消除空白(空白只有开头有，否则则返回0)
    while(index<s.length && s[index] === " ") {
        index++
    }

    // 除空白是否+/-
    if(s[index]==="+"||s[index]==="-") {
        sign = s[index]==='+' ? 1 : -1
        index++
    }

    // 匹配数字
    while(index<s.length) {
        let digit = s.charCodeAt(index) - 48
        if(digit < 0 || digit > 9) {
            break
        }
        result = result*10 + digit
        if(sign === 1 && result >= INT_MAX) {
            return INT_MAX
        }

        if(sign === -1 && result >= -INT_MIN) { //这里result是正数
            return INT_MIN
        }
        index++
    }
    return sign*result
};