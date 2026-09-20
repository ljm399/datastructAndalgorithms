/**
 * 中心扩展法
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 */
function longestPalindrome(s: string): string {
    if (s.length < 2) {
        return s
    }
    let start = 0
    let maxlength = 1

    function expendFromCenter(l:number,r:number):void {
        while(l>=0 && r<s.length && s[l]===s[r]) {
            let currentLength = r - l + 1
            if(currentLength>maxlength) {
                start = l
                maxlength = currentLength
            }

            l--
            r++
        }

    }
    for(let i = 0;i<s.length;i++) {
        expendFromCenter(i,i) //aba

        // 这个不会影响上面的函数调用start，因为if(currentLength>maxlength) 
        expendFromCenter(i,i+1) //abbc
    }
    return s.slice(start,start+maxlength)
}

console.log(longestPalindrome('babad')) // "bab" 或 "aba"
console.log(longestPalindrome('cbbd')) // "bb"
console.log(longestPalindrome('xaabacxcabaaxcabaax')) // "xaabacxcabaax"

export {}