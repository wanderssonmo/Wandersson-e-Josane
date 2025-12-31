/* ========= CONTAGEM REGRESSIVA ========= */
document.addEventListener("DOMContentLoaded", () => {

    /* ========= CONTAGEM REGRESSIVA ========= */
    const countdownEl = document.getElementById("countdown");

    function atualizarContagem() {
        const agora = new Date();
        const alvo = new Date("2026-01-01T00:00:00-03:00");
        const diff = alvo - agora;

        if (diff <= 0) {
            countdownEl.innerHTML = "<strong>🎆 Feliz Ano Novo! 🎆</strong>";
            return;
        }

        const d = Math.floor(diff / 86400000);
        const h = Math.floor(diff / 3600000) % 24;
        const m = Math.floor(diff / 60000) % 60;
        const s = Math.floor(diff / 1000) % 60;

        countdownEl.innerHTML = `
            <div class="time"><span>${d}</span><small>Dias</small></div>
            <div class="time"><span>${h}</span><small>Horas</small></div>
            <div class="time"><span>${m}</span><small>Min</small></div>
            <div class="time"><span>${s}</span><small>Seg</small></div>
        `;
    }

    atualizarContagem();
    setInterval(atualizarContagem, 1000);

    /* ========= FOGOS DE ARTIFÍCIO ========= */
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let particles = [];

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = Math.random() * 6 - 3;
            this.vy = Math.random() * -6 - 2;
            this.life = 60;
            this.color = `hsl(${Math.random() * 360},100%,60%)`;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.15;
            this.life--;
        }
        draw() {
            ctx.globalAlpha = this.life / 60;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function explode(x, y) {
        for (let i = 0; i < 40; i++) {
            particles.push(new Particle(x, y));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.035) {
            explode(
                Math.random() * canvas.width,
                Math.random() * canvas.height * 0.5
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