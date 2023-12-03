const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")

console.log(canvas)
console.log(ctx)

//ctx.strokeRect(1, 1, 599, 599) // x, y, hight, width
//ctx.fillRect(10, 10, 588, 588)

function drawFild(n, cellSize){
    for(let i = 0; i < n; i++){
        for(let j = 0; j < n; j++){
            ctx.strokeRect(i * cellSize + 1, j * cellSize + 1, cellSize - 1, cellSize - 1)
        }
    }
}

let n = 3
let cellSize = 100
drawFild(n, cellSize)

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    if(x <= cellSize * n && y <= cellSize * 3){
        let col = Math.floor(x / cellSize) + 1
        let row = Math.floor(y / cellSize) + 1
        console.log(col + ", " + row)
    }
}


canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})