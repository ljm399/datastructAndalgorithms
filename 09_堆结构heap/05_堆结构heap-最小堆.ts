class Heap<T>{
    data:T[] = []
    private length = 0
    
    // 为了更好的使用buildheap，使用construct
    constructor(arr:T[]) {
        this.buildHeap(arr)
    }

    private swap(i:number,i2:number) {
        const temp = this.data[i]
        this.data[i] = this.data[i2]
        this.data[i2] = temp
    }

    insert(value:T) {
        this.data.push(value)
        this.length++
        this.heapify_up(this.length-1)
    }

    heapify_up(i:number){
        let index = i
        let parentIndex = 0 
        while(index>0) {
            parentIndex = Math.floor((index-1)/2)
            if(this.data[index]>this.data[parentIndex]) {
                break
            }
            this.swap(index,parentIndex)
            index = parentIndex
        }
    }

    // 提取最前面的值
    extract():T|undefined {
        let topValue 
        if(!this.length) {
            return undefined
        }

        // 下面问题：应该要把最后一个元素的值赋值给第一个，删除最后一个元素，而不是第一个
        // node = this.data.shift()!
        // this.length--
        // if(this.length!==1) {
        //     this.heapify_down(0)
        // }

        if(this.length===1) {
            this.length--
            return this.data.shift()!
        }else {
            topValue = this.data[0]
            let lastNode = this.data.pop()!
            // 最后一个元素赋值给第一个
            this.data[0] = lastNode
            this.length--
            this.heapify_down(0)
        }
        return topValue
    }

    // 下滤、
    heapify_down(i:number) {
        let index = i,leftIndex,rightIndex,largerIndex
        /**
         *  leftIndex<this.length问题：leftIndex在下次循环还是前一次循环的值
         *  自己不懂的原因，不会明确约束是什么以及条件是什么，写下来自己看到就懂了
         *  解决：弄清楚约束
         *  约束是这个值<this.length(约束)
         *  导致不能let leftIndex = 2*index + 1和index是随时变化的（条件)
         *   解决：2*index + 1<this.length
         *  */        
        while(2*index+1<this.length){
             leftIndex = 2*index + 1
             rightIndex = leftIndex + 1
             largerIndex = leftIndex
            // 解释为什么是rightIndex < this.length
            // 这等同于rightIndex <= this.length-1
            if(rightIndex < this.length && this.data[leftIndex] > this.data[rightIndex]) {
                largerIndex = rightIndex
            }   

            // 你漏了这一步
            if (this.data[index] <= this.data[largerIndex]) {
                break
            }
            this.swap(index,largerIndex)
            index = largerIndex
        }
    }

    isEmpty():boolean {
        return this.length === 0
    }

    buildHeap(arr:T[]) {
        this.data = arr
        this.length = arr.length

        // 为什么这里是this.length-1而不是this.length-2,因为第一个叶子节点不应该是this.length
        /**
         * 解释为什么第一个非叶子节点是Math.floor(this.length/2-1)
         * 
         * 设第一个非叶子节点是i，则其左子节点的下标是2i+1
         * 然后左子节点最大要<=this.length-1
         * 即2i+1 <= this.length-1
         * i<=（this.length)/2-1
         * 
         */

        let start = Math.floor((this.length)/2-1)

        // 
        for(let i=start; i>=0;i--) {
            this.heapify_down(i)
            // console.log(i);
            
        }

    }
}

let arr = [19,100,36,17,3,25,1,2,7]
const hp = new Heap(arr)

console.log(hp.data);
while(!hp.isEmpty()) {
    console.log(hp.extract());
    
}

export {}