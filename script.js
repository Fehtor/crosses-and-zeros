const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")

let zeroImg = document.querySelector("#zero")
let crossImg = document.querySelector("#cross")

console.log(canvas)
console.log(ctx)

let player = 0

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

let field = []

for(let i = 0; i < n; i++){
    let row = []
    for(let j = 0; j < n; j++){
        row.push(-1);
    }
    field.push(row)
}

//рисовать изображение
//ctx.drawImage(zeroImg, 30, 50, cellSize, cellSize)

function getCursorPosition(event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    if(x <= 0 || y <= 0){
        return;
    }
    if(x <= cellSize * n && y <= cellSize * 3){
        let row = Math.floor(x / cellSize)
        let col = Math.floor(y / cellSize)
        //console.log(col + ", " + row)
        if(player == 0){
            spawnZero(col, row)
            if(checkWinner()){
                console.log("winner is player number: " + player)
            }
        }
        else{
            spawnCross(col, row)
            if(checkWinner()){
                console.log("winner is player number: " + player)
            }
        }
        
    }
}

canvas.addEventListener('mousedown', getCursorPosition)

function spawnCross(col, row){
    if(field[row][col] == -1){
        ctx.drawImage(crossImg, row * cellSize, col * cellSize, cellSize, cellSize)
        field[row][col] = 1
        player = 0
    }
}   

function spawnZero(col, row){
    if(field[row][col] == -1){
        ctx.drawImage(zeroImg, row * cellSize, col * cellSize, cellSize, cellSize)
        field[row][col] = 0
        player = 1
    }
}

function checkWinner(){
    for(let i = 0; i < n; i++){
        let count = 1;
        let last = field[i][0]
        if(last == -1){
            continue
        }
        let flag = false
        for(let j = 1; j < n; j++){
            if(last == field[i][j]){
                count++;
            }
            else{
                flag = true
                break
            }
            last = field[i][j]
        }
        if(flag){
            break
        }
        if(count == n){
            //console.log("horizontal")
            return true
        }
    }

    for(let i = 0; i < n; i++){
        let count = 1;
        let last = field[0][i]
        if(last == -1){
            continue
        }
        let flag = false
        for(let j = 1; j < n; j++){
            if(last == field[j][i]){
                count++;
            }
            else{
                flag = true
                break
            }
            last = field[j][i]
        }
        if(flag){
            break
        }
        if(count == n){
           // console.log("vertical")
            return true
        }
    }

    if(field[0][0] == field[1][1] && field[1][1] == field[2][2] && field[0][0] != -1){
        return true
    }
    if(field[2][0] == field[1][1] == field[0][2] && field[2][0] != -1){
        return true
    }

    return false
}