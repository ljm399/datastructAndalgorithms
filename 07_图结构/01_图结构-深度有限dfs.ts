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
    dfs() {
        const queueArr:T[] = []
        queueArr.push(this.vertices[0])

        // 存放已经遍历过的节点
        const visited = new Set<T>()
        visited.add(this.vertices[0])

        while(queueArr.length) {
            const vertex = queueArr.pop()!
            console.log(vertex);
            
            //Adjacency List Grap指的是“邻接表图”
            const adjlist = this.edges.get(vertex)
            if(!adjlist) continue
            // for(const vertex of adjlist) {
            //     const item = 
            // } 因为要从元素某位选起，所以用普通的for
            for(let i = adjlist.length -1;i>=0;i--) {
                const item = adjlist[i]
                if(!visited.has(item)) {
                    queueArr.push(item)
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