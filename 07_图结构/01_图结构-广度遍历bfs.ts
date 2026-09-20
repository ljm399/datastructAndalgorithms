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

        // for (const element of this.edges.get(this.vertices[0])) {
        // for (const element of this.edges.get(queueArr.shift())) {
        // } // 报错：对象可能未定义
        // this.edges.get(this.vertices[0])?.forEach(vertex => {
        //     console.log(vertex);    
        // })// 疑问：this.vertices[0]随时在这个foreach后更新，所以可能导致错误，所以不能用吗

        // 防止在反上面错误，下次提醒自己是用for还是while呢，上面明显不知道要执行多少次，所以肯定用while
        // 正确写法
        while(queueArr.length) {
            const vertex = queueArr.shift()!//非空断言，不加！则下面的this.edges.get(vertex)报错，可以用方式一的&&，英文这里确认不会是空，所以用!
            console.log(vertex);

            // 方式一
            // vertex && this.edges.get(vertex)?.forEach(vertex =>{
            //     if(!visited.has(vertex)) {
            //         queueArr.push(vertex)
            //         visited.add(vertex)
            //     }
            // })

            // 方式二
            const adjlist = this.edges.get(vertex)
            if(!adjlist) continue // 这里要是没有，则上面的this.edges.get(vertex)最后要加!
            for(const vertex of adjlist) {
                if(!visited.has(vertex)) {
                    queueArr.push(vertex)
                    visited.add(vertex)
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

console.log('----遍历-------');
graph.bfs()
export default {}