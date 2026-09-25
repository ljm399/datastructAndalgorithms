import { swap, testSort } from "hy-algokit"

export function quickSortFromFront(arr: number[]): number[] {
    partition(0, arr.length - 1)

    function partition(left: number, right: number): void {
        if (left >= right) return

        const pivot = arr[left]
        let i = left + 1
        let j = right

        while (i <= j) {
            // 从左侧找到第一个大于或等于 pivot 的元素。
            while (i <= j && arr[i] < pivot) {
                i++
            }

            // 从右侧找到第一个小于或等于 pivot 的元素。
            while (i <= j && arr[j] > pivot) {
                j--
            }

            if (i <= j) {
                swap(arr, i, j)
                i++
                j--
            }
        }

        // 此时 j 左边的元素都 <= pivot，j 右边的元素都 >= pivot。
        // 将位于 left 的基准交换到 j 后，j 就是基准的最终位置。
        swap(arr, left, j)


        partition(left, j - 1)
        partition(j + 1, right)
        /**
         * 为什么基准在最左边时使用 j，在最右边时使用 i？
         *
         * 双指针循环结束时 i > j，并且：
         *   j 及其左边是小值区，元素都 <= pivot
         *   i 及其右边是大值区，元素都 >= pivot
         * 如果 i 与 j 之间还隔着一个元素，该元素一定等于 pivot，
         * 因此可以跳过它，不必再参与递归。
         *
         * 1. 基准位于最左边（希望最小值和基准交换）
         *    left 原本不属于待扫描区间，因此小值区实际是 [left + 1 ... j]。
         *    j 是小值区的右边界，把 arr[left] 与 arr[j] 交换后，基准落在 j：
         *
         *      swap(arr, left, j)
         *      partition(left, j - 1) 
         *      partition(j + 1, right)
         *
         * 2. 基准位于最右边（希望最大值和基准交换）
         *    right 原本不属于待扫描区间，因此大值区实际是 [i ... right - 1]。
         *    i 是大值区的左边界，把 arr[right] 与 arr[i] 交换后，基准落在 i：
         *
         *      swap(arr, i, right)
         *      partition(left, j)
         *      partition(i + 1, right)
         *
         *
         * 所以选择 i 还是 j，不取决于要交换“最大值”或“最小值”，
         * 而取决于基准在哪一侧：左侧基准应放到小值区末尾 j，
         * 右侧基准应放到大值区开头 i。
         */

    }

    return arr // 原地排序，返回的仍然是传入的数组
}


export {}
