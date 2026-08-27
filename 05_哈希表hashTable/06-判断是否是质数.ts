export function isPrime(num:number):boolean {

    // 不行，考虑不周全
    // let count = 0
    // for(let i=2; i<=7;i++) {
    //     if(num % i === 0) {
    //         return false
    //     }
    // }


    // 淘汰，O(n)
    // for(let i=2; i<=num;i++) {
    //     if(num % i === 0) {
    //         return false
    //     }
    // }

    // O(logn)
    // 91： 7 * 13 有个7，所以小于9.43（9.43的平方约等于91）
    // 121 等于11的平方
    const bestnum = Math.sqrt(num)
    for(let i=2; i<=bestnum;i++) {
        if(num % i === 0) {
            return false
        }
    }    

    return true
}

// console.log(isPrime(6));
// console.log(isPrime(2));
// console.log(isPrime(7));
// console.log(isPrime(21));
// console.log(isPrime(23));
// console.log(isPrime(91));
// console.log(isPrime(1));
// console.log(isPrime(25));


