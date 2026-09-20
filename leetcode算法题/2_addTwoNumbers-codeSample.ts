class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }

}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let dummy = new ListNode(0);
    let temp = dummy; // 学习：这个保存头部节点的思路

    let carry = 0;
    
    while (l1 !== null || l2 !== null || carry !== 0) {
        let val1 = l1 ? l1.val : 0;
        let val2 = l2 ? l2.val : 0;
        

        // 算法：
        // carry只有两个值，1和0，要是1的话，就下次进行 + carry;注意：是倒序存储
        let sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        temp.next = new ListNode(sum % 10);


        
        temp = temp.next;


        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }

        // 打印代码
        let current:ListNode|null = dummy//保存头节点，否则该链表就没了
        while(current) {
            console.log(current?.val);
            current = current.next
        }
    return dummy.next;
}
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
