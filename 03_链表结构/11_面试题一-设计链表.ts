// class node<T> {
//     value:T|null
//     next:node<T> | null = null
//     constructor(value:T,next:T) { 
//         this.value = value
//         this.next = next
//     }
// }
class Node {
    value:number|null
    next:Node | null = null
    constructor(value:number) { 
        this.value = value
    }
}
class MyLinkedList {
    // head = node<T> | null // 问题这个head怎么写呀
    head : Node | null = null
    private size: number = 0
    constructor() {
        
    }

    get(index: number): number {
        if(index<0 || index>=this.size) return -1
        let position = 0
        let current = this.head
        while(position++<index) {
            current = current?.next ?? null
        }
        // return current!.value as number //或
        return current === null ? -1 : Number(current.value)
    }

    addAtHead(val: number): void {
        let newNode = new Node(val)// 为什么这里时new Node<T>报错，因为val明确时number，则T就是number，你在传入就报错

        newNode.next = this.head ?? null
        this.head = newNode // 为什么有报错,因为这里明确时number类型，不需要你使用<T>这样的泛型
        this.size++
    }

    addAtTail(val: number): void {
        let current = this.head// 这段代码意思时current指向第一个节点，而不是current等于了this.head
        let newnode = new Node(val)
        if(current===null) {
            // current = newnode // 错，不是current而应该时this.head

            this.head = newnode
        } else {
            while(current.next) {
                current = current.next
            }
            current!.next = newnode // 报错，因为可能存在空链表
        }
        this.size++
    }

    addAtIndex(index: number, val: number): void {
        if(index<0 || index>this.size) return
        let position = 0
        let previous:Node|null = null
        let current = this.head
        let newnode = new Node(val)
        if(index === 0){
            this.addAtHead(val)
        } else {
            while(position++<index && current) {
                previous = current
                current = current.next
            }
            previous!.next = newnode
            newnode.next = current
            this.size++
        }
    }

    deleteAtIndex(index: number): void {
        if(index<0 || index>=this.size) return
        let position = 0
        let previous:Node|null = null
        let current = this.head
        if(index === 0){
            this.head = this.head?.next ?? null
        } else {
            while(position++<index && current) {
                previous = current
                current = current.next
            }
            previous!.next = current?.next ?? null
        }
        this.size--
    }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */

// var obj = new MyLinkedList()
// var param_1 = obj.get(index)
//  obj.addAtHead(3)
//  obj.addAtTail(4)
//  obj.addAtIndex(2,5)
//  obj.deleteAtIndex(1)