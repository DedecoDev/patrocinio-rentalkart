document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentNum = document.getElementById('currentNum');
    const totalNum = document.getElementById('totalNum');

    // Navigation Dots (10 Slides = 10 Dots)
    const dots = [
        document.getElementById('dot0'),
        document.getElementById('dot1'),
        document.getElementById('dot2'),
        document.getElementById('dot3'),
        document.getElementById('dot4'),
        document.getElementById('dot5'),
        document.getElementById('dot6'),
        document.getElementById('dot7'),
        document.getElementById('dot8'),
        document.getElementById('dot9')
    ];

    // Starting slides for each dot/block
    // Now every slide has its own dot, so dotTargets maps 1:1
    const dotTargets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    let currentSlide = 0;
    const totalSlides = slides.length;

    totalNum.textContent = String(totalSlides).padStart(2, '0');

    function getActiveDot(index) {
        // Since there are 10 dots and 10 slides, return index directly.
        return index;
    }

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });

        // Toggle classes on body if needed for specific states
        document.body.classList.toggle('last-slide-active', currentSlide === totalSlides - 1);

        // Update UI Text
        currentNum.textContent = String(currentSlide + 1).padStart(2, '0');

        // Update Dots
        const activeDotIndex = getActiveDot(currentSlide);
        dots.forEach((dot, idx) => {
            if (dot) {
                if (idx === activeDotIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            }
        });

        // Buttons
        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
    }

    function moveSlide(direction) {
        if (direction === 1 && currentSlide < totalSlides - 1) {
            currentSlide++;
        } else if (direction === -1 && currentSlide > 0) {
            currentSlide--;
        }
        updateSlides();
    }

    // Controls
    if (nextBtn) nextBtn.addEventListener('click', () => moveSlide(1));
    if (prevBtn) prevBtn.addEventListener('click', () => moveSlide(-1));

    // Dot click jump
    dots.forEach((dot, idx) => {
        if (dot) {
            dot.addEventListener('click', () => {
                currentSlide = dotTargets[idx];
                updateSlides();
            });
        }
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            moveSlide(1);
        }
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            moveSlide(-1);
        }
    });

    // Init
    updateSlides();

    // Fullscreen toggler
    const toggleZoomBtn = document.getElementById('toggleZoomBtn');
    if (toggleZoomBtn) {
        toggleZoomBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.error(`Erro ao tentar entrar em tela cheia: ${err.message} (${err.name})`);
                });
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        });
    }

    // Altera os ícones quando muda o estado da tela cheia
    document.addEventListener('fullscreenchange', () => {
        const iconEnter = document.getElementById('icon-fullscreen');
        const iconExit = document.getElementById('icon-fullscreen-exit');
        if (iconEnter && iconExit) {
            if (document.fullscreenElement) {
                iconEnter.style.display = 'none';
                iconExit.style.display = 'block';
            } else {
                iconEnter.style.display = 'block';
                iconExit.style.display = 'none';
            }
        }
    });
});
