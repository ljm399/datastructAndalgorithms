/**
 * 
 * @param arr 要查找的数组（注意要先排好序）
 * @param count 要查找的值
 * @returns 要查找的值在数组里面的索引位置
 */
export default function binarySearch(arr:number[],count:number):number {
    let left = 0
    let right = arr.length -1 
    let mid = Math.floor((arr.length -1 )/ 2)
    while(left<=right) {
        if(arr[mid] === count) {
            return mid
        }else if(arr[mid]<count) {
            left = mid + 1
        } else if(arr[mid]>count) {
            right = mid -1
        }
        mid = Math.floor((right+left)/2)
    }
    return -1
}
