document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('heroVideo');
    
    if (video) {
        // Optimization: Only play video if not on a low-power mode or slow connection
        // Most browsers handle this automatically with 'autoplay', but we can be explicit
        
        video.addEventListener('loadeddata', () => {
            // Fade in the video once it has started loading data
            video.classList.add('loaded');
        });

        // Optional: Disable video on mobile to save data and battery
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // On mobile, we might want to stop the video from even trying to load
            // and just rely on the 'poster' attribute in HTML
            video.pause();
            video.removeAttribute('autoplay');
            // video.style.display = 'none'; // Or keep it for the poster
        }
    }

    // Language Switcher Logic
    const langLinks = document.querySelectorAll('.lang-link');
    const translatableElements = document.querySelectorAll('[data-en]');

    langLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = link.getAttribute('data-lang');

            // Update active state in UI
            langLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Update text content
            translatableElements.forEach(el => {
                const translation = el.getAttribute(`data-${lang}`);
                if (translation) {
                    el.textContent = translation;
                }
            });

            // Optional: Save preference to localStorage
            localStorage.setItem('preferredLang', lang);
        });
    });

    // Menu Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Load preferred language on startup
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang && savedLang !== 'en') {
        const targetLink = document.querySelector(`.lang-link[data-lang="${savedLang}"]`);
        if (targetLink) targetLink.click();
    }
});
