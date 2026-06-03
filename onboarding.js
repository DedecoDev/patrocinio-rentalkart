document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('fullscreenOnboardingSeen')) {
        // return; 
    }

    const zoomBtn = document.getElementById('toggleZoomBtn');
    if (!zoomBtn) return;

    zoomBtn.classList.add('pulse-glow');

    const tooltip = document.createElement('div');
    tooltip.className = 'fullscreen-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-content">
            <span>Amplie para tela cheia<br>para melhor experiência!</span>
            <button id="closeTooltip" class="tooltip-close">&times;</button>
        </div>
    `;

    // Ajusta a hierarquia inserindo tudo DENTRO do bottom-right-controls
    const bottomControls = document.querySelector('.bottom-right-controls');
    const slideCounter = document.querySelector('.slide-counter');

    if (bottomControls) {
        bottomControls.style.zIndex = '9999'; // Traz o bloco inteiro para cima
        bottomControls.appendChild(tooltip);

        // Botão fica acima
        zoomBtn.style.position = 'relative';
        zoomBtn.style.zIndex = '2';

        // Contador fica abaixo
        if (slideCounter) {
            slideCounter.style.position = 'relative';
            slideCounter.style.zIndex = '0';
        }
    }

    function dismissOnboarding() {
        zoomBtn.classList.remove('pulse-glow');
        tooltip.classList.add('fade-out');
        setTimeout(() => {
            tooltip.remove();
            if (bottomControls) bottomControls.style.zIndex = '1000';
            zoomBtn.style.zIndex = '';
            if (slideCounter) slideCounter.style.zIndex = '';
        }, 500);
        localStorage.setItem('fullscreenOnboardingSeen', 'true');
    }

    zoomBtn.addEventListener('click', dismissOnboarding);

    setTimeout(() => {
        const closeBtn = document.getElementById('closeTooltip');
        if (closeBtn) closeBtn.addEventListener('click', dismissOnboarding);
    }, 100);

    setTimeout(dismissOnboarding, 8000);
});
