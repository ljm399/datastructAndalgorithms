function twoSum(nums: number[], target: number): number[] {
    let n1 = -1
    let n2 = -1
    for(let i = 0;i<nums.length;i++) {
        for(let a=i+1;a<nums.length;a++) {
            if(nums[i]+nums[a] === target) {
                n1 = i
                n2 = a
            }
        }
    }
    return [n1,n2]
};

console.log(twoSum([3,4,6,7],13));
