import { swap, testSort, measureSort, compareSort } from "hy-algokit"
import { quickSortFromEnd } from "./05a_快速排序-quickSort-推荐-基准是最后一个"
import { quickSortFromFront } from "./06_快速排序-quickSort-基准在第一个"

function quickSortFromMid(arr: number[]): number[] {
    partition(0, arr.length - 1)

    function partition(left: number, right: number): void {
        if (left >= right) return

        // 保存基准的值。交换过程中中间下标处的元素可能会改变。
        const pivot = arr[Math.floor((left + right) / 2)]
        let i = left
        let j = right

        while (i <= j) {
            // 跳过已经位于 pivot 左侧的元素。
            while (i <= j && arr[i] < pivot) {
                i++
            }

            // 跳过已经位于 pivot 右侧的元素。
            while (i <= j && arr[j] > pivot) {
                j--
            }

            if (i <= j) {
                // 交换后，i 和 j 当前指向的元素都到了正确的一侧。
                swap(arr, i, j)
                i++
                j--
            }
        }

        // 这个版本不会把基准固定到某一个下标。
        // 循环结束后，[left, j] 和 [i, right] 是两个待排序区间。
        partition(left, j)
        partition(i, right)
    }

    return arr // 原地排序，返回的仍然是传入的数组
}

// testSort(quickSort)
// compareSort([quickSortFromMid,quickSortFromEnd,quickSortFromFront])
// measureSort(quickSortFromMid)
// measureSort(quickSortFromEnd)
// measureSort(quickSortFromFront)

export {}
