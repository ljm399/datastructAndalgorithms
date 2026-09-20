function lengthOfLongestSubstring(s: string): number {
    const arr: boolean[] = new Array(128).fill(false);
    let l = 0;
    let r = 0;
    let maxLen = 0;

    while (r < s.length) {
        // s.charCodeAt(2) 意思是对s的第2个位置的字符转换为对应代码
        if (!arr[s.charCodeAt(r)]) {
            arr[s.charCodeAt(r)] = true;

            // r-l+1是当前的长度大小
            maxLen = Math.max(maxLen, r - l + 1); // 比较两个值，并把更大的那个保留
            // 这两个值，一个是之前保存的长度，一个是现在最新的长度

            // r要是++则当前长度就增大，意味则
            r++;
        } else {
            arr[s.charCodeAt(l)] = false;

            // l要是++则意味则字符已有，故要删除
            // 问题：你删除的不是重复的呀，比如已有abc，下一个是b，你删除的不是abcbcd的b，而是a，则现在已有bcb,这没影响吗
            // 不会是上面的情况，因为arr[s.charCodeAt(l)] = false;会一点点看已经加入的字符有无重复，注意是while循环，这里l++，r不变
            l++;
        }
    }

    return maxLen;
}
console.log(lengthOfLongestSubstring('pwwkew'));
export {}