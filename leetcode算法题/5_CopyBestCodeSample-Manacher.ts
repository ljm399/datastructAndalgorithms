/**
 * 中心扩展法
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 */
function longestPalindrome(s: string): string {
    if(s.length < 2) {
        return s
    }
    const transformed = `^#${s.split('').join('#')}#$`

    let radius = new Array(transformed.length).fill(0)
    let center = 0
    let right = 0
    let maxCenter = 0
    let maxRadius = 0
    for(let i =1;i<transformed.length;i++) {
        const mirror = 2*center - i
        if(i<right) {
            radius[i] = Math.min(right-i,radius[mirror])
        }
        while(transformed[i+radius[i]+1]===transformed[i-radius[i]-1]) {
            // 0+0+1， 0+1+1，0+2+1
            radius[i]++
        }
        if(radius[i]+i>right){
            center = i
            right = i+radius[i]
        }
        if(radius[i]>maxRadius) {
            maxCenter = i
            maxRadius = radius[i]
        }
    }
    const start = Math.floor((maxCenter-maxRadius)/2)
    return s.slice(start,start+maxRadius)
}

console.log(longestPalindrome('babad')) // "bab" 或 "aba"
console.log(longestPalindrome('cbbd')) // "bb"
console.log(longestPalindrome('xaabacxcabaaxcabaax')) // "xaabacxcabaax"

export {}