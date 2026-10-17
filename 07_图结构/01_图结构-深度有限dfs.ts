class Graph<T> {
    vertices:T[] = []

    // edgess:<T,T[]> = new Map()
    // 上面报错
    // edgess:Map<T,T[]> = new Map()
    // 或
    edges = new Map<T,T[]>()

    addVertex(Vertex:T) {
        this.vertices.push(Vertex)
        this.edges.set(Vertex,[])
    }

    addEdge(Vertex:T,sonVertex:T) {
        this.edges.get(Vertex)?.push(sonVertex)

        // 要是是无向量的图则删去下面的代码
        this.edges.get(sonVertex)?.push(Vertex)

    }

    traverse() {
        for(let Vertex of this.vertices) {
            console.log(Vertex,this.edges.get(Vertex)?.join(''));     
        }
    }

    // 广度优先搜索（Breadth-First Search)
    bfs() {
        const queueArr:T[] = []
        queueArr.push(this.vertices[0])

        // 存放已经遍历过的节点
        const visited = new Set()
        visited.add(this.vertices[0])

        while(queueArr.length) {
            const vertex = queueArr.shift()!
            console.log(vertex);
            const adjlist = this.edges.get(vertex)
            if(!adjlist) continue
            for(const vertex of adjlist) {
                if(!visited.has(vertex)) {
                    queueArr.push(vertex)
                    visited.add(vertex)
                }
            }
        }
    }

    // 深度优先（deep-first search）
    /* 
             A
            / \
            B   C
            / \
            D   E 答案是ABDEC

    */
    dfs() {
        const stackArr:T[] = []
        stackArr.push(this.vertices[0])

        // 存放已经遍历过的节点
        const visited = new Set<T>()
        visited.add(this.vertices[0])

        while(stackArr.length) {
            const vertex = stackArr.pop()!
            console.log(vertex);
            
            //Adjacency List Grap指的是“邻接表图”
            const adjlist = this.edges.get(vertex)
            if(!adjlist) continue
            // for(const vertex of adjlist) {
            //     const item = 
            // } 因为要从元素某位选起，所以用普通的for

            // 为什么这里又是最后一个开始遍历，然后又是push添加的最后一个位置
            // 为了符合stack的属性，否则你可以从0开始遍历然后第一个unshift添加
            // 为什么数组尽量不要使用unshift而是使用push
            // 因为- `push`：只在数组末尾追加，O (1) 很快
            //  - `unshift`：在数组最前面插入，**整个数组所有元素都要往后挪一位，O (n)**顶点一多，性能明显变差。
            for(let i = adjlist.length -1;i>=0;i--) {
                const item = adjlist[i]
                if(!visited.has(item)) {
                    stackArr.push(item)
                    visited.add(item)
                }
            }
        }
    }
}
const graph = new Graph<string>()

graph.addVertex("A")
graph.addVertex("B")
graph.addVertex("C")
graph.addVertex("D")
graph.addVertex("E")
graph.addVertex("F")
graph.addVertex("G")
graph.addVertex("H")
graph.addVertex("I")

graph.addEdge("A", "B")
graph.addEdge("A", "C")
graph.addEdge("A", "D")
graph.addEdge("C", "D")
graph.addEdge("C", "G")
graph.addEdge("D", "G")
graph.addEdge("D", "H")
graph.addEdge("B", "E")
graph.addEdge("B", "F")
graph.addEdge("E", "I")
graph.traverse()

console.log('----bfs遍历-------');
graph.bfs()
console.log('----dfs遍历-------');
graph.dfs()
export default {}