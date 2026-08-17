/* 
    题目：删除节点同时无法访问第一个节点
    含义：无法访问第一个节点 意思是你平时删除节点是依靠head来删除，他说这句话就是为了提示不能用head来删除

    这一题启发
    节点不一定要被删除，而是通过和下一个节点相同的值来替换，然后原本不会被删除的节点（即上面的“下一个节点”）因为没被引用(->),所以被垃圾回收了
*/
//  * Definition for singly-linked list.
 class ListNode {
      val: number
      next: ListNode | null
      constructor(val?: number, next?: ListNode | null) {
         this.val = (val===undefined ? 0 : val)
          this.next = (next===undefined ? null : next)
      }
  }


/**
 Do not return anything, modify it in-place instead.
 */
function deleteNode(node: ListNode | null): void {
    node!.val = node!.next!.val
    node!.next = node!.next!.next
};