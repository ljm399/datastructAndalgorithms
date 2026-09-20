function reverse(x: number): number {
    const char = String(x)
    const arr: string[] = []

    for (let i = char.length - 1; i >= 0; i--) {
        if (char[i] === '-') {
            arr.unshift(char[i])
            break
        }
        arr.push(char[i])
    }

    // Number converts the string returned by join() into a number.
    const result = Number(arr.join(''))

    // The result must fit in a signed 32-bit integer.
    if (result < -(2 ** 31) || result > 2 ** 31 - 1) { // 判断是否超出 32 位有符号整数范围
        return 0
    }
    return result   
}

console.log(reverse(-123))
console.log(reverse(1534236469))

export {}
