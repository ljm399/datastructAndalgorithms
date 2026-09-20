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

    // 根据索引插入节点
    inserted(value: T, position: number): boolean {
        // 不能是this.length-1,因为this.length则是直接append，-1则导致逻辑部分确实
        if(position<0 || position>this.length) return false 

        if(position===0) {
            this.prepend(value)
        }else if(position === this.length) {
            this.append(value)
        }else {
            const newNode = new doubleNode(value)
            let current = this.getNodeByPosition(position) as doubleNode<T>
            current.prev!.Next = newNode
            newNode.Next = current
            newNode.prev = current.prev
            current.prev = newNode
            this.length++
        }

        return true

    }

    // 根据索引删除
    removeat(position: number): T | null {
        if(position<0 || position>=this.length) return null

        let removeNode = this.head
        if(position===0) {
            if(this.length === 1) {
                this.head = null
                this.tail = null    
            }else {
                this.head!.Next!.prev = null
                this.head = this.head!.Next
            }
        }else if(position === this.length-1) {
            removeNode = this.tail
            this.tail!.prev!.Next = null
            this.tail = this.tail!.prev
        }else { 
            const node = this.getNodeByPosition(position) as doubleNode<T>
            removeNode = node
            node.prev!.Next = node.Next
            node.Next!.prev = node.prev
            // 疑问：我是否还需要下面的代码,因为担心不进行下面代码就会导致node节点没被回收
            // node.Next =null
            // node.prev = null
            // 解答：不是必须的，垃圾回收器判断对象是否回收，依据的是“是否仍然能从根对象访问到它”，而不是它是否还保存着其他对象的引用。
        }
        this.length--
        return removeNode?.value ?? null
    }
}   
export {}

const linked1 = new doubleLinkedList()
// linked1.append('cao')
// linked1.append('mj')
// linked1.append('wang')
// linked1.append('ap')
// linked1.traverse()

// console.log('prepend');
linked1.prepend('cao')
// linked1.prepend('mj')
// linked1.prepend('wang')
// linked1.prepend('ap')
// linked1.traverse()
// linked1.postTraverse()

console.log('inserted');
linked1.inserted('mj',0)
linked1.inserted('li',2)
linked1.inserted('wang',2)
linked1.traverse()

linked1.removeat(0)
linked1.removeat(2)
linked1.removeat(1)
linked1.traverse()
linked1.postTraverse()
