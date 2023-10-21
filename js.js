const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 15;
const columns = canvas.width / fontSize;
const drops = [];

for(let x = 0; x < columns; x++)
    drops[x] = 1;

let mouse = {
    x: undefined,
    y: undefined,
    isPressed: false
};

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

canvas.addEventListener('mousedown', () => {
    mouse.isPressed = true;
});

canvas.addEventListener('mouseup', () => {
    mouse.isPressed = false;
});

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#0F0"; 
    ctx.font = fontSize + "px arial";
    
    for(let i = 0; i < drops.length; i++) {
        if (Math.abs(i * fontSize - mouse.x) < 50) { // Si la souris est proche
            if(mouse.isPressed) {
                drops[i] = mouse.y / fontSize; // Dessine avec l'effet Matrix
            } else {
                drops[i] += 3; // Accélère la "pluie"
            }
        } else {
            drops[i]++; // Vitesse normale
        }

        const text = String.fromCharCode(0x30A0 + Math.random() * 33);
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975)
            drops[i] = 0;
    }
}

setInterval(drawMatrix, 50);