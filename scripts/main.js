import {
	clearCanvas,
	getCanvasInstance,
	getCanvasSizes
} from "./canvas.js";
import {
	createGrid,
	drawGrid,
} from "./A_star--graphic.js";
import {processGrid} from "./A_star--logic.js";

const CONFIG = {
	CELL_SIZE: 25,
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

let queue = [];

for (let i = 0; i < grid.length; i++) {
	for (let j = 0; j < grid[i].length; j++) {
		if (grid[i][j].value === 1) {
			queue.push(
				[
					i, j
				]
			)

			break;
		}
	}
}

const shortestPathCells = [];

function init() {
	clearCanvas(ctx, CANVAS_WIDTH, CANVAS_HEIGHT)
	drawGrid(ctx, grid, CONFIG.CELL_SIZE)

	const shortestPath = processGrid(grid, queue)

	if (shortestPath) {
		shortestPathCells.push(
			...shortestPath
		)
	}

	if (shortestPathCells.length) {
		const [row, col] = shortestPathCells.shift()

		grid[row][col].value = 3;
	}

	setTimeout(() => init(), 50)
}

init()
