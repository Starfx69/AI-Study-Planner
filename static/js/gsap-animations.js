// Preloader Animation
function initPreloader() {
    const progressBar = document.querySelector('.progress');
    const preloader = document.querySelector('.preloader');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Animate out
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    preloader.style.display = 'none';
                }
            });
        }
        progressBar.style.width = `${progress}%`;
    }, 100);
    
    // Initial animations
    gsap.from('.preloader h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.progress-bar', {
        scaleX: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.3
    });
}

// Hero Section Animations
function initHeroAnimations() {
    gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
    });
    
    gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8
    });
    
    gsap.from('.cta-button', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 1.1
    });
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initHeroAnimations();
});