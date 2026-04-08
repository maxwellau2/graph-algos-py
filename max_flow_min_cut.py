
class Edge:
    def __init__(self, capacity):
        self.capacity = capacity
        self.flow = 0

class Graph:
    def __init__(self, num_vertices):
        self.num_vertices = num_vertices
        self.adj = [[] for _ in range(num_vertices)]
        self.edges = []

    def add_edge(self, u, v, capacity):
        edge = Edge(capacity)
        reverse_edge = Edge(0) # For residual graph
        self.edges.append(edge)
        self.edges.append(reverse_edge)
        self.adj[u].append((v, len(self.edges) - 2)) # Store index of edge in edges list
        self.adj[v].append((u, len(self.edges) - 1)) # Store index of reverse edge

def bfs_max_flow(graph, s, t, parent):
    visited = [False] * graph.num_vertices
    queue = []
    queue.append(s)
    visited[s] = True

    while queue:
        u = queue.pop(0)

        for v, edge_index in graph.adj[u]:
            edge = graph.edges[edge_index]
            if not visited[v] and edge.capacity - edge.flow > 0:
                queue.append(v)
                visited[v] = True
                parent[v] = edge_index
                if v == t:
                    return True
    return False

def edmonds_karp(graph, s, t):
    parent = [-1] * graph.num_vertices
    max_flow = 0

    while bfs_max_flow(graph, s, t, parent):
        path_flow = float("Inf")
        v = t
        while v != s:
            edge_index = parent[v]
            edge = graph.edges[edge_index]
            path_flow = min(path_flow, edge.capacity - edge.flow)
            v = -1 # Placeholder, actual 'u' needs to be found from edge

            # Find 'u' for the current 'v'
            for i in range(graph.num_vertices):
                for neighbor_v, neighbor_edge_index in graph.adj[i]:
                    if neighbor_v == v and neighbor_edge_index == edge_index:
                        v = i
                        break
                if v != -1 and v != -1: # Found u
                    break
            
        max_flow += path_flow
        v = t
        while v != s:
            edge_index = parent[v]
            graph.edges[edge_index].flow += path_flow
            graph.edges[edge_index ^ 1].flow -= path_flow # Residual edge
            v = -1 # Placeholder, actual 'u' needs to be found from edge
            
            # Find 'u' for the current 'v'
            for i in range(graph.num_vertices):
                for neighbor_v, neighbor_edge_index in graph.adj[i]:
                    if neighbor_v == v and neighbor_edge_index == edge_index:
                        v = i
                        break
                if v != -1 and v != -1: # Found u
                    break
    return max_flow

# Example Usage:
num_vertices = 6
graph_mfmc = Graph(num_vertices)
graph_mfmc.add_edge(0, 1, 10)
graph_mfmc.add_edge(0, 2, 10)
graph_mfmc.add_edge(1, 3, 4)
graph_mfmc.add_edge(1, 4, 8)
graph_mfmc.add_edge(2, 4, 9)
graph_mfmc.add_edge(3, 5, 10)
graph_mfmc.add_edge(4, 5, 10)

source = 0
sink = 5
print("Max Flow Min Cut Algorithm (Edmonds-Karp):")
print(f"Max Flow: {edmonds_karp(graph_mfmc, source, sink)}")
