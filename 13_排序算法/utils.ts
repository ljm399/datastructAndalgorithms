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
console.log(swap([1,2],0,1));
