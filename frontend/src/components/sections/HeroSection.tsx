// Hero Section - Premium Centered Full-Width Design
import { Link } from 'react-router-dom';
import { HERO_CONTENT, STATS_DATA } from '../../constants';
import './HeroSection.css';

function HeroSection() {
    return (
        <section className="hero" id="home">
            {/* Animated Background */}
            <div className="hero-background">
                <div
                    className="hero-bg-image"
                    style={{ backgroundImage: `url('/images/hero-1.png')` }}
                />
                <div className="hero-gradient" />
                {/* Animated particles/grid overlay */}
                <div className="hero-grid-overlay" />
            </div>

            {/* Main Content - Centered */}
            <div className="hero-container">
                <div className="hero-content">
                    {/* Badge with pulse animation */}
                    <div className="hero-badge">
                        <span className="badge-dot">
                            <span className="dot-ping" />
                            <span className="dot-core" />
                        </span>
                        <span className="badge-text">{HERO_CONTENT.badge}</span>
                    </div>

                    {/* Title with staggered animation */}
                    <h1 className="hero-title">
                        <span className="title-line">{HERO_CONTENT.title}</span>
                        <span className="title-line title-accent">{HERO_CONTENT.titleAccent}</span>
                    </h1>

                    {/* Description */}
                    <p className="hero-description">{HERO_CONTENT.description}</p>

                    {/* CTA Buttons */}
                    <div className="hero-actions">
                        <Link to="/projects" className="hero-btn hero-btn-primary">
                            <span>{HERO_CONTENT.primaryCta}</span>
                            <svg className="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <Link to="/sustainability" className="hero-btn hero-btn-secondary">
                            <span>{HERO_CONTENT.secondaryCta}</span>
                        </Link>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="hero-stats">
                    {STATS_DATA.map((stat, index) => (
                        <div
                            key={stat.id}
                            className="hero-stat"
                            style={{ '--delay': `${0.8 + index * 0.15}s` } as React.CSSProperties}
                        >
                            <div className="stat-icon-wrapper">
                                <span className="stat-icon">{stat.icon}</span>
                            </div>
                            <div className="stat-content">
                                <span className="stat-number">
                                    {stat.value.toLocaleString()}
                                    <span className="stat-suffix">{stat.suffix}</span>
                                </span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                            <span className="stat-trend">{stat.trend}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
                <div className="scroll-mouse">
                    <div className="scroll-wheel" />
                </div>
                <span className="scroll-text">Scroll to explore</span>
            </div>
        </section>
    );
}

export default HeroSection;
