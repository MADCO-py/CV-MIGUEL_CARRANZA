// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de parallax suave en las secciones
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.language-section');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
        
        if (scrollPercent > 0 && scrollPercent < 1) {
            const images = section.querySelectorAll('.language-image, .language-placeholder');
            images.forEach(img => {
                img.style.transform = `translateY(${scrollPercent * 10}px)`;
            });
        }
    });
});

// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar las secciones de lenguajes
document.querySelectorAll('.language-section').forEach(section => {
    observer.observe(section);
});

// Animación inicial de entrada
window.addEventListener('load', () => {
    document.querySelector('.portfolio-hero').style.opacity = '1';
});