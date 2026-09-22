// 你没解出来，因为题目没了解，以为是你想那样，其实只要第三个字符不是数字则返回0，无论之后是不是数字（比如--42 返回0 ，-42次才返回-42），简而言之就是s.match(/^\s*[+-]?\d+/)就行

function myAtoi(s: string): number {
    const INT_MIN = -(2 ** 31)
    const INT_MAX = 2 ** 31 - 1

    // ^：从字符串开头开始
    // \s*：零个或多个空白字符
    // [+-]?：零个或一个 + / -
    // \d+：一个或多个数字
    const matched = s.match(/^\s*[+-]?\d+/) //

    if (!matched) {
        return 0
    }

    const result = Number(matched[0])

    return Math.max(INT_MIN, Math.min(result, INT_MAX))
}

export{}