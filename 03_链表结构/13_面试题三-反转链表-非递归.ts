import { ArrayStack } from "../01_实现栈结构/01_实现栈结构_数组"
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function reverseList(head: ListNode | null): ListNode | null {
    let current = head
    const stack1 = new ArrayStack<ListNode>()// 为什么下面有unknown不能赋值，因为你这里没有传入<T>
    while(current) {
        stack1.push(current)
        current = current.next
    }

    const reverselinkedlist = stack1.pop()
    if (!reverselinkedlist) return null

    let tail:ListNode = reverselinkedlist // 必须要等于reverselinkedlist,而不是为null，因为一是这里因为有可能为null导致后面的tail!.next = node报错，二是解决不能赋值前使用的问题
    while (!stack1.isEmtry()) {
        const node = stack1.pop()! //！作用告诉 TypeScript：这里结果一定不是 undefined，把类型视为 ListNode
        tail!.next = node
        tail = node
    }

    // 必须将尾部节点设置为null，否则尾部节点指向倒数第二个节点导致循环遍历
    tail!.next = null

    // 返回的是第一个节点 
    return reverselinkedlist
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