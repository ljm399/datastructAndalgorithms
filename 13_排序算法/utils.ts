// 交换两个值
export function swap(arr:number[],i:number,j:number) {
    // 1.方式一：
    // let save = arr[i]
    // arr[i] = arr[j]
    // arr[j] = save
    // return arr

    // 2.方式二：es6新语法
    [arr[i],arr[j]] = [arr[j],arr[i]]
    return arr
}

/**
 * 判断数组是否排序好（从小到大）
 * @param arr 输入要检测是否排序好的数组
 * @returns 
 */
export function isSort(arr:number[]):boolean {
    for(let i=0;i<arr.length-1;i++) { // 注意这里的length要-1，不-1则下面的arr到最后一次循环会“越界”
        if(arr[i]>arr[i+1]) {
            return false
        }
    }
    return true
}


type sortFunction = (arr:number[]) => number[]
export function testSort(sortFT:sortFunction) {
    const newArr = Array.from({length:20},()=>{
        return Math.floor(Math.random()*200)
    })
    console.log("原来数组是",newArr);
    const sortArr = sortFT(newArr)
    console.log("排序后的数组是",sortArr);
    console.log('排序后的数组是否排序号',isSort(sortArr));
    
}