function lengthOfLongestSubstring(s: string): number {
    let chars = s[0]
    let count = 0
    for (let i = 1; i < s.length; i++) {
        let crt1 = s[i]
        if (chars.indexOf(crt1) === -1 && !!crt1) {
            chars += String(crt1)
            if (chars.length > count) {
                count = chars.length
            }
        }
        else {
            if (chars.length > count) {
                count = chars.length
            }
            chars += String(crt1)
            const index = chars.indexOf(crt1) + 1
            chars = chars?.slice(index)
        }
    }
    return count ? count : s.length

};
console.log(lengthOfLongestSubstring('A'));
