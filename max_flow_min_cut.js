
class Edge {
    constructor(capacity) {
        this.capacity = capacity;
        this.flow = 0;
    }
}

class Graph {
    constructor(numVertices) {
        this.numVertices = numVertices;
        this.adj = Array.from({ length: numVertices }, () => []);
        this.edges = [];
    }

    addEdge(u, v, capacity) {
        const edge = new Edge(capacity);
        const reverseEdge = new Edge(0); // For residual graph
        this.edges.push(edge);
        this.edges.push(reverseEdge);
        this.adj[u].push([v, this.edges.length - 2]); // Store index of edge in edges list
        this.adj[v].push([u, this.edges.length - 1]); // Store index of reverse edge
    }
}

function bfsMaxFlow(graph, s, t, parent) {
    const visited = new Array(graph.numVertices).fill(false);
    const queue = [];
    queue.push(s);
    visited[s] = true;

    while (queue.length > 0) {
        const u = queue.shift();

        for (const [v, edgeIndex] of graph.adj[u]) {
            const edge = graph.edges[edgeIndex];
            if (!visited[v] && edge.capacity - edge.flow > 0) {
                queue.push(v);
                visited[v] = true;
                parent[v] = edgeIndex;
                if (v === t) {
                    return true;
                }
            }
        }
    }
    return false;
}

function edmondsKarp(graph, s, t) {
    const parent = new Array(graph.numVertices).fill(-1);
    let maxFlow = 0;

    while (bfsMaxFlow(graph, s, t, parent)) {
        let pathFlow = Infinity;
        let v = t;
        while (v !== s) {
            const edgeIndex = parent[v];
            const edge = graph.edges[edgeIndex];
            pathFlow = Math.min(pathFlow, edge.capacity - edge.flow);

            // Find 'u' for the current 'v'
            // This part is a bit tricky in JS without direct access to the reverse edge's 'u'
            // A simpler approach for Edmonds-Karp often involves storing 'u' in the parent array as well.
            // For this translation, we'll assume the reverse edge's index is edgeIndex ^ 1
            const reverseEdgeIndex = edgeIndex ^ 1;
            const reverseEdge = graph.edges[reverseEdgeIndex];

            // Find the source vertex 'u' from the reverse edge's adjacency list
            let uFound = false;
            for (let i = 0; i < graph.numVertices; i++) {
                for (const [neighborV, neighborEdgeIndex] of graph.adj[i]) {
                    if (neighborV === v && neighborEdgeIndex === edgeIndex) {
                        v = i; // u is i
                        uFound = true;
                        break;
                    }
                }
                if (uFound) break;
            }
        }
        
        maxFlow += pathFlow;
        v = t;
        while (v !== s) {
            const edgeIndex = parent[v];
            graph.edges[edgeIndex].flow += pathFlow;
            graph.edges[edgeIndex ^ 1].flow -= pathFlow; // Residual edge

            // Find 'u' for the current 'v'
            let uFound = false;
            for (let i = 0; i < graph.numVertices; i++) {
                for (const [neighborV, neighborEdgeIndex] of graph.adj[i]) {
                    if (neighborV === v && neighborEdgeIndex === edgeIndex) {
                        v = i; // u is i
                        uFound = true;
                        break;
                    }
                }
                if (uFound) break;
            }
        }
    }
    return maxFlow;
}

// Example Usage:
const numVertices = 6;
const graph_mfmc = new Graph(numVertices);
graph_mfmc.addEdge(0, 1, 10);
graph_mfmc.addEdge(0, 2, 10);
graph_mfmc.addEdge(1, 3, 4);
graph_mfmc.addEdge(1, 4, 8);
graph_mfmc.addEdge(2, 4, 9);
graph_mfmc.addEdge(3, 5, 10);
graph_mfmc.addEdge(4, 5, 10);

const source = 0;
const sink = 5;
console.log("Max Flow Min Cut Algorithm (Edmonds-Karp):");
console.log(`Max Flow: ${edmondsKarp(graph_mfmc, source, sink)}`);
