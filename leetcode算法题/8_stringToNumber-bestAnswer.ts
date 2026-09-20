function myAtoi(s: string): number {
    const INT_MIN = -(2 ** 31)
    const INT_MAX = 2 ** 31 - 1
    let index = 0
    let sign = 1
    let result = 0

    while (index < s.length && s[index] === ' ') {
        index++
    }

    if (s[index] === '+' || s[index] === '-') {
        sign = s[index] === '-' ? -1 : 1
        index++
    }

    while (index < s.length) {
        // 解题关键：对应字符转为编码后减去0的编码得到就是原字符串的值
        const digit = s.charCodeAt(index) - 48

        if (digit < 0 || digit > 9) {
            break
        }

        result = result * 10 + digit

        if (sign === 1 && result >= INT_MAX) {
            return INT_MAX
        }

        if (sign === -1 && result >= -INT_MIN) {
            return INT_MIN
        }

        index++
    }

    return sign * result
}
console.log(myAtoi("42"));

export {}