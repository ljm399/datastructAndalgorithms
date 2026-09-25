import { swap } from "hy-algokit"

// 冒泡排序对已经排序好的数组效率非常高
// 这里方法相对老师的缺点
// arr.pop() 会清空传入的原数组，函数具有副作用。
    // “副作用”是：调用 bubbleSort(arr) 后，不仅返回一个排序后的新数组，还修改了函数外部传入的原数组。
// newArr.unshift() 每次都需要移动已有元素，本身也是 O(n) 操作。
function bubbleSort(arr:number[]):number[] {
    let newArr:number[] = []
    let isSwap = false

    while(arr.length) {
        for(let i = 0;i<arr.length-1;i++) {
            if(arr[i]>arr[i+1]) {
               swap(arr,i,i+1)
               isSwap = true
            }
        }
        if(!isSwap) {
            newArr.unshift(...arr)
            arr.length = 0
            break
        }
        newArr.unshift(arr.pop()!)
    }

    return newArr
}

let arr = [2,6,12,1,2,1,3,5,8,7,8]
console.log(bubbleSort(arr));

export {}