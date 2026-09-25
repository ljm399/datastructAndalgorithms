import { swap,testSort } from "hy-algokit"
// import { swap,measureSort } from "./utils"

function bubbleSort(arr:number[]):number[] {
    let lenght = arr.length
    let isSwap = false // 性能优化：冒泡排序对已经排序号的数组效率非常高
    // 老师做出了思路：举例第n和n-1次时，然后看规律得知
    for(let i = 0;i<lenght;i++) {
        for(let j = 0;j<lenght-i-1;j++) { // 为什么j<lenght-i-1要有个-1呢，因为下面是arr[j+1],要是不-1，则会越界（超出arr的范围）
            if(arr[j]>arr[j+1]) {
               swap(arr,j,j+1)
                isSwap = true
            }
        }
        if(!isSwap) return arr
    }
    return arr
}
// let arr = [2,6,12,1,2,1,3,5,8,7,8]
// console.log(bubbleSort(arr));
testSort(bubbleSort)
export {}