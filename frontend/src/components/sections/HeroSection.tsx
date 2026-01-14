// Hero Section - Premium design with background image
import { Link } from 'react-router-dom';
import { HERO_CONTENT } from '../../constants';
import './HeroSection.css';

function HeroSection() {
    return (
        <section className="hero" id="home">
            {/* Background with gradient overlay */}
            <div
                className="hero-background"
                style={{ backgroundImage: `url('/images/hero-1.png')` }}
            >
                <div className="hero-gradient"></div>
            </div>

            {/* Content */}
            <div className="hero-content">
                <div className="hero-inner">
                    {/* Badge */}
                    <div className="hero-badge">
                        <span className="badge-dot">
                            <span className="dot-ping"></span>
                            <span className="dot-core"></span>
                        </span>
                        {HERO_CONTENT.badge}
                    </div>

                    {/* Title */}
                    <h1 className="hero-title">
                        {HERO_CONTENT.title} <br />
                        <span className="title-accent">{HERO_CONTENT.titleAccent}</span>
                    </h1>

                    {/* Description */}
                    <p className="hero-subtitle">{HERO_CONTENT.description}</p>

                    {/* CTA Buttons */}
                    <div className="hero-cta-group">
                        <Link to="/about" className="hero-cta primary">
                            {HERO_CONTENT.primaryCta}
                            <span className="cta-arrow">→</span>
                        </Link>
                        <Link to="/contact" className="hero-cta secondary">
                            {HERO_CONTENT.secondaryCta}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
