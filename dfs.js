
function dfs(graph, start, visited = new Set(), traversal = []) {
    visited.add(start);
    traversal.push(start);

    const neighbors = graph[start] || [];
    for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited, traversal);
        }
    }
    return traversal;
}

// Example Usage:
const graph_dfs = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
};
console.log("DFS Traversal:");
console.log(dfs(graph_dfs, 'A'));
