import { swap, testSort } from "hy-algokit";

// 老师怎么想出来的：举例，下面是具体实战
function selectionSort(arr:number[]):number[] {
    let minIndex = 0
    let length = arr.length
    for(let j=0;j<length;j++){ //一般用i作为外部循环，内部用j
        if(arr[j]<arr[minIndex]) {
            minIndex = j
        }
    }
    console.log('最小值是',arr[minIndex]); // 拿到最小值
    // 放到第一的位置
    swap(arr,minIndex,0)

    minIndex = 1 // 这个在下一次遍历前要在赋值为第二位置的值
    // 拿到第二小的值，放到第二的位置
    for(let j=1;j<length;j++){ //一般用i作为外部循环，内部用j
        if(arr[j]<arr[minIndex]) {
            minIndex = j
        }
    }
    console.log('最小值是',arr[minIndex]); // 拿到最小值
    // 放到位置为1
    swap(arr,minIndex,1)


    return arr
}
testSort(selectionSort)
