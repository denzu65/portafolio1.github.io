// Agrega la clase selected y filtra productos
document.querySelectorAll('.filter').forEach(function (filter) {
    filter.addEventListener('click', function (e) {
        // Agrego la clase selected
        e.target.classList.add("selected");

        // Tomo el id que selecciono
        var clase = e.target.id;
        let productos = document.querySelectorAll('.item-producto'); // Asegúrate de que esto apunte a tus productos

        if (clase == "todos") {
            productos.forEach(function (prod) {
                prod.style.display = "block";
            });
        } else {
            productos.forEach(function (prod) {
                if (prod.classList.contains(clase)) {
                    prod.style.display = "block";
                } else {
                    prod.style.display = "none";
                }
            });
        }
    });
});

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

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'tuemail@gmail.com', // Tu correo
        pass: '' // Tu contraseña o token de aplicación
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'pepito@gmail.com', // Destinatario
        subject: subject,
        text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Mensaje enviado exitosamente!');
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
