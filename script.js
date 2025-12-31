document.addEventListener("DOMContentLoaded", () => {
    /* ========= CONTAGEM REGRESSIVA ========= */
    const countdownEl = document.getElementById("countdown");

    function atualizarContagem() {
        const agora = new Date();
        const alvo = new Date("2026-01-01T00:00:00-03:00");
        const diff = alvo - agora;

        if (diff <= 0) {
            countdownEl.innerHTML = "<h2 style='color: var(--gold)'>🎆 Feliz Ano Novo 2026! 🎆</h2>";
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

    setInterval(atualizarContagem, 1000);
    atualizarContagem();

    /* ========= FOGOS DE ARTIFÍCIO INTERATIVOS ========= */
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
            this.color = color || `hsl(${Math.random() * 360}, 100%, 60%)`;
            this.vx = Math.random() * 6 - 3;
            this.vy = Math.random() * 6 - 3;
            this.life = 1.0;
            this.decay = Math.random() * 0.02 + 0.015;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05; // gravidade
            this.life -= this.decay;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life;
            ctx.fill();
        }
    }

    function explode(x, y) {
    // Escolhe aleatoriamente entre Dourado e Vermelho para combinar com a marca
    const colors = ['#d09d5b', '#c7473c', '#ffffff', '#ffdfba'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, color));
    }
}

    // Explodir ao clicar
    canvas.addEventListener("mousedown", (e) => {
        explode(e.clientX, e.clientY);
    });

    function animate() {
        // Efeito de rastro: em vez de limpar tudo, desenha um fundo preto semi-transparente
        ctx.fillStyle = "rgba(11, 11, 11, 0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Fogos automáticos ocasionais
        if (Math.random() < 0.03) {
            explode(Math.random() * canvas.width, Math.random() * canvas.height * 0.7);
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