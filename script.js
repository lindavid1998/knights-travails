class Graph {
  constructor() {
    this.adjList = this.buildAdjList();
  }

  buildAdjList() {
    let adjList = {};
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let pos = [i, j];
        adjList[pos] = this.getMoves(pos);
      }
    }
    return adjList;
  }

  getMoves(pos) {
    // returns array of possible next moves from coord
    let output = [];
    let [x, y] = pos;

    let shifts = [
      [2, 1],
      [2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
      [-2, 1],
      [-2, -1],
    ];

    shifts.forEach((shift) => {
      let newPos = [x + shift[0], y + shift[1]];
      if (newPos[0] < 8 && newPos[0] > -1 && newPos[1] < 8 && newPos[1] > -1) {
        output.push(newPos);
      }
    });

    return output;
  }

  getPath(predecessors, target) {
    let output = [target];
    let temp = target;
    while (predecessors[temp]) {
      output.unshift(predecessors[temp]);
      temp = predecessors[temp];
    }
    return output;
  }

  knightMoves(start, target) {
    let graph = this.adjList;
    let queue = [start];
    let predecessors = {};
    predecessors[start] = null;

    while (queue.length > 0) {
      let current = queue.shift();
      if (assertEqualArrays(current, target)) {
        return this.getPath(predecessors, target);
      }

      let neighbors = graph[current];
      neighbors.forEach((neighbor) => {
        if (predecessors[neighbor] === undefined) {
          queue.push(neighbor);
          predecessors[neighbor] = current;
        }
      });
    }
    return "No path found";
  }
}

function assertEqualArrays(arr1, arr2) {
  if (arr1.length != arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) return false;
  }
  return true;
}

let board = new Graph();
console.log(board.knightMoves([0, 0], [1, 2])); // 0,0 -> 1,2
console.log(board.knightMoves([0, 0], [3, 3])); // 0,0 -> 1,2 -> 3,3
console.log(board.knightMoves([3, 3], [0, 0])); // 3,3 -> 1,2 -> 0,0
console.log(board.knightMoves([0, 0], [4, 2]));
console.log(board.knightMoves([0, 0], [7, 7]));
console.log(board.knightMoves([0, 0], [7, 8])); // No path found
