// 思考主要考察什么呢
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    nums1.forEach(item=>{
        // 还要排序
        nums2.push(item)
    })
    let nums = nums2.sort((a,b)=> a-b)
    
    if(nums.length%2===0) {
        // 下标是从零开始，而不是一，所以要-1
        let index1 = nums.length/2 -1 
        let index2 = nums.length/2
        let num = (nums[index1]+nums[index2])/2
        return num
    } else {
        let index1 = Math.floor(nums.length/2) 
        return nums[index1]
    }
};

console.log(findMedianSortedArrays([1,3],[2]));
export {}
