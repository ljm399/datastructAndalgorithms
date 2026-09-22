function myAtoi(s: string): number {
    const INT_MAX = (2**31) -1 
    const INT_MIN = -(2**31)
    const regResult = s.match(/^\s*[+-]?\d+/)
    console.log(regResult);
    
    let result = regResult ? Number(regResult[0]) : 0

    // if(result>INT_MAX) {
    //     return INT_MAX
    // } else if(result < INT_MIN) {
    //     return INT_MAX
    // }
    // 优化
    result = Math.min(INT_MAX,Math.max(INT_MIN,result))

    return result
};
console.log(myAtoi(' -41'));
export default {}