import { testSort } from "hy-algokit"

function mergeSort(arr:number[]):number[] {
    if(arr.length<=1) return arr
    const mid = Math.floor(arr.length/2)

    let leftArr = arr.slice(0,mid)
    let rightArr = arr.slice(mid)

    let newLeftArr = mergeSort(leftArr)
    let newRightArr = mergeSort(rightArr)

    // 定义两个指针，指向newLeftArr和newRightArr
    let newArr:number[] = []
    let i = 0 // 指向左边数组
    let j = 0 // 指向右边数组
    while(i<newLeftArr.length && j<newRightArr.length) {
        if(newLeftArr[i]<=newRightArr[j]) {
            newArr.push(newLeftArr[i])
            i++ // 这个和下面的j++可以解决左边是[6],右边是[4，5]，则第一次newArr是[4],j=1，i依旧是0
        }
        if(newLeftArr[i]>newRightArr[j]) {
            newArr.push(newRightArr[j])
            j++ 
        }
    }
    if(i<newLeftArr.length) { // 这里的length不用-1，比如右边是[4,5],两次添加后i=2
        newArr.push(...newLeftArr.slice(i))
    }
    if(j<newRightArr.length) { // 这里的length不用-1，比如右边是[4,5],两次添加后i=2
        newArr.push(...newRightArr.slice(j))
    }
    return newArr
}
testSort(mergeSort)