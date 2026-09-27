import { measureSort, swap, testSort } from "hy-algokit"

export function quickSortFromEnd(arr:number[]):number[] {
    partition(0,arr.length-1)
    function partition(left:number,right:number) {
        if(left>=right) return

        // 减少最坏的方式：
        const mid = left + Math.floor((left+right)/2)
        if(arr[left]>arr[right]) swap(arr,left,right)
        if(arr[mid]>arr[right]) swap(arr,mid,right)
        if(arr[left]>arr[mid]) swap(arr,left,mid)

        let pivot = arr[right]

        let i = left
        let j = right - 1

        while(i<=j) { 
            while(arr[i]<pivot) { 
                i++
            }

            while(arr[j]>pivot) { 
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
        partition(i+1,right)
    }
    return arr // 原地排序，返回的仍然是传入的数组
}

testSort(quickSortFromEnd)
measureSort(quickSortFromEnd)
export {}