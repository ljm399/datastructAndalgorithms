class Heap<T>{
    data:T[] = []
    private length = 0

    private swap(i:number,i2:number) {
        const temp = this.data[i]
        this.data[i] = this.data[i2]
        this.data[i2] = temp
    }

    insert(value:T) {
        this.data.push(value)
        // value对应数组里面的索引怎么拿到呢
        // 不需要indexof，因为push的肯定是最后一个索引
        this.length++
        this.heapify_up(this.length-1)
    }

    // 注意最小堆和最大堆逻辑是不同的，只不过只是下面的大于小于不同罢了
    // 下面求的最大堆
    heapify_up(i:number){
        let index = i
        let parentIndex = 0 
        // 为什么没有index=0，因为index=0之前那一次循环已经将index
        while(index>0) {
            parentIndex = Math.floor((index-1)/2)
            if(this.data[index]<this.data[parentIndex]) {
                break
            }
            this.swap(index,parentIndex)
            index = parentIndex
        }
    }
}

const hp = new Heap()
let arr = [3,5,7,4,2,5,8]
for(let i of arr) {
    hp.insert(i)
}
hp.insert(6)
console.log(hp.data);
export {}