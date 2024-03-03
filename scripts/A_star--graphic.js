/**
 *
 * @param cellSize {number}
 * @param canvasSize {Object}
 * @param canvasSize.width {number}
 * @param canvasSize.height {number}
 *
 * @return {Array<Array<number>>}
 * */
export function createGrid(cellSize, canvasSize) {
	const grid = [];

	const rows = Math.floor(canvasSize.height / cellSize)
	const cols = Math.floor(canvasSize.width / cellSize)

	let hasStart = false;
	let hasFinish = false;

	for (let i = 0; i < rows; ++i) {
		grid.push([])

		for (let j = 0; j < cols; ++j) {
			let randomNumber = Math.random();
			let randomCellValue = getRandomCellValue()

			const cell = {
				value: randomCellValue,
				isChecked: false,
				parent: null,
			}

			if (randomNumber > 0.9 && !hasStart) {
				cell.value = 1;
				hasStart = true;
			}
			else if (randomNumber > 0.9 && !hasFinish){
				cell.value = 3;
				hasFinish = true
			}

			grid[grid.length - 1].push(cell)
		}
	}

	return grid
}

export function getRandomCellValue() {
	const values = [
		0, 0, 0,
		-1
	]

	return values[Math.floor(Math.random() * values.length)]
}

export function drawGrid(ctx, grid, cellSize) {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			const cell = grid[i][j];

			drawGridCell(ctx, cell.value, i, j, cellSize)
		}
	}
}

export function drawGridCell(ctx, cell, row, col, cellSize) {
	let x =	row * cellSize;
	let y = col * cellSize;

	switch (cell) {
		case 0:
			drawEmptyCell(ctx, x, y, cellSize, cellSize);
			break;

		case 2:
			drawFullCell(ctx, x, y, cellSize, cellSize, '#00ffaf')
			break;

		case 1:
		case 3:
			drawFullCell(ctx, x, y, cellSize, cellSize, '#37a2a2')
			break;

		case 5:
			drawFullCell(ctx, x, y, cellSize, cellSize, '#009eff')
			break;

		case -1:
			drawFullCell(ctx, x, y, cellSize, cellSize);
			break;
	}
}

export function visualizePath(grid, path) {
	while (path.length) {
		const [row, col] = path.pop();

		grid[row][col].value = 3;

	}
}

function drawEmptyCell(ctx, x, y, width, height, color = '#fff') {
	let prevColor = ctx.strokeStyle

	ctx.strokeStyle = color
	ctx.strokeRect(x, y, width, height)
	ctx.strokeStyle = prevColor
}

function drawFullCell(ctx, x, y, width, height, color = '#e4e4e4') {
	let prevColor = ctx.fillStyle

	ctx.fillStyle = color
	ctx.fillRect(x, y, width, height)
	ctx.fillStyle = prevColor
}
