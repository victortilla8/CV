document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    function changeActiveLink() {
        let index = sections.length;

        while (--index && window.scrollY + 5 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }

    changeActiveLink();
    window.addEventListener('scroll', changeActiveLink);
});

function typeWriter(element, text, speed = 20) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

document.addEventListener('DOMContentLoaded', function () {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    function checkTyping(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.getAttribute('data-text');
                typeWriter(element, text);
                observer.unobserve(element);
            }
        });
    }

    const typingObserver = new IntersectionObserver(checkTyping, {
        root: null,
        threshold: 0.5,
    });

    typingElements.forEach(element => {
        typingObserver.observe(element);
    });

    AOS.init();
});

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const images = carousel.querySelectorAll('img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.dots');

    let currentIndex = 0;
    let interval;

    images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function goToSlide(index) {
        images[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        currentIndex = index;
        images[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentIndex + 1) % images.length);
    }

    function prevSlide() {
        goToSlide((currentIndex - 1 + images.length) % images.length);
    }

    function startCarousel() {
        interval = setInterval(nextSlide, 3000);
    }

    function stopCarousel() {
        clearInterval(interval);
    }

    nextBtn.addEventListener('click', () => {
        stopCarousel();
        nextSlide();
        startCarousel();
    });

    prevBtn.addEventListener('click', () => {
        stopCarousel();
        prevSlide();
        startCarousel();
    });

    startCarousel();
    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);
    dots[0].classList.add('active');
});

let currentSlide2 = 0;

function moveSlide2(step) {
    const slides2 = document.querySelectorAll('.slide2');
    currentSlide2 = (currentSlide2 + step + slides2.length) % slides2.length;
    const offset2 = -currentSlide2 * 100;
    document.querySelector('.carousel2').style.transform = `translateX(${offset2}%)`;
}

function autoPlay2() {
    moveSlide2(1);
}

setInterval(autoPlay2, 3000);

// Añade este código al final de tu archivo cv.js

document.addEventListener('DOMContentLoaded', function() {
    // Animación de las barras de habilidades
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        function checkIfInView() {
            const skillsSection = document.getElementById('habilidades');
            if (!skillsSection) return;
            
            const sectionPosition = skillsSection.getBoundingClientRect();
            
            // Si la sección de habilidades está visible en la ventana
            if (
                sectionPosition.top < window.innerHeight &&
                sectionPosition.bottom >= 0
            ) {
                skillBars.forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    bar.style.width = level + '%';
                });
                
                // Remover el event listener una vez que se han animado las barras
                window.removeEventListener('scroll', checkIfInView);
            }
        }
        
        // Verificar inicialmente y luego en cada scroll
        checkIfInView();
        window.addEventListener('scroll', checkIfInView);
    }
    
    // Añadir efectos de hover 3D a las tarjetas de habilidades
    function addSkillCardEffects() {
        const cards = document.querySelectorAll('.skill-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top;  // y position within the element
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / 20;
                const deltaY = (y - centerY) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) translateY(-5px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }
    
    // Añadir efectos de partículas en hover sobre las habilidades (versión ligera)
    function addParticleEffects() {
        const cards = document.querySelectorAll('.skill-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.skill-icon');
                
                // Crear 5 partículas
                for (let i = 0; i < 5; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'skill-particle';
                    
                    // Estilo base de las partículas
                    particle.style.position = 'absolute';
                    particle.style.width = '5px';
                    particle.style.height = '5px';
                    particle.style.borderRadius = '50%';
                    particle.style.backgroundColor = 'var(--2-color)';
                    particle.style.opacity = '0.8';
                    particle.style.pointerEvents = 'none';
                    
                    // Posición inicial (cerca del icono)
                    const iconRect = icon.getBoundingClientRect();
                    const cardRect = this.getBoundingClientRect();
                    
                    const startX = iconRect.left - cardRect.left + iconRect.width / 2;
                    const startY = iconRect.top - cardRect.top + iconRect.height / 2;
                    
                    particle.style.left = startX + 'px';
                    particle.style.top = startY + 'px';
                    
                    // Añadir al card
                    this.appendChild(particle);
                    
                    // Animación
                    const angle = Math.random() * Math.PI * 2; // Ángulo aleatorio
                    const distance = 20 + Math.random() * 30; // Distancia aleatoria
                    const duration = 1 + Math.random(); // Duración aleatoria
                    
                    const destinationX = startX + Math.cos(angle) * distance;
                    const destinationY = startY + Math.sin(angle) * distance;
                    
                    // Animación con CSS
                    particle.animate([
                        { // Estado inicial
                            left: startX + 'px',
                            top: startY + 'px',
                            opacity: 0.8,
                            transform: 'scale(1)'
                        },
                        { // Estado final
                            left: destinationX + 'px',
                            top: destinationY + 'px',
                            opacity: 0,
                            transform: 'scale(0)'
                        }
                    ], {
                        duration: duration * 1000,
                        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        fill: 'forwards'
                    }).onfinish = () => {
                        particle.remove(); // Eliminar después de la animación
                    };
                }
            });
        });
    }
    
    // Iniciar todas las animaciones
    animateSkillBars();
    addSkillCardEffects();
    addParticleEffects();
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.nav-toggle');
    const navList = document.querySelector('nav ul');

    toggleButton.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
});



