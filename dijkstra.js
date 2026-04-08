
function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const pq = new PriorityQueue(); // Using a simple priority queue

    for (const vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        const { element: currentVertex, priority: currentDistance } = pq.dequeue();

        if (visited.has(currentVertex)) {
            continue;
        }
        visited.add(currentVertex);

        for (const [neighbor, weight] of graph[currentVertex] || []) {
            const distance = currentDistance + weight;
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                pq.enqueue(neighbor, distance);
            }
        }
    }
    return distances;
}

// Basic Priority Queue implementation (for demonstration purposes)
class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(element, priority) {
        this.elements.push({ element, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.elements.shift();
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

// Example Usage:
const graph_dijkstra = {
    'A': [['B', 1], ['C', 4]],
    'B': [['C', 2], ['D', 5]],
    'C': [['D', 1]],
    'D': []
};
console.log("Dijkstra's Algorithm:");
console.log(dijkstra(graph_dijkstra, 'A'));
