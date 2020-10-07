let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];//criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos

snake[0] = {
    x: 8 * box,
    y: 8 * box    
}

let direction = "right";
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillstyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);//desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha(){
    for(i=0; i< snake.length; i++){
        context.fillstyle = "green";//cor
        context.fillRect(snake[i].x, snake[i].y, box, box);//tamanho
    }
}

function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}


//pega o evento de clique e chama a função update
document.addEventListener('keydown', update);

function update (event){
    if(event.keyCode == 37 && direction != "right") direction ="left";
    if(event.keyCode == 38 && direction != "down") direction ="up";
    if(event.keyCode == 39 && direction != "left") direction ="right";
    if(event.keyCode == 40 && direction != "up") direction ="down";
}


function iniciarJogo(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].u = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].u = 16 * box;
    
    criarBG();
    criarCobrinha();
    drawFood();

    //ponto de partida
    //posições iniciais
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    } 

    snake.unshift(newHead);

}

//intervalo para o jogo iniciar
let jogo = setInterval(iniciarJogo, 100);
