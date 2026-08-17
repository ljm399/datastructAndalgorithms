class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function reverseList(head: ListNode | null): ListNode | null {
   let newhead: ListNode | null = null
   while(head) {
    let current = head.next! // !解决head=current会报错的问题
    head.next = newhead
    newhead = head
    head = current
   }
   return newhead
};

//测试代码
const linkedlist1 = new ListNode(1)
const linkedlist2 = new ListNode(2)
const linkedlist3 = new ListNode(3)
linkedlist1.next = linkedlist2
linkedlist2.next = linkedlist3

const reverselinkedlist = reverseList(linkedlist1)
let firtnode = reverselinkedlist
while(firtnode) {
    console.log(firtnode.val);
    firtnode = firtnode.next
}