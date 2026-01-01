document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CRONÔMETRO DO ANO 2026 (TEMPO DECORRIDO)
    ===================================================== */

    const countdownEl = document.getElementById("countdown");
    const marcoEl = document.getElementById("marco"); // opcional

    const inicio2026 = new Date(2026, 0, 1, 0, 0, 0); 
    // new Date(ano, mês, dia...) → usa automaticamente o fuso local

    let ultimoMarco = 0;

    function criarBloco(valor, label) {
        return `
            <div class="time">
                <span class="flip">${valor}</span>
                <small>${label}</small>
            </div>
        `;
    }

    function atualizarCronometro() {
        const agora = new Date();
        const diff = agora - inicio2026;

        // Antes de 2026
        if (diff < 0) {
            countdownEl.innerHTML = `
                <h2 style="color: var(--gold)">⏳ Aguardando 2026...</h2>
            `;
            return;
        }

        const dias = Math.floor(diff / 86400000);
        const horas = Math.floor(diff / 3600000) % 24;
        const minutos = Math.floor(diff / 60000) % 60;
        const segundos = Math.floor(diff / 1000) % 60;

        countdownEl.innerHTML = `
            ${criarBloco(dias, "Dias")}
            ${criarBloco(horas, "Horas")}
            ${criarBloco(minutos, "Min")}
            ${criarBloco(segundos, "Seg")}
        `;

        verificarMarcos(dias);
    }

    function verificarMarcos(dias) {
        const marcos = [100, 200, 365];

        marcos.forEach(marco => {
            if (dias >= marco && ultimoMarco < marco) {
                ultimoMarco = marco;

                if (marcoEl) {
                    marcoEl.innerHTML = `🎉 ${marco} dias de 2026 completados!`;
                    marcoEl.classList.add("ativo");
                }

                // Explosão especial no centro
                explode(window.innerWidth / 2, window.innerHeight / 3);
            }
        });
    }

    setInterval(atualizarCronometro, 1000);
    atualizarCronometro();


    /* =====================================================
       FOGOS DE ARTIFÍCIO INTERATIVOS
    ===================================================== */

    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let particles = [];

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.vx = Math.random() * 6 - 3;
            this.vy = Math.random() * 6 - 3;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.015;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05;
            this.life -= this.decay;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function explode(x, y) {
        const colors = ['#d09d5b', '#c7473c', '#ffffff', '#ffdfba'];

        for (let i = 0; i < 50; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(x, y, color));
        }
    }

    canvas.addEventListener("mousedown", (e) => {
        explode(e.clientX, e.clientY);
    });

    function animate() {
        ctx.fillStyle = "rgba(11, 11, 11, 0.25)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.03) {
            explode(
                Math.random() * canvas.width,
                Math.random() * canvas.height * 0.6
            );
        }

        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

});
