function isPalindrome(x: number): boolean {
    let char = String(x)  
    let arr = []
    for(let i of char) {
        arr.push(i)
    }
    let length = arr.length
    let result:boolean = false
    if(arr.length%2===0) {
        for(let i = 0; i<length/2;i++){
            if(arr.shift() !== arr.pop()){
                if(arr.length===0) {
                   return false
                }
                break
            }

        }
        result = arr.length===0?true:false
    } else {
        for(let i = 0; i<Math.floor(length/2);i++){
            if(arr.shift() !== arr.pop() ){
                if(arr.length === 1) {
                    return false
                }
                break
            }
        }
        result = arr.length===1?true:false
    }
    return result
};
console.log(isPalindrome(88888));
