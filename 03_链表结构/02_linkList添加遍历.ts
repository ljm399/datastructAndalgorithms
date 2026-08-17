// 封装两个类
// 第一个类：每个节点的类型
class node<T> {
    Next: node<T> | null = null
    // value: T
    // constructor(value: T) {
    //     this.value = value
    // } // 也可以时用js语法
    constructor(public value:T) {}
}

// 第二个类：创建每个节点连接的类
class linkList<T> {
    head: node<T> | null = null 
    private size:number = 0 // 添加private，让外面访问不到，内部可以

    get length(){
        return this.size
    }

    // 追加节点（核心要创建个临时变量）
    append(value:T) {
        // 首先创建节点
        const newnode = new node(value) // 不用new node<T>(value) 因为ts会自动类型推断T是什么
        //详细解释：constructor(public value: T)；你传进去的 value 是 T，所以它就自动推出这个 node 的泛型参数也是 T。

        // 追加节点，引入临时变量
        if(!this.head) {
            this.head = newnode
        } else {
            let current =  this.head
            while(current.Next) {
                current = current.Next
            }
            current.Next = newnode
        }

        this.size++
    }

    // 遍历节点
    traverse() {
        const arr: T[] = []
        let current = this.head
        while(current) { // 不是current.next而是current，否则就少打印一个元素；因为前者时下一个节点存在，后者是当前元素
            arr.push(current.value)
            current = current.Next
        }
        console.log(arr.join("->"));
        
        
    }
}

const node1 = new linkList<string>()
node1.append('cao')
node1.append('mjl')
node1.append('code')
node1.append('code2')

node1.traverse()


export {}   