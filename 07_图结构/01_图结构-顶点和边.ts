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