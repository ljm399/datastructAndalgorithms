function twoSum(nums: number[], target: number): number[] {
    const mp = new Map()
    for(let i = 0;i<nums.length;i++) {
        const difference = target - nums[i]
        if(mp.has(difference)) {
            // 
            return [mp.get(difference),i]
        }
        mp.set(nums[i],i)
    }
    return []
}