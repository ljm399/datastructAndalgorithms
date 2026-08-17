class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

// let count = 0
function reverseList(head: ListNode | null): ListNode | null {
    if(head===null || head.next===null) return head
    const newhead = reverseList(head.next ?? null)// 这里拿到的是最里面的那一次递归（即是if(head===null || head.next===null) return head中的head，就是反转后的第一个节点），之后每次递归都是把最里面的递归不断传出去

    // 拿到的时倒数第二个节点，然后递归这个函数的下一个递归函数
    // console.log(`第${count++}递归，head的值是`+head.val);
    head.next.next = head
    head.next = null

    return newhead // 这返回什么呢，然后外面怎么拿到反转好的链表呢，
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

// 打印递归代码