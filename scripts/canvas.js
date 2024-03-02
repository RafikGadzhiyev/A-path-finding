export function getCanvasInstance() {
	const canvas = document.querySelector('canvas')
	const ctx = canvas.getContext('2d')

	return {
		canvas,
		ctx
	}
}

/**
 * @param canvas { HTMLCanvasElement }
 * @return {{width, height}}
 */
export function getCanvasSizes(canvas) {
	return {
		width: canvas.width,
		height: canvas.height
	}
}

export function clearCanvas(ctx, canvasWidth, canvasHeight) {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight)
}
