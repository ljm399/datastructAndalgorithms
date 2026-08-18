/**
 * 
 * @param arr 要查找的数组
 * @param count 要查找的值
 * @returns 要查找的值在数组里面的索引位置
 */
export default function squentSearch(arr:number[],count:number):number {
    for(let i=0;i<arr.length;i++) {
        if(arr[i]===count) {
            return i
        }
    }
    return -1 //一般没找到就返回-1
}
export {} // 不加就会出现函数实现重复，因为你其他文件的函数名和这里一样就报这种错
