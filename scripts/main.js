import {
	clearCanvas,
	getCanvasInstance,
	getCanvasSizes
} from "./canvas.js";
import {
	createGrid,
	drawGrid
} from "./A_star--graphic.js";
import {getCellNeighbors} from "./A_star--logic.js";

const CONFIG = {
	CELL_SIZE: 40,
}


const {
	canvas,
	ctx
} = getCanvasInstance()

const {
	width: CANVAS_WIDTH,
	height: CANVAS_HEIGHT
} = getCanvasSizes(canvas)


const grid = createGrid(
	CONFIG.CELL_SIZE,
	{
		width: CANVAS_WIDTH,
		height: CANVAS_HEIGHT
	}
)

let queue = [
	[0, 0]
]

function init() {
	clearCanvas(ctx, CANVAS_WIDTH, CANVAS_HEIGHT)
	drawGrid(ctx, grid, CONFIG.CELL_SIZE)

	const nextTick = [];

	while (queue.length) {
		const [
			row, col
		] = queue.shift()

		const cell = grid[row][col]

		if (cell.isChecked) {
			continue;
		}

		cell.value = 2;
		cell.isChecked = true


		const nCells = getCellNeighbors(grid, row, col)

		nextTick.push(
			...nCells
			)
		}

	queue = nextTick
	setTimeout(() => init(), 100)
}

init()
