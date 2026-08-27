// 相比你的算法，这个时间复杂度为O(n),你的是O(n^2)
function twoSum(nums: number[], target: number): number[] {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i];

        // 判断这个数组里面有没用你
        if (map.has(complement)) {
            return [map.get(complement), i]
        }

        map.set(nums[i], i)
    }
    return []
};

console.log(twoSum([3,4,6,7],13));

export {}