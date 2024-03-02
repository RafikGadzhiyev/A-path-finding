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

		neighbors.push(
			[
				neighborRow, neighborCol
			]
		)
	}

	return neighbors
}
