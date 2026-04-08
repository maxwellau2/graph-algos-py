
document.addEventListener('DOMContentLoaded', () => {

    // BFS
    const graph_bfs = {
        'A': ['B', 'C'],
        'B': ['D', 'E'],
        'C': ['F'],
        'D': [],
        'E': ['F'],
        'F': []
    };
    const bfsOutput = document.getElementById('bfs-output');
    const bfsCode = document.getElementById('bfs-code');
    bfsCode.textContent = bfs.toString();
    bfsOutput.textContent = `BFS Traversal: ${bfs(graph_bfs, 'A').join(' -> ')}`;

    // DFS
    const graph_dfs = {
        'A': ['B', 'C'],
        'B': ['D', 'E'],
        'C': ['F'],
        'D': [],
        'E': ['F'],
        'F': []
    };
    const dfsOutput = document.getElementById('dfs-output');
    const dfsCode = document.getElementById('dfs-code');
    dfsCode.textContent = dfs.toString();
    dfsOutput.textContent = `DFS Traversal: ${dfs(graph_dfs, 'A').join(' -> ')}`;

    // Dijkstra's
    const graph_dijkstra = {
        'A': [['B', 1], ['C', 4]],
        'B': [['C', 2], ['D', 5]],
        'C': [['D', 1]],
        'D': []
    };
    const dijkstraOutput = document.getElementById('dijkstra-output');
    const dijkstraCode = document.getElementById('dijkstra-code');
    dijkstraCode.textContent = dijkstra.toString() + '\n\n' + PriorityQueue.toString(); // Include PriorityQueue class
    dijkstraOutput.textContent = `Dijkstra's from A: ${JSON.stringify(dijkstra(graph_dijkstra, 'A'))}`;

    // Max Flow Min Cut
    const numVertices_mfmc = 6;
    const graph_mfmc = new Graph(numVertices_mfmc);
    graph_mfmc.addEdge(0, 1, 10);
    graph_mfmc.addEdge(0, 2, 10);
    graph_mfmc.addEdge(1, 3, 4);
    graph_mfmc.addEdge(1, 4, 8);
    graph_mfmc.addEdge(2, 4, 9);
    graph_mfmc.addEdge(3, 5, 10);
    graph_mfmc.addEdge(4, 5, 10);
    const source = 0;
    const sink = 5;
    const maxFlowMinCutOutput = document.getElementById('max-flow-min-cut-output');
    const maxFlowMinCutCode = document.getElementById('max-flow-min-cut-code');
    maxFlowMinCutCode.textContent = Edge.toString() + '\n\n' + Graph.toString() + '\n\n' + bfsMaxFlow.toString() + '\n\n' + edmondsKarp.toString();
    maxFlowMinCutOutput.textContent = `Max Flow: ${edmondsKarp(graph_mfmc, source, sink)}`;
});
