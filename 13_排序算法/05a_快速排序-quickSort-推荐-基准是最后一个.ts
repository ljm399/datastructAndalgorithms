import { swap, testSort } from "hy-algokit"

export function quickSortFromEnd(arr:number[]):number[] {
    partition(0,arr.length-1)
    function partition(left:number,right:number) {
        if(left>=right) return
        let pivot = arr[right]
        let i = left
        let j = right - 1

        while(i<=j) { // 这里必须=，因为当两个指针指向同一个元素时，循环会直接结束，这个元素没有经过内部比较和指针移动，可能导致最终放置基准值的位置不正确。
            while(arr[i]<pivot) { // 怎么判断要不要有=符号呢，不知道可以发给ai他给你什么报错原因
            // 这里不行，因为ai返给你反例:arr = [1, 2]，会导致下面swap(arr,i,right)，使arr变为[2,1]
                i++
            }

            while(arr[j]>pivot) { // =可有可无，因为都是一样的值
                j--
            }

            if(i<=j) {
                swap(arr,i,j)
                i++
                j--
            }
        }
        swap(arr,i,right)
        partition(left,j)
        partition(i+1,right)// 左侧部分 | pivot | 右侧部分; i已经等于pivot了，因此索引 i 已经位于最终位置，不需要再次参加递归排序。右半部分自然从 i + 1 开始： 即arr[i]<=arr[r]<=arr[r]
    }
    return arr // 原地排序，返回的仍然是传入的数组
}


export {}