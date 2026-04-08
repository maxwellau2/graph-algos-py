
function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    visited.add(start);

    let traversal = [];

    while (queue.length > 0) {
        const vertex = queue.shift();
        traversal.push(vertex);

        const neighbors = graph[vertex] || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return traversal;
}

// Example Usage:
const graph_bfs = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
};
console.log("BFS Traversal:");
console.log(bfs(graph_bfs, 'A'));
