class hashTable<T=any> {
    private arr : [string,T][][] = [] 
    private length:number = 7 // 为什么这里要定义一个length，不应该是key的length，这里的length是你要定义好你设置数组的长度，所以下面hasFunction的const index = hashcode % max的% hashcode的范围锁定在数组的长度即max之内才有作用

    private count = 0 // 计算数组里面添加了多少个元素
    private hashFunction(val:string,max:number):number {
        // 1.设置第一个哈希值，必须是0，因为霍纳法则第一项是0
        let hashcode = 0
        const length = val.length // 这里之前提取为常量，则下面的for循环就不会重复使用
        for(let i=0;i<length;i++) {
            hashcode = hashcode*i + val.charCodeAt(i)
        }
        // % hashcode的范围锁定在数组的长度即max之内
        const index = hashcode % max
        return index
    }

    // 包括增加和修改
    put(key:string, val:T) {
        let index = this.hashFunction(key,this.length) 
        let bucket = this.arr[index]
        // 1.要是bucket不存在，则是增加
        if(!bucket) {
            this.arr[index] = [[key,val]]
            this.count++
            return 
        }

        let isUpdate = false // 需要这个是因为前面的bucket可能有可能无，这里是key可能有可能无
        // 要是bucket存在，则是修改对应值
        bucket.forEach(item=>{
            const tupleKey = item[0]
            if(tupleKey===key) {
                item[1] = val
                isUpdate = true
            }
        })

        if(!isUpdate) {
            bucket.push([key,val])
        }
    }

    // 获取
    get(key:string):T | undefined {
        let index = this.hashFunction(key,this.length)
        let bucket = this.arr[index]
        if(!bucket) return undefined
        
        // 这里不能用foreach，因为forEach 无法提前结束遍历，也不会返回匹配项，因此这里使用 find，而不是找到
        const result = bucket.find(item=>item[0] === key)
        return result?.[1] // 这一步包括了要是result是undefined，则直接返回undefined

    }

    delete(key:string):T | undefined {
        const index = this.hashFunction(key,this.length)
        const bucket = this.arr[index]
        if(!bucket) return undefined
        for(let i = 0;i<bucket.length;i++) {
            const tuple = bucket[i]
            const tuplekey = tuple[0]
            if(tuplekey===key) {
                bucket.splice(i,1)
                this.count--
                return tuple[1]
            }
        }
        return undefined
    }

    traversal() {
        return this.arr
    }

    size() {
        return this.count
    }
}
const hashTb = new hashTable()
hashTb.put('cao','zs')
hashTb.put('m',2)
hashTb.put('mj',222)
hashTb.put('mj',2223)
console.log(hashTb.size());
console.log(hashTb.traversal());

console.log(hashTb.get('m'));
console.log(hashTb.delete('mj'));
console.log(hashTb.traversal());
console.log(hashTb.size());


export {}