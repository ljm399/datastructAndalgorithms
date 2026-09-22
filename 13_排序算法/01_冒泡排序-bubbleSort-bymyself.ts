import { swap } from "hy-algokit"

function bubbleSort(arr:number[]):number[] {
    let newArr:number[] = []

    while(arr.length) {
        for(let i = 0;i<arr.length-1;i++) {
            if(arr[i]>arr[i+1]) {
               swap(arr,i,i+1)
            }
        }
        newArr.unshift(arr.pop()!)
    }

    return newArr
}

let arr = [2,6,12,1,2,1,3,5,8,7,8]
console.log(bubbleSort(arr));

export {}