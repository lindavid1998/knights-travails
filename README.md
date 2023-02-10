# knights-travails

This repo contains the solution to the [Knight Travails assignment from the Odin Project](https://www.theodinproject.com/lessons/javascript-knights-travails)

The solution uses BFS on a graph data structure implemented as an adjacent list. 

## Time complexity
O(V+E) - at worst case, each vertex is visited and each of its neighbors (edges) are processed.

## Space complexity
O(V) - BFS uses a queue as the tree is traversed. At worst case, the queue will hold all vertices of the graph.
