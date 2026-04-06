// 粒子背景
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        if (Math.random() > 0.5) particle.style.background = '#00ff88';
        container.appendChild(particle);
    }
}

// 导航栏滚动效果
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
}

// 滚动动画
function handleScrollAnimation() {
    document.querySelectorAll('.fade-in').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
            el.classList.add('visible');
        }
    });
}

// 数字递增动画
function animateNumbers() {
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(el => {
        const raw = el.getAttribute('data-target') || el.innerText.replace(/[^0-9.]/g, '');
        let target = parseFloat(raw);
        if (isNaN(target)) return;
        let current = 0;
        const step = Math.ceil(target / 50);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            let suffix = '';
            if (el.innerText.includes('%')) suffix = '%';
            else if (el.innerText.includes('+')) suffix = '+';
            el.innerText = Math.floor(current) + suffix;
        }, 30);
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// 移动端菜单
const menuBtn = document.getElementById('mobileMenuBtn');
if (menuBtn) {
    menuBtn.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        const navCta = document.querySelector('.nav-cta');
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = '';
            if (navCta) navCta.style.display = '';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(10,14,23,0.95)';
            navLinks.style.backdropFilter = 'blur(20px)';
            navLinks.style.padding = '2rem';
            navLinks.style.gap = '1rem';
            if (navCta) navCta.style.display = 'flex';
        }
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    handleScrollAnimation();
    animateNumbers();
});
window.addEventListener('scroll', function() {
    handleNavbarScroll();
    handleScrollAnimation();
});
