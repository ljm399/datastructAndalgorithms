import { testSort } from "hy-algokit"
//简介：拿到新值，插入到前面有序的正确位置（即前面按个比其小则插入其后面）
function insertionSort(arr:number[]):number[] {
    let n = arr.length // 默认用n表示长度
    for(let i = 1;i<arr.length;i++) {
        let maxNum = arr[i]
        let j = i - 1
        while(arr[j]>maxNum && j >=0) {
            arr[j+1] = arr[j] // 要是maxNum小于前面那个值，则前面那个值移到后面
            j--
         }
        arr[j+1] = maxNum
    }
    return arr
}
testSort(insertionSort)
export default {}