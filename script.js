/* ========================================
   ALM Construction - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Language Switcher
    // ========================================
    const langSwitch = document.getElementById('lang-switch');
    const langFlag = langSwitch.querySelector('.lang-flag');
    const langText = langSwitch.querySelector('.lang-text');
    let currentLang = 'en';
    
    langSwitch.addEventListener('click', function() {
        currentLang = currentLang === 'en' ? 'es' : 'en';
        updateLanguage();
    });
    
    function updateLanguage() {
        // Update flag and text
        if (currentLang === 'es') {
            langFlag.textContent = '🇪🇸';
            langText.textContent = 'ES';
            document.documentElement.lang = 'es';
        } else {
            langFlag.textContent = '🇺';
            langText.textContent = 'EN';
            document.documentElement.lang = 'en';
        }

        // Update all translatable elements
        document.querySelectorAll('[data-en][data-es]').forEach(function(element) {
            const text = element.getAttribute('data-' + currentLang);
            if (text) {
                element.textContent = text;
            }
        });

        // Update lightbox caption if open
        if (window.updateLightboxLanguage) {
            window.updateLightboxLanguage();
        }

        // Save preference
        localStorage.setItem('alm-lang', currentLang);
    }
    
    // Load saved language preference
    const savedLang = localStorage.getItem('alm-lang');
    if (savedLang) {
        currentLang = savedLang;
        updateLanguage();
    }
    
    // ========================================
    // Mobile Navigation
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ========================================
    // Carousel / Slideshow
    // ========================================
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');
    const carouselIndicators = document.getElementById('carousel-indicators');
    let currentSlide = 0;
    let carouselInterval;
    
    // Create indicators
    carouselSlides.forEach(function(_, index) {
        const indicator = document.createElement('button');
        indicator.setAttribute('data-slide', index);
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', function() {
            goToSlide(index);
            resetCarousel();
        });
        carouselIndicators.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.carousel-indicators button');
    
    function goToSlide(index) {
        carouselSlides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        currentSlide = index;
        if (currentSlide >= carouselSlides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = carouselSlides.length - 1;
        carouselSlides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 5000);
    }
    
    function resetCarousel() {
        clearInterval(carouselInterval);
        startCarousel();
    }
    
    carouselNext.addEventListener('click', function() {
        nextSlide();
        resetCarousel();
    });
    
    carouselPrev.addEventListener('click', function() {
        prevSlide();
        resetCarousel();
    });
    
    // Start carousel
    startCarousel();
    
    // Pause on hover
    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', function() {
        clearInterval(carouselInterval);
    });
    
    hero.addEventListener('mouseleave', function() {
        startCarousel();
    });
    
    // ========================================
    // Scroll to Top Button
    // ========================================
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========================================
    // Scroll Animations
    // ========================================
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(function(element) {
        observer.observe(element);
    });
    
    // ========================================
    // Counter Animation
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(function() {
            current += step;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }
    
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    statNumbers.forEach(function(stat) {
                        animateCounter(stat);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // ========================================
    // Modals (Privacy & Cookie Policy)
    // ========================================
    const privacyModal = document.getElementById('privacy-modal');
    const cookiesModal = document.getElementById('cookies-modal');
    const privacyLink = document.getElementById('privacy-link');
    const cookiesLink = document.getElementById('cookies-link');
    const modalClose = document.getElementById('modal-close');
    const cookiesClose = document.getElementById('cookies-close');
    
    privacyLink.addEventListener('click', function(e) {
        e.preventDefault();
        privacyModal.classList.add('active');
    });
    
    cookiesLink.addEventListener('click', function(e) {
        e.preventDefault();
        cookiesModal.classList.add('active');
    });
    
    modalClose.addEventListener('click', function() {
        privacyModal.classList.remove('active');
    });
    
    cookiesClose.addEventListener('click', function() {
        cookiesModal.classList.remove('active');
    });
    
    // Close modal on outside click
    window.addEventListener('click', function(e) {
        if (e.target === privacyModal) {
            privacyModal.classList.remove('active');
        }
        if (e.target === cookiesModal) {
            cookiesModal.classList.remove('active');
        }
    });
    
    // ========================================
    // Cookie Consent Banner
    // ========================================
    const cookieConsent = document.getElementById('cookie-consent');
    const cookieAccept = document.getElementById('cookie-accept');
    
    // Check if user already accepted
    if (!localStorage.getItem('alm-cookie-consent')) {
        setTimeout(function() {
            cookieConsent.classList.add('active');
        }, 2000);
    }
    
    cookieAccept.addEventListener('click', function() {
        cookieConsent.classList.remove('active');
        localStorage.setItem('alm-cookie-consent', 'accepted');
    });
    
    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ========================================
    // Active Navigation Link on Scroll
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        sections.forEach(function(section) {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.style.color = 'var(--primary-color)';
                } else {
                    navLink.style.color = '';
                }
            }
        });
    });
    
    // ========================================
    // Parallax Effect for Hero
    // ========================================
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = 'translateY(' + (scrolled * 0.4) + 'px)';
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
    
    // ========================================
    // Service Cards Hover Effect Enhancement
    // ========================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            const icon = card.querySelector('.service-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = card.querySelector('.service-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // ========================================
    // Portfolio Filter (Future Enhancement)
    // ========================================
    // Can be extended with filter buttons for different project categories
    
    // ========================================
    // Portfolio Lightbox
    // ========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    let currentPortfolioIndex = 0;
    const portfolioImages = [];
    
    // Forward declaration for language update
    window.updateLightboxLanguage = function() {
        if (lightbox.classList.contains('active')) {
            lightboxCaption.textContent = getLightboxCaption(currentPortfolioIndex);
        }
    };
    
    // Collect portfolio data with both languages
    portfolioItems.forEach(function(item, index) {
        const img = item.querySelector('img');
        const title = item.querySelector('h3');
        const desc = item.querySelector('p');
        
        portfolioImages.push({
            src: img.src,
            titleEn: title ? title.getAttribute('data-en') : '',
            titleEs: title ? title.getAttribute('data-es') : '',
            descEn: desc ? desc.getAttribute('data-en') : '',
            descEs: desc ? desc.getAttribute('data-es') : ''
        });
        
        // Add click event to open lightbox
        item.addEventListener('click', function() {
            currentPortfolioIndex = index;
            openLightbox(index);
        });
    });

    function getLightboxCaption(index) {
        const data = portfolioImages[index];
        const title = currentLang === 'en' ? data.titleEn : data.titleEs;
        const desc = currentLang === 'en' ? data.descEn : data.descEs;
        return title + (desc ? ' - ' + desc : '');
    }
    
    function openLightbox(index) {
        const data = portfolioImages[index];
        lightboxImg.src = data.src;
        lightboxCaption.textContent = getLightboxCaption(index);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showPrevImage() {
        currentPortfolioIndex--;
        if (currentPortfolioIndex < 0) {
            currentPortfolioIndex = portfolioImages.length - 1;
        }
        openLightbox(currentPortfolioIndex);
    }
    
    function showNextImage() {
        currentPortfolioIndex++;
        if (currentPortfolioIndex >= portfolioImages.length) {
            currentPortfolioIndex = 0;
        }
        openLightbox(currentPortfolioIndex);
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        showPrevImage();
    });
    lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation();
        showNextImage();
    });
    
    // Close on outside click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
    
    // ========================================
    // Form Validation Placeholder (No Form - Per Requirements)
    // ========================================
    // Note: No contact form included as per requirements
    // Contact is via phone, email, and WhatsApp
    
    // ========================================
    // Performance: Lazy Loading for Images
    // ========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
    
    // ========================================
    // Console Branding
    // ========================================
    console.log('%c ALM Construction ', 'background: linear-gradient(135deg, #ff6b35, #f7c548); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Professional Construction Services ', 'color: #666; font-size: 14px;');
    console.log('%c Developed by Christian Herencia ', 'color: #ff6b35; font-size: 12px;');
    
});

// ========================================
// Video Controls Enhancement
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-container video');
    
    if (video) {
        // Add play/pause animation
        video.addEventListener('play', function() {
            const container = document.querySelector('.video-container');
            container.style.boxShadow = '0 10px 40px rgba(255, 107, 53, 0.3)';
        });
        
        video.addEventListener('pause', function() {
            const container = document.querySelector('.video-container');
            container.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        });
    }
});
