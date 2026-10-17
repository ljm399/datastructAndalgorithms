class hashTable<T=any> {
    private arr : [string,T][][] = [] 
    private length:number = 7 // 为什么这里要定义一个length，不应该是key的length，这里的length是你要定义好你设置数组的长度，然后下面hasFunction的const index = hashcode % max的% hashcode的范围锁定在数组的长度即max之内才有作用

    private hashFunction(val:string,max:number):number {
        // 1.设置第一个哈希值，必须是0，因为霍纳法则第一项是0
        let hashcode = 0
        const length = val.length // 这里之前提取为常量，则下面的for循环就不会重复使用
        for(let i=0;i<length;i++) {
            hashcode = hashcode*31 + val.charCodeAt(i)
        }

        // 防止负数（JS数字溢出后可能出现负hash）
        hashcode = Math.abs(hashcode)

        // % hashcode的范围锁定在数组的长度即max之内
        const index = hashcode % max
        return index
    }

    // 包括增加和修改
    put(key:string, val:T) {
        let index = this.hashFunction(key,this.length) 
        let bucket = this.arr[index]
        // 1.要是bucket不存在，则是增加
        // 添加一个桶，同时桶里面添加一个值
        if(!bucket) {
            this.arr[index] = [[key,val]]
            return 
        }

        let isUpdate = false // 需要这个是因为前面的bucket可能有可能无，这里是key可能有可能无
        // 要是bucket存在，则是修改对应值（修改）
        bucket.forEach(item=>{
            const tupleKey = item[0]
            if(tupleKey===key) {
                item[1] = val
                isUpdate = true
            }
        })

        // 没有多加一个桶，只是桶里面添加多个值
        if(!isUpdate) {
            bucket.push([key,val])
        }
    }

    traversal() {
        return this.arr
    }
}
const hashTb = new hashTable()
hashTb.put('cao','zs')
hashTb.put('m',2)
console.log(hashTb.traversal());
