document.addEventListener('DOMContentLoaded', () => {
    // ============ MOBILE HAMBURGER MENU ============
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('header') && !e.target.closest('.mobile-menu')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }

    // ============ SCROLL EFFECTS ============
    let lastScrollTop = 0;
    let scrollDirection = 'down';
    let hideTimeout;
    const header = document.querySelector('header');
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);

    // Sticky navigation - Show/Hide based on scroll direction
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Update scroll progress bar
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';

        // Determine scroll direction
        if (scrollTop > lastScrollTop) {
            scrollDirection = 'down';
        } else {
            scrollDirection = 'up';
        }

        // Smart header visibility - hide when scrolling down (after hero), show when scrolling up
        if (scrollDirection === 'down' && scrollTop > 200) {
            // Scrolling DOWN - hide nav
            header.classList.add('scroll-hide');
            header.classList.remove('scroll-show');
            clearTimeout(hideTimeout);
        } else {
            // Scrolling UP or at top - show nav with smooth animation
            header.classList.remove('scroll-hide');
            header.classList.add('scroll-show');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        // Parallax effect for hero sections
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const parallaxAmount = scrollTop * 0.5;
            heroSection.style.backgroundPosition = `center ${parallaxAmount}px`;
        }

        // Floating effect for cards and elements
        document.querySelectorAll('.experience-card, .gallery-item').forEach((el, index) => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const floatAmount = (scrollTop * 0.3 + index * 20) % 360;
            
            if (elementTop < windowHeight && elementTop > -elementTop) {
                el.style.transform = `translateY(${Math.sin(floatAmount * Math.PI / 180) * 8}px)`;
            }
        });

        // Scale effect for images on scroll
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            const rect = img.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const windowCenter = window.innerHeight / 2;
            const distance = Math.abs(elementCenter - windowCenter);
            const maxDistance = window.innerHeight;
            const scale = 1 - (distance / maxDistance) * 0.1;
            img.style.transform = `scale(${scale})`;
        });
    }, { passive: true });

    // Video autoplay
    const video = document.getElementById('heroVideo');
    if (video) {
        video.play().catch(() => {
            // Autoplay might be blocked
        });
    }
    
    if (video) {
        video.play().catch(error => {
            console.warn('Video autoplay failed:', error);
        });

        video.addEventListener('loadeddata', () => {
            video.classList.add('loaded');
        });
    }

    // ============ TRANSLATION DICTIONARY ============
    const translationDictionary = {
        'Appetizers': { en: 'Appetizers', da: 'Forretter' },
        'Starters': { en: 'Starters', da: 'Forretter' },
        'Main Courses': { en: 'Main Courses', da: 'Hovedretter' },
        "Children's Menu": { en: "Children's Menu", da: 'Børnemenu' },
        'Extras': { en: 'Extras', da: 'Tillæg' },
        'Desserts & Dips': { en: 'Desserts & Dips', da: 'Desserter & Dips' },
        'Papad': { en: 'Papad', da: 'Papad' },
        'Thinly toasted crispy made from lentil flour': { en: 'Thinly toasted crispy made from lentil flour', da: 'Tyndt ristet sprødt lavet af linsemel' },
        'Cucumber Bites': { en: 'Cucumber Bites', da: 'Agurkebidder' },
        'Freshly seasoned with sesame, coriander and lemon juice': { en: 'Freshly seasoned with sesame, coriander and lemon juice', da: 'Frisk krydret med sesamfrø, koriander og citronsaft' },
        'Salad bowl': { en: 'Salad bowl', da: 'Salatskål' },
        'Crispy vegetable salad with sesame, green chili, coriander and turmeric oil (+ chicken DKK 39 / shrimp DKK 59 / tofu DKK 39)': { en: 'Crispy vegetable salad with sesame, green chili, coriander and turmeric oil (+ chicken DKK 39 / shrimp DKK 59 / tofu DKK 39)', da: 'Sprød grøntsalat med sesamfrø, grøn chili, koriander og kurkumamel (+ kylling DKK 39 / rejer DKK 59 / tofu DKK 39)' },
        'MoMo (5 pcs)': { en: 'MoMo (5 pcs)', da: 'MoMo (5 stk)' },
        'Chicken or Vegan. Steamed Nepalese dumplings with sesame-tomato chutney': { en: 'Chicken or Vegan. Steamed Nepalese dumplings with sesame-tomato chutney', da: 'Kylling eller Vegan. Dampede nepalesiske dumplings med sesamtomat chutney' },
        'Chicken Choila': { en: 'Chicken Choila', da: 'Kylling Choila' },
        'Grilled chicken with onion, garlic, chili, coriander and Nepalese spices': { en: 'Grilled chicken with onion, garlic, chili, coriander and Nepalese spices', da: 'Grillet kylling med løg, hvidløg, chili, koriander og nepalesiske krydderier' },
        'Spicy Shrimp': { en: 'Spicy Shrimp', da: 'Krydret Rejer' },
        'Pan-fried shrimp with onion, garlic, chili, coriander and Nepalese spices': { en: 'Pan-fried shrimp with onion, garlic, chili, coriander and Nepalese spices', da: 'Stegede rejer med løg, hvidløg, chili, koriander og nepalesiske krydderier' },
        'Mushroom Choila': { en: 'Mushroom Choila', da: 'Svamp Choila' },
        'Fried mushrooms with onion, garlic, chili, coriander and Nepalese spices': { en: 'Fried mushrooms with onion, garlic, chili, coriander and Nepalese spices', da: 'Stegede svampe med løg, hvidløg, chili, koriander og nepalesiske krydderier' },
        'MoMo Big (10 pcs)': { en: 'MoMo Big (10 pcs)', da: 'MoMo Big (10 stk)' },
        'Chicken or Vegan. Steamed dumplings with sesame-tomato chutney': { en: 'Chicken or Vegan. Steamed dumplings with sesame-tomato chutney', da: 'Kylling eller Vegan. Dampede dumplings med sesamtomat chutney' },
        'Chow Mein': { en: 'Chow Mein', da: 'Chow Mein' },
        'Chicken/Vegan | Shrimp DKK 145. Fried Nepalese noodles with vegetables': { en: 'Chicken/Vegan | Shrimp DKK 145. Fried Nepalese noodles with vegetables', da: 'Kylling/Vegan | Rejer DKK 145. Stegt nepalesiske nudler med grøntsager' },
        'Fried Rice': { en: 'Fried Rice', da: 'Stegt Ris' },
        'Chicken/Vegan | Shrimp DKK 145. Fried Nepalese rice with vegetables': { en: 'Chicken/Vegan | Shrimp DKK 145. Fried Nepalese rice with vegetables', da: 'Kylling/Vegan | Rejer DKK 145. Stegt nepalesisk ris med grøntsager' },
        'Jhol MoMo (8 pcs)': { en: 'Jhol MoMo (8 pcs)', da: 'Jhol MoMo (8 stk)' },
        'Chicken/Vegan. Steamed dumplings in hot soup (minimum 2 people)': { en: 'Chicken/Vegan. Steamed dumplings in hot soup (minimum 2 people)', da: 'Kylling/Vegan. Dampede dumplings i varm suppe (minimum 2 personer)' },
        'Dhal Bhat Platter': { en: 'Dhal Bhat Platter', da: 'Dhal Bhat Tallerken' },
        'Pre-order, min. 2 people. Rice, dhal, yogurt, pickle and special Lamfuz sauce': { en: 'Pre-order, min. 2 people. Rice, dhal, yogurt, pickle and special Lamfuz sauce', da: 'Bestil på forhånd, min. 2 personer. Ris, dhal, yogurt, syltet og speciel Lamfuz sauce' },
        'Chicken with rice': { en: 'Chicken with rice', da: 'Kylling med ris' },
        'Served with fried vegetables': { en: 'Served with fried vegetables', da: 'Serveret med stegt grøntsager' },
        'Dhal with rice': { en: 'Dhal with rice', da: 'Dhal med ris' },
        'Rice': { en: 'Rice', da: 'Ris' },
        'Fried Vegetables': { en: 'Fried Vegetables', da: 'Stegt Grøntsager' },
        'Dal': { en: 'Dal', da: 'Dal' },
        'Saw': { en: 'Saw', da: 'Saag' },
        'Fermented Pickles': { en: 'Fermented Pickles', da: 'Gærede Syltede Grøntsager' },
        'Dessert of the Day': { en: 'Dessert of the Day', da: 'Dagens Dessert' },
        'Ice cream': { en: 'Ice cream', da: 'Is' },
        'Tomato Chutney': { en: 'Tomato Chutney', da: 'Tomat Chutney' },
        'Chili Sauce': { en: 'Chili Sauce', da: 'Chili Sauce' },
        'MoMo Chutney': { en: 'MoMo Chutney', da: 'MoMo Chutney' },
        'SEE THE FULL MENU': { en: 'SEE THE FULL MENU', da: 'SE FULD MENU' },
        'EXPERIENCE LAMFUZ': { en: 'EXPERIENCE LAMFUZ', da: 'OPLEV LAMFUZ' },
        'THE TASTE OF NEPAL – MIDDLE IN COPENHAGEN': { en: 'THE TASTE OF NEPAL – MIDDLE IN COPENHAGEN', da: 'SMAGEN AF NEPAL – MIDT I KØBENHAVN' },
        'Authentic Nepalese cuisine': { en: 'Authentic Nepalese cuisine', da: 'Autentisk nepalesisk køkken' },
        'Taste Nepal\'s authentic spices.': { en: 'Taste Nepal\'s authentic spices.', da: 'Smag Nepals autentiske krydderier.' },
        'Created with passion': { en: 'Created with passion', da: 'Skabt med passion' },
        'We only use carefully selected raw materials and nothing else.': { en: 'We only use carefully selected raw materials and nothing else.', da: 'Vi bruger kun nøje udvalgte råvarer og intet andet.' },
        'Fresh, local ingredients': { en: 'Fresh, local ingredients', da: 'Friske, lokale ingredienser' },
        'Each dish is created by Nepalese chefs with expertise and love.': { en: 'Each dish is created by Nepalese chefs with expertise and love.', da: 'Hver ret er skabt af nepalesiske kokke med ekspertise og kærlighed.' },
        'Cozy atmosphere': { en: 'Cozy atmosphere', da: 'Hyggelig atmosfære' },
        'A warm and atmospheric place where Nepal comes alive in Copenhagen.': { en: 'A warm and atmospheric place where Nepal comes alive in Copenhagen.', da: 'Et varmt og atmosfærisk sted hvor Nepal kommer til live i København.' },
        'Opening hours': { en: 'Opening hours', da: 'Åbningstider' },
        'Monday – Saturday': { en: 'Monday – Saturday', da: 'Mandag – Lørdag' },
        '4:00 PM – 10:00 PM': { en: '4:00 PM – 10:00 PM', da: '16:00 – 22:00' },
        'Last arrival: 9:30 PM': { en: 'Last arrival: 9:30 PM', da: 'Sidste ankomst: 21:30' },
        'Tabs': { en: 'Tabs', da: 'Faner' },
        'Front': { en: 'Front', da: 'Forside' },
        'Menu': { en: 'Menu', da: 'Menu' },
        'About Lamfuz': { en: 'About Lamfuz', da: 'Om Lamfuz' },
        'Contact': { en: 'Contact', da: 'Kontakt' },
        'About': { en: 'About', da: 'Om os' },
        'Discover more from Lamfuz': { en: 'Discover more from Lamfuz', da: 'Opdag mere fra Lamfuz' },
        'Social': { en: 'Social', da: 'Sociale medier' }
    };

    // Language Switcher Logic
    const langLinks = document.querySelectorAll('.lang-link');
    const mobileLangLinks = document.querySelectorAll('.mobile-lang-link');
    const translatableElements = document.querySelectorAll('[data-en]');

    const updateLanguage = (lang) => {
        // Update active state in desktop UI
        langLinks.forEach(l => l.classList.remove('active'));
        document.querySelector(`.lang-link[data-lang="${lang}"]`)?.classList.add('active');

        // Update active state in mobile UI
        mobileLangLinks.forEach(l => l.classList.remove('active'));
        document.querySelector(`.mobile-lang-link[data-lang="${lang}"]`)?.classList.add('active');

        // Update text content for elements with data-en/data-da
        translatableElements.forEach(el => {
            const translation = el.getAttribute(`data-${lang}`);
            if (translation) {
                // Use innerHTML if the translation contains HTML tags, otherwise textContent
                if (translation.includes('<') && translation.includes('>')) {
                    el.innerHTML = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });

        // Update input placeholders
        document.querySelectorAll('[data-placeholder-en]').forEach(el => {
            const placeholder = el.getAttribute(`data-placeholder-${lang}`);
            if (placeholder) {
                el.placeholder = placeholder;
            }
        });

        // Update all other text nodes using translation dictionary
        document.querySelectorAll('*').forEach(element => {
            if (element.children.length === 0) { // Only process leaf nodes (text-only elements)
                const text = element.textContent?.trim();
                if (text && translationDictionary[text]) {
                    element.textContent = translationDictionary[text][lang];
                }
            }
        });
    };

    langLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = link.getAttribute('data-lang');
            updateLanguage(lang);
        });
    });

    mobileLangLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = link.getAttribute('data-lang');
            updateLanguage(lang);
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

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in
    const fadeElements = document.querySelectorAll('.section, .gallery-container, .menu-section, .about-content, .contact-container, .experience-grid, .reservation-container');
    fadeElements.forEach(el => observer.observe(el));

    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ============ GALLERY SLIDER ============
    const sliderTrack = document.querySelector('.slider-track');
    const sliderItems = document.querySelectorAll('.slider-item');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');

    if (sliderTrack && sliderItems.length > 0) {
        // Create dots
        sliderItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                sliderTrack.scrollTo({
                    left: sliderTrack.offsetWidth * index,
                    behavior: 'smooth'
                });
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        // Update dots on scroll
        sliderTrack.addEventListener('scroll', () => {
            const index = Math.round(sliderTrack.scrollLeft / sliderTrack.offsetWidth);
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        });

        // Next/Prev buttons
        nextBtn?.addEventListener('click', () => {
            const nextScroll = sliderTrack.scrollLeft + sliderTrack.offsetWidth;
            if (nextScroll >= sliderTrack.scrollWidth - 10) { // Small buffer for rounding
                sliderTrack.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                sliderTrack.scrollBy({ left: sliderTrack.offsetWidth, behavior: 'smooth' });
            }
        });

        prevBtn?.addEventListener('click', () => {
            const prevScroll = sliderTrack.scrollLeft - sliderTrack.offsetWidth;
            if (prevScroll < -10) {
                sliderTrack.scrollTo({ left: sliderTrack.scrollWidth, behavior: 'smooth' });
            } else {
                sliderTrack.scrollBy({ left: -sliderTrack.offsetWidth, behavior: 'smooth' });
            }
        });

        // Auto-play
        let autoPlayInterval = setInterval(() => {
            nextBtn?.click();
        }, 5000);

        // Pause auto-play on interaction
        sliderTrack.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        sliderTrack.addEventListener('touchstart', () => clearInterval(autoPlayInterval));
        sliderTrack.addEventListener('mouseleave', () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                nextBtn?.click();
            }, 5000);
        });
    }
});
