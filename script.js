// Inicialización del canvas
let c = init("canvas"),
    w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight);

// Clase Firefly
class Firefly {
    constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.s = Math.random() * 2;
        this.ang = Math.random() * 2 * Math.PI;
        this.v = this.s * this.s / 4;
    }

    move() {
        this.x += this.v * Math.cos(this.ang);
        this.y += this.v * Math.sin(this.ang);
        this.ang += Math.random() * 20 * Math.PI / 180 - 10 * Math.PI / 180;
    }

    show() {
        c.beginPath();
        c.arc(this.x, this.y, this.s, 0, 2 * Math.PI);
        c.fillStyle = "#fddba3";
        c.fill();
    }
}

let f = [];

// Función de dibujo
function draw() {
    if (f.length < 100) {
        for (let j = 0; j < 10; j++) {
            f.push(new Firefly());
        }
    }

    // Animación
    for (let i = 0; i < f.length; i++) {
        f[i].move();
        f[i].show();
        if (f[i].x < 0 || f[i].x > w || f[i].y < 0 || f[i].y > h) {
            f.splice(i, 1);
        }
    }
}

// Inicialización del mouse
let mouse = {};
let last_mouse = {};

canvas.addEventListener("mousemove", function (e) {
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;

    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
}, false);

function init(elemid) {
    let canvas = document.getElementById(elemid),
        c = canvas.getContext("2d"),
        w = (canvas.width = window.innerWidth),
        h = (canvas.height = window.innerHeight);
    c.fillStyle = "rgba(30,30,30,1)";
    c.fillRect(0, 0, w, h);
    return c;
}

// Animación continua
function loop() {
    window.requestAnimationFrame(loop);
    c.clearRect(0, 0, w, h);
    draw();
}

// Manejo de redimensionamiento
window.addEventListener("resize", function () {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    loop();
});

// Iniciar la animación
loop();

//enviar mensaje
function submitForm(event) {
    event.preventDefault(); 
    const statusMessage = document.getElementById('popupMessage');
    const popupText = document.getElementById('popupText');
    const form = event.target; 

    popupText.textContent = "Enviando mensaje...";
    statusMessage.classList.add('visible');

    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            popupText.textContent = "¡Mensaje enviado con éxito!";
            popupText.style.color = "green";
            form.reset(); 
        } else {
            throw new Error('Error al enviar el mensaje.');
        }
    })
    .catch(error => {
        popupText.textContent = "Error al enviar el mensaje. Inténtalo de nuevo.";
        popupText.style.color = "red";
    })
    .finally(() => {
        statusMessage.classList.add('visible');

        setTimeout(() => {
            statusMessage.classList.remove('visible');
        }, 3000);
    });
}

document.getElementById('popupMessage').onclick = function() {
    this.classList.remove('visible');
};