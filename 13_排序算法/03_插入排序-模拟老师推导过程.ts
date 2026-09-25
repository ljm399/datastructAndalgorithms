import { testSort } from "hy-algokit"

//简介：拿到新值，插入到前面有序的正确位置（即前面按个比其小则插入其后面）
function insertionSort(arr:number[]):number[] {
    // 比如第一次循环
    let maxNum = arr[1]//第一次时这里必须是1，因为前面需要有值和其比较，要是前面只有一个值，则默认前面是有序的

    let j = 1 -1 // 前面那个值
    while(arr[j]>maxNum && j >=0) {
        arr[j+1] = arr[j] // 要是maxNum小于前面那个值，则前面那个值移到后面
        j--
    }
    arr[j+1] = maxNum
    return arr
}
testSort(insertionSort)