class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }

}
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const head = new ListNode()
    let current = head
    let enterTen = 0
    while(l1!==null || l2!==null || enterTen!==0) {
        let val1 = l1?.val ?? 0
        let val2 = l2?.val ?? 0
        let sum = val1 + val2 + enterTen
        
        enterTen = Math.floor(sum/10)
        current.next = new ListNode(sum%10)
        current = current.next

        if(l1) {l1 = l1.next}
        if(l2) {l2 = l2.next}
    }

    // 必须要head.next,否则就把const head = new ListNode()这个head的默认值给添加到了返回的结果
    return head.next
}

export {}