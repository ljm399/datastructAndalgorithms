import linkList from "./01-高阶链表结构LinkedList";
import { doubleNode } from "./双向链表节点类型";
class doubleLinkedList<T> extends linkList<T>{
    protected head: doubleNode<T>|null = null
    protected tail:doubleNode<T>|null = null
    append(value: T): void {
        const newNode = new doubleNode(value)
        if(!this.head) {
            this.head = newNode
            this.tail = newNode
        } else {
            this.tail!.Next = newNode
            // 报错：当父子类型不同，子类可以赋值给父类，但父类不可以赋值给子类
            // 解决方式一:缺点是每个都要断言
            // newNode.prev = this.tail as doubleNode<T>
            // 解决方式二，直接在给类定义tail
            newNode.prev = this.tail
            this.tail = newNode
        }
        this.length++
    }

    // 在最前面添加节点
    prepend(value:T):void {
        const newNode = new doubleNode(value)
        if(!this.head) {
            this.head = newNode
            this.tail = newNode
        } else {
            newNode.Next = this.head
            this.head.prev = newNode
            this.head = newNode
        }
        this.length++
    }

    // 反转链表
    postTraverse() {
        const arr:T[] = []
        let current = this.tail
        while(current) {
            arr.push(current.value)
            current = current.prev
        }
        console.log(arr.join('->'));
    }

}   
export {}

const linked1 = new doubleLinkedList()
// linked1.append('cao')
// linked1.append('mj')
// linked1.append('wang')
// linked1.append('ap')
// linked1.traverse()

console.log('prepend');
linked1.prepend('cao')
linked1.prepend('mj')
linked1.prepend('wang')
linked1.prepend('ap')
linked1.traverse()
linked1.postTraverse()