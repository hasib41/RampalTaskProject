// About Section - Professional layout with animations
import { useRef, useEffect, useState } from 'react';
import { PROJECT_SPECS, COMPANY_INFO } from '../../constants';
import './AboutSection.css';

function AboutSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className={`about ${isVisible ? 'visible' : ''}`} id="about" ref={sectionRef}>
            <div className="about-container">
                {/* Image Side */}
                <div className="about-image">
                    <div className="image-wrapper">
                        <div className="image-placeholder">
                            <span className="placeholder-icon">🏭</span>
                            <span className="placeholder-text">Power Plant</span>
                        </div>
                        {/* Floating badge */}
                        <div className="experience-badge">
                            <span className="badge-number">10+</span>
                            <span className="badge-text">Years of Excellence</span>
                        </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="decoration decoration-1"></div>
                    <div className="decoration decoration-2"></div>
                </div>

                {/* Content Side */}
                <div className="about-content">
                    <span className="section-label">About Us</span>
                    <h2 className="section-title">
                        Powering Progress,<br />
                        <span className="title-highlight">Building the Future</span>
                    </h2>

                    <p className="about-description">
                        {COMPANY_INFO.name} is a joint venture between NTPC Ltd of India and
                        Bangladesh Power Development Board (BPDB), committed to providing
                        reliable and sustainable energy solutions for the nation.
                    </p>

                    {/* Project Specifications */}
                    <div className="project-specs">
                        <h3 className="specs-title">
                            <span className="specs-icon">📋</span>
                            Project Specifications
                        </h3>
                        <div className="specs-grid">
                            {PROJECT_SPECS.map((spec, index) => (
                                <div key={index} className="spec-item">
                                    <span className="spec-label">{spec.label}</span>
                                    <span className="spec-value">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <a href="#contact" className="about-cta">
                        Learn More About Us
                        <span className="cta-arrow">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
