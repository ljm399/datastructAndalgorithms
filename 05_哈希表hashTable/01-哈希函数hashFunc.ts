// 哈希函数
function hashFunction(val:string,max:number):number {
    // 1.设置第一个哈希值，必须是0，因为霍纳法则第一项是0
    let hashcode = 0
    const length = val.length
    for(let i=0;i<length;i++) {
        hashcode = hashcode*i + val.charCodeAt(i)
    }
    // % hashcode的范围锁定在数组的长度即max之内
    const index = hashcode % max
    return index
}

// 3/8  = 0.425
console.log(hashFunction('cao',8));
console.log(hashFunction('ca2',8));
console.log(hashFunction('ca4',8));

console.log('--------');

// 6/7 > 0.75 = 3/4 
console.log(hashFunction('cao424',7));
console.log(hashFunction('ca2344',7));
console.log(hashFunction('ca4444',7));
console.log(hashFunction('mb5a44',7));
console.log(hashFunction('mb1a44',7));


export {}