// 用两种方式是实现
// 没有实现原因
// 实现了中线从左删到右，但没实现右到左
// 看看下面注释就行
function longestPalindrome(s: string): string {

    // let stack:string[] = []
    // let queue:string[] = []
    // let arr:any[] = []
    let count = 0
    let leftresult = ''
    let result = ''
    let firstNumProresult = ''
    let firstNumProArr = []
    let resultLeft = ''
    let resultRight = ''
    resultLeft = moveMidNum(s,count,resultLeft)
    resultRight = moveMidNum2(s,count,resultRight)

    function moveMidNum(s:string,count:any,result:any,):string {
        let arr:any[] = []
        if(s.length===1 || !s.length) return s
        let isodd:boolean = s.length%2===0 ? false : true
        let rightarr:string[] = []
        let leftarr:string[] = []
        let midchar = ''
        let firstNumProcount = 0

        if(!isodd) {
            for(let i=0;i<s.length;i++) {
                if(i<(s.length/2)) {
                    leftarr.push(s[i])  
                } else if(i>=(s.length/2)) {
                    rightarr.push(s[i])
                }
            }
        } else {
            for(let i=0;i<s.length;i++) {
                if(i<((s.length+1)/2-1)) {
                    leftarr.push(s[i])  
                } else if(i>((s.length+1)/2-1)) {
                    rightarr.push(s[i])
                } else {
                    midchar = s[(s.length+1)/2-1]
                }
            }
        }
        let newlarr = [...leftarr]
        let newrarr = [...rightarr]
        let newlarr2 = [...leftarr]
        let newrarr2 = [...rightarr]
        let newarr = midchar? [...newlarr2,midchar, ...newrarr2] : [...newlarr2,...newrarr2]

        // for循环里有递归，是不是不行呀
        // 这里的for循环，为了不断newlarr.pop()===newrarr.shift()，递归只有for最后一次循环才调用
        for(let i = 0;i<newlarr2.length;i++) {
            if(newlarr.pop()===newrarr.shift()) {
                i===0?arr.push(leftarr.pop()):arr.splice(0,0,leftarr.pop())
                i==0?arr.push(rightarr.shift()):arr.splice(arr.length,0,rightarr.shift())

                //左右字符全部匹配时，你已经确认当前 s 是回文，不必再 shift() 后递归
                if (i === newlarr2.length - 1) {
                    return s
                }
            }else{
                if(isodd && !!arr.length) {
                    arr.splice((arr.length+1)/2,0,midchar)
                }
                // 外层的count大于递归函数里面的arr.length
                if(count>arr.length) {
                    return result
                }
                count = arr.length
                result = arr.join('')
                if(!newarr.length || !leftarr.length) return result

                let samechar = newarr.shift()!
                // 解决ccb，第一个元素和中间那个元素重复，
                if(samechar === midchar && newarr.length<=2 && midchar!== newarr[newarr.length-1])  {
                    return [midchar,midchar].join('')
                }
                // 解决adam：即第一个元素问题：第一个元素和后面的元素冲突
                else if(newarr.indexOf(samechar)!==-1){
                    let index = newarr.indexOf(samechar)+1
                    let temArr = [...newarr]
                    let temArr2 = temArr.splice(index,newarr.length-index)
                    firstNumProArr = [samechar,...temArr]
                    const next = firstNumProArr.join('')
                    if (next.length < s.length) {
                        arr = []
                        let temResult = moveMidNum(firstNumProArr.join(''),count,result)
                        firstNumProresult = temResult.length > firstNumProresult.length ? temResult : firstNumProresult
                    }

                }

                // 要是count大于数组剩余的元素长度，则不用递归直接返回result
                if(count>=newarr.length) {
                    return result
                }
                arr = []
                // 问题：这个函数调用后arr都变为了初始值
                return moveMidNum(newarr?.join(''),count,result) // 不断删除第一个来修改中位数
            }
        }
        return result
    }

    function moveMidNum2(s:string,count:any,result:any,):string {
        let arr:any[] = []
        if(s.length===1 || !s.length) return s
        let isodd:boolean = s.length%2===0 ? false : true
        let rightarr:string[] = []
        let leftarr:string[] = []
        let midchar = ''
        let firstNumProcount = 0

        if(!isodd) {
            for(let i=0;i<s.length;i++) {
                if(i<(s.length/2)) {
                    leftarr.push(s[i])  
                } else if(i>=(s.length/2)) {
                    rightarr.push(s[i])
                }
            }
        } else {
            for(let i=0;i<s.length;i++) {
                if(i<((s.length+1)/2-1)) {
                    leftarr.push(s[i])  
                } else if(i>((s.length+1)/2-1)) {
                    rightarr.push(s[i])
                } else {
                    midchar = s[(s.length+1)/2-1]
                }
            }
        }
        let newlarr = [...leftarr]
        let newrarr = [...rightarr]
        let newlarr2 = [...leftarr]
        let newrarr2 = [...rightarr]
        let newarr = midchar? [...newlarr2,midchar, ...newrarr2] : [...newlarr2,...newrarr2]

        // for循环里有递归，是不是不行呀
        // 这里的for循环，为了不断newlarr.pop()===newrarr.shift()，递归只有for最后一次循环才调用
        for(let i = 0;i<newlarr2.length;i++) {
            if(newlarr.pop()===newrarr.shift()) {
                i===0?arr.push(leftarr.pop()):arr.splice(0,0,leftarr.pop())
                i==0?arr.push(rightarr.shift()):arr.splice(arr.length,0,rightarr.shift())

                //左右字符全部匹配时，你已经确认当前 s 是回文，不必再 shift() 后递归
                if (i === newlarr2.length - 1) {
                    return s
                }
            }else{
                if(isodd && !!arr.length) {
                    arr.splice((arr.length+1)/2,0,midchar)
                }
                // 外层的count大于递归函数里面的arr.length
                if(count>arr.length) {
                    return result
                }
                count = arr.length
                result = arr.join('')
                if(!newarr.length || !leftarr.length) return result

                let samechar = newarr.pop()!
                // 解决ccb，第一个元素和中间那个元素重复，
                if(samechar === midchar && newarr.length<=2 && midchar!== newarr[newarr.length-1])  {
                    return [midchar,midchar].join('')
                }
                // 解决adam：即第一个元素问题：第一个元素和后面的元素冲突
                else if(newarr.indexOf(samechar)!==-1){
                    let index = newarr.indexOf(samechar)+1
                    let temArr = [...newarr].reverse()
                    let temArr2 = temArr.splice(index,newarr.length-index).reverse()
                    firstNumProArr = [samechar,...temArr]
                    const next = firstNumProArr.join('')
                    if (next.length < s.length) {
                        arr = []
                        let temResult = moveMidNum2(firstNumProArr.join(''),count,result)
                        firstNumProresult = temResult.length > firstNumProresult.length ? temResult : firstNumProresult
                    }

                }

                // 要是count大于数组剩余的元素长度，则不用递归直接返回result
                if(count>=newarr.length) {
                    return result
                }
                arr = []
                // 问题：这个函数调用后arr都变为了初始值
                return moveMidNum2(newarr?.join(''),count,result) // 不断删除第一个来修改中位数
            }
        }
        return result
    }

    // // 当左右不匹配时，就用下面代码
    // const index = chars.indexOf(crt1)
    // chars = chars?.slice(index)


    // 想太多，感觉还不行，换思路了
    // for (let i = 0; i < s.length; i++) {
    //     let crt1 = s[i]
    //     arr.push(crt1)
    //     // let newarr:string[] = arr // 他这个数组拿到的是arr存储内存地址，所以newarr在进行shift时，arr也shift
    //     // 解决
    //     let newarr = [...arr] // 深度复制

    //     // 问题：你这里只会第一个和最后一个判断
    //     if (newarr.shift()===newarr.pop() || newarr.indexOf(crt1) !==-1) {
    //         // chars += String(crt1)
    //         // const index = chars.indexOf(crt1)
    //         // chars = chars?.slice(index)
    //         // if (chars.length > count) {
    //         //     count = chars.length
    //         //     result = chars
    //         // }
    //     }
    //     else if(newarr.pop() === newarr.slice(newarr.length-2)[0]){

    //     }
    //     else{
    //         // chars += String(crt1)
    //         // if (chars.length > count) { // 因为一定会有相同的，没有就返回空喽
    //         //     count = chars.length
    //         //     result = chars
    //         // }sssssssssssss
    //     }
    // }
    let maxLength = Math.max(firstNumProresult.length,resultLeft.length,resultRight.length)
    if(firstNumProresult.length === maxLength) {
        result = firstNumProresult
    }else if(resultLeft.length === maxLength) {
        result = resultLeft
    } else {
        result = resultRight
    }
    return result

    // 解决问题：cbba 得到bba
};
// console.log(longestPalindrome('bacabab'));
// console.log(longestPalindrome('bb'));
console.log(longestPalindrome('xaabacxcabaaxcabaax'));

// cbb => bb but cbb
// abaca // 4 baca
// babad -》 bab/aba

export {}