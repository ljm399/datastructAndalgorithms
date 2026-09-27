import { swap, testSort, btPrint, cbtPrint, measureSort } from "hy-algokit"

function heapSort(arr:number[]):number[] {
    const n  = arr.length
    // 原地建堆
    // 拿到第一个非叶子节点
    const start = Math.floor(n/2) - 1 // 这个有问题
    /** 首个非叶子节点公式由来
     *  话语：至少有个左子节点
     * 设长度为n,首个非叶子节点是i,
     *  2i+1 <= n -1 得出 i <= n/2-1
     */
    for(let i = start;i>=0;i--) {
        heapify_down(arr,n,i)
    }

    // // 第一次交换
    // swap(arr,0,n-1)
    // heapify_down(arr,n-1,0)

    // // 第二次
    // swap(arr,0,n-2)
    // heapify_down(arr,n-2,0)

    // 故n次为
    for(let i=n-1;i>=0;i--){
        swap(arr,0,i)
        heapify_down(arr,i,0)
    }

    return arr
}

/**
 * 
 * @param arr 具体数组
 * @param n 过滤的长度
 * @param index 过滤的索引值
 */
// 为什么你会觉得下滤无法把数组中所有值都比较到
// 因为你忽略了2i+1,2i+2那些都是会覆盖整个数组的！而且你这里是遍历了
function heapify_down(arr:number[],n:number,index:number) {
    while(2*index+1<n) { // 由于n=this.length所以这里不能有等于
    /** 为什么不是2*index+2小于或等于n呢
     * 因为循环要判断的是：当前节点是否至少存在一个子节点。
     * 要是为while (2 * index + 2 < this.length) 这个条件只有在右子节点存在时才成立，相当于要求左右子节点都存在。因此，它会漏掉“只有左子节点”的情况。
     * 可以等于，因为你的n是arr.length-1
     */

        let leftIndex = 2*index + 1
        let rightIndex = 2*index + 2
        let largerIndex = leftIndex

        // if(arr[leftIndex]<arr[rightIndex]) { // 这里报错
        // 解决
        if(rightIndex<n && arr[leftIndex]<arr[rightIndex]) { // 这里的rightIndex也不能等于n，因为n是this.length
            largerIndex = rightIndex
        }

        if(arr[index]>=arr[largerIndex]) break

        swap(arr,index,largerIndex)
        index = largerIndex
    }

    
}

testSort(heapSort)
measureSort(heapSort)

export {}