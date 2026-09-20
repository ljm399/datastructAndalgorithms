function lengthOfLongestSubstring(s: string): number {
    const arr:boolean[] = new Array(128).fill(false)
    let l = 0
    let r = 0 
    let maxLength = 0 
    while(r<s.length) {
        if(!arr[s.charCodeAt(r)]) {
            arr[s.charCodeAt(r)] = true
            maxLength = Math.max(maxLength,r-l+1)
            r++
        } else {
            arr[s.charCodeAt(l)] = false
            l++
        }
    }
    return maxLength
}
export {}