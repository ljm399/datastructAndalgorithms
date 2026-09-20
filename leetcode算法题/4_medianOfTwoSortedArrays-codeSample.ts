function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // 始终在较短的数组中二分
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const m = nums1.length;
  const n = nums2.length;
  let left = 0;
  let right = m;

  while (left <= right) {
    const i = Math.floor((left + right) / 2);
    const j = Math.floor((m + n + 1) / 2) - i;

    const left1 = i === 0 ? -Infinity : nums1[i - 1];
    const right1 = i === m ? Infinity : nums1[i];

    const left2 = j === 0 ? -Infinity : nums2[j - 1];
    const right2 = j === n ? Infinity : nums2[j];

    // 左半部分的所有值都 <= 右半部分的所有值
    if (left1 <= right2 && left2 <= right1) {
      if ((m + n) % 2 === 1) {
        return Math.max(left1, left2);
      }

      return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
    }

    if (left1 > right2) {
      right = i - 1;
    } else {
      left = i + 1;
    }
  }

  throw new Error("输入数组不是升序数组");
}

console.log(findMedianSortedArrays([1,3],[2]));
export {}
/**
 * 真正符合要求的解法是：
- 不合并数组；
- 在较短数组上二分查找“分割位置”；
- 让两个数组左侧元素总数等于右侧元素总数；
- 同时满足左边最大值 <= 右边最小值；
- 根据总长度奇偶计算中位数。
难点主要在于边界处理：
- 某一侧分割位置在数组开头或结尾；
- 两数组长度不同；
- 总长度为奇数或偶数；
- 如何根据左右边界调整二分方向。
 */