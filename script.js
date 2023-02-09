class Graph {
	constructor() {
		this.adjList = this.buildAdjList();
	}

	buildAdjList() {
		// key -> string x,y
		// value -> array of arrays [x, y]
		let adjList = new Map();
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				let pos = [i, j];
				adjList.set(pos.toString(), this.getMoves(pos));
			}
		}
		return adjList;
	}

	getMoves(pos) {
		// returns array of possible next moves from coord
		let output = [];

		let xNext = [x - 2, x + 2];
		xNext.forEach((x) => {
			if (x > 7 || x < 0) return;
			if (y + 1 < 8) output.push([x, y + 1]);
			if (y - 1 > -1) output.push([x, y - 1]);
		});

		xNext = [x - 1, x + 1];
		xNext.forEach((x) => {
			if (x > 7 || x < 0) return;
			if (y + 2 < 8) output.push([x, y + 2]);
			if (y - 2 > -1) output.push([x, y - 2]);
		});

		return output;
	}

	getPath(predecessors, target) {
		let temp = target.toString();
		let output = [temp];
		while (predecessors.get(temp)) {
			output.unshift(predecessors.get(temp));
			temp = predecessors.get(temp);
		}
		return output;
	}

	knightMoves(start, target) {
		// returns shortest path from start to target as an array of sequential moves
		let graph = this.adjList;
		let queue = [start];
		let predecessors = new Map();
		predecessors.set(start.toString(), null);

		while (queue.length > 0) {
			let current = queue.shift();
			if (assertEqualArrays(current, target)) {
				return this.getPath(predecessors, target);
			}

			let neighbors = graph.get(current.toString());
			neighbors.forEach((neighbor) => {
				if (predecessors.get(neighbor.toString()) === undefined) {
					queue.push(neighbor);
					predecessors.set(neighbor.toString(), current.toString());
				}
			});
		}
		return 'No path found';
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
console.log(board.knightMoves([0, 0], [7, 8])); // no possible path
