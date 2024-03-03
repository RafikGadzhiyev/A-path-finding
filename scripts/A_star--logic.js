//? Probably we can do 4 or 8 directional neighbouring
//? But now only 4


export function getCellNeighbors(grid, row, col) {
	const neighborDirections = [
		// [-1, -1],
		[-1, 0],
		// [1, -1],
		// [-1, 1],
		[0, 1],
		// [1, 1],
		[1, 0],
		[0, -1],
	]

	const neighbors = [];

	for (const [dRow, dCol] of neighborDirections) {
		let neighborRow = row + dRow;
		let neighborCol = col + dCol

		if (
			neighborRow < 0
			|| neighborCol < 0
			|| neighborRow >= grid.length
			|| neighborCol >= grid.length
		) {
			continue
		}

		const neighborCell = grid[neighborRow][neighborCol];

		if (
			neighborCell.isChecked
			|| neighborCell.value === -1
		) {
			continue;
		}

		neighborCell.parent = [row, col]

		if (neighborCell.value !== 3) {
			neighborCell.value = 5
		}

		neighbors.push(
			[
				neighborRow, neighborCol
			]
		)
	}

	return neighbors
}

export function processGrid(grid, queue) {
	const nextTick = [];

	while (queue.length) {
		const [
			row, col
		] = queue.shift()

		const cell = grid[row][col]

		if (cell.isChecked) {
			continue;
		}

		if (cell.value === 3) {
			while(queue.length && queue.pop());

			const path = getPath(grid, cell);

			return path;
		}

		cell.value = cell.value === 1
			? cell.value
			: 2;
		cell.isChecked = true


		const nCells = getCellNeighbors(grid, row, col)

		nextTick.push(
			...nCells
		)
	}

	queue.push(
		...nextTick
	)
}

export function getPath(grid, cell) {
	const path = [];

	while (cell.parent) {
		path.push(cell.parent)

		cell = grid[cell.parent[0]][cell.parent[1]]
	}

	return path
}
