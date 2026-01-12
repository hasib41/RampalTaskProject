// Hero Section with Auto-sliding Carousel
import { useState, useEffect, useCallback } from 'react';
import { HERO_SLIDES } from '../../constants';
import './HeroSection.css';

function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Auto-slide every 5 seconds
    const nextSlide = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        setTimeout(() => setIsAnimating(false), 800);
    }, [isAnimating]);

    const goToSlide = (index: number) => {
        if (isAnimating || index === currentSlide) return;
        setIsAnimating(true);
        setCurrentSlide(index);
        setTimeout(() => setIsAnimating(false), 800);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const slide = HERO_SLIDES[currentSlide];

    return (
        <section className="hero" id="home">
            {/* Background with gradient overlay */}
            <div className="hero-background">
                <div className="hero-particles">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="particle" style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${10 + Math.random() * 10}s`,
                        }} />
                    ))}
                </div>
            </div>

            <div className="hero-overlay"></div>

            {/* Content */}
            <div className="hero-content">
                <div className={`slide-content ${isAnimating ? 'animating' : ''}`}>
                    <span className="hero-badge">🔋 Reliable Energy Partner</span>
                    <h1 className="hero-title">{slide.title}</h1>
                    <p className="hero-subtitle">{slide.subtitle}</p>

                    <div className="hero-cta-group">
                        <a href={slide.ctaLink} className="hero-cta primary">
                            {slide.cta}
                            <span className="cta-arrow">→</span>
                        </a>
                        <a href="#contact" className="hero-cta secondary">
                            Contact Us
                        </a>
                    </div>
                </div>

                {/* Slide Indicators */}
                <div className="slide-indicators">
                    {HERO_SLIDES.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            <span className="indicator-progress"></span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
                <span>Scroll Down</span>
            </div>
        </section>
    );
}

export default HeroSection;
