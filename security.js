// ==========================================
// MÓDULO DE SEGURANÇA E BLOQUEIOS
// ==========================================

// Mude para 'false' quando precisar editar ou inspecionar o projeto livremente
const SECURITY_ENABLED = true;

if (SECURITY_ENABLED) {

    // 1. Ocultar o conteúdo da tela quando a janela perder o foco 
    // REMOVIDO a pedido do usuário (pois travava a tela ao clicar no botão Windows/Captura)
    /*
    window.addEventListener('blur', function () {
        document.body.style.filter = 'blur(20px)';
        document.body.style.opacity = '0.01'; // Quase invisível
        document.body.style.transition = 'all 0.1s ease';
    });

    window.addEventListener('focus', function () {
        document.body.style.filter = 'none';
        document.body.style.opacity = '1';
    });
    */

    // Função para mostrar o modal de segurança
    function showSecurityWarning() {
        const modal = document.getElementById('modal-seguranca');
        if (modal) {
            modal.classList.add('active');
        }
    }

    // Bloquear botão direito (Context Menu)
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        showSecurityWarning();
    });

    // Bloquear atalhos de teclado (Inspecionar, Cópia, Print Screen)
    document.addEventListener('keydown', function (e) {
        // F12
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            showSecurityWarning();
        }

        // Ctrl+Shift+I / J / C (Inspecionar) ou Ctrl+U (Código fonte)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
            e.preventDefault();
            showSecurityWarning();
        }
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.keyCode === 85)) {
            e.preventDefault();
            showSecurityWarning();
        }

        // Ctrl+C / Ctrl+X (Copy, Cut)
        if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X' || e.keyCode === 67 || e.keyCode === 88)) {
            // Permite copiar/recortar apenas dentro de inputs
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                showSecurityWarning();
            }
        }

        // Print Screen
        if (e.key === 'PrintScreen' || e.keyCode === 44) {
            try { navigator.clipboard.writeText(''); } catch (err) { }
            showSecurityWarning();
        }

        // Ferramenta de Captura (Win + Shift + S)
        if (e.metaKey && e.shiftKey && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
            showSecurityWarning();
        }

        // Captura de tela (Mac: Cmd + Shift + 3, 4, 5)
        if (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5')) {
            showSecurityWarning();
        }
    });

    // Tentativa de pegar o evento Print Screen no keyup
    document.addEventListener('keyup', function (e) {
        if (e.key === 'PrintScreen' || e.keyCode === 44) {
            try { navigator.clipboard.writeText(''); } catch (err) { }
            showSecurityWarning();
        }
    });

    // Bloquear o evento de cópia diretamente pelo SO/Mouse
    document.addEventListener('copy', function (e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            showSecurityWarning();
        }
    });

    // Bloquear arrastar imagens ou textos
    document.addEventListener('dragstart', function (e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
}

// Permitir o fechamento do modal mesmo se a segurança estiver desligada
window.closeSecurityModal = function () {
    const modal = document.getElementById('modal-seguranca');
    if (modal) {
        modal.classList.remove('active');
    }
};
