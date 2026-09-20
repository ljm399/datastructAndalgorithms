class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }

}
// 链表反转
function linkedReversal(head:ListNode| null):ListNode|null {
    let newhead:ListNode|null = null
    while(head) {
        let current = head.next // 因为A-》B，你让A-》null，为了让B不丢失
        head.next = newhead
        newhead = head
        head = current
    }
    return newhead    
}


// 核心考察就是链表翻转
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let num1 = ''
    let num2 = ''
    let newL1 = linkedReversal(l1)
    let newL2 = linkedReversal(l2)
    while(newL1) {
       num1 = num1.concat(String(newL1.val))
       newL1 = newL1.next
    }
    while(newL2) {
       num2 = num2.concat(String(newL2.val))
       newL2 = newL2.next
    }
    // const num3 = String(Number(num1) + Number(num2))
    const num3 = (BigInt(num1 || '0') + BigInt(num2 || '0')).toString();
    
    let head:ListNode | null = null // 保存头节点
    let cur:ListNode | null = null

    // 问题1：num3每个数字怎么遍历
    // 问题2：每个数字都要设置一个newNode,这个困难就是变量名冲突
    // 下面代码不会出现变量名冲突
    //newNode 和 newNode2 是两个不同变量名，并且都在 for 循环的代码块内用 const / let 声明，每一轮循环都有自己的作用域，不会发生变量名冲突。
    // 问题3：使用变量不当导致节点断了
    for(let i =0;i<num3.length;i++) {
        const num = num3[num3.length-i-1]
        const newNode = new ListNode(Number(num)) 
        if(head===null){
            head = newNode
            cur = newNode
        } else {
            cur!.next = newNode
            cur = newNode
        }
    }

    let current = head//保存头节点，否则该链表就没了
    while(current) {
        console.log(current?.val);
        current = current.next
    }

    return head


};
const node1 = new ListNode(1)
const node2 = new ListNode(4)
const node3 = new ListNode(5)
const node8 = new ListNode(5)
node1.next = node2
node2.next = node3
node3.next = node8

const node4 = new ListNode(18)
const node5 = new ListNode(2)
const node6 = new ListNode(3)
const node7 = new ListNode(3)
node4.next=node5
node5.next=node6
node6.next=node7

addTwoNumbers(node1,node4)


export {}