import { swap, testSort } from "hy-algokit";

function selectionSort(arr:number[]):number[] {
    let minIndex = 0
    let length = arr.length

    // 怎么做出：看推导过程中每个实例哪里变化了
    // 外部循环：
    for(let i=0;i<length-1;i++){ // 问题1：这里的length要-1，是因为当循环执行到 i = length - 2 时，会在最后两个位置中选出较小值放到倒数第二个位置。这样最后一个位置自然就是最大值，无须再单独选择
        minIndex = i
        for(let j = i + 1;j<length;j++) {
            // 问题2：为什么这里的j=i还要+1，是因为minIndex = i 已经把 arr[i] 设为候选最小值，所以 j 从 i + 1 开始，只需要拿后面的元素与候选最小值比较。
            // 问题3：为什么内部循环时<length，而外部循环则<length-1 
            // 因为内部他需要拿到最后一个元素，和最小那个元素比较
            if(arr[j]<arr[minIndex]) {
                minIndex = j
            }
        }
        // 性能微微优化
        if(minIndex!==i) {
            swap(arr,minIndex,i)
        }
    }
    return arr
}
testSort(selectionSort)
