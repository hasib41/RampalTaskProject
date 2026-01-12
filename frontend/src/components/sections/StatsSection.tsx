// Stats Section - Premium design with animated counters
import { useRef, useState, useEffect } from 'react';
import { STATS_DATA } from '../../constants';
import './StatsSection.css';

function StatsSection() {
    const [counts, setCounts] = useState<number[]>(STATS_DATA.map(() => 0));
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    setIsVisible(true);
                    animateCounters();
                }
            },
            { threshold: 0.3 }
        );

        const currentElement = sectionRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, []);

    const animateCounters = () => {
        const duration = 2500;
        const steps = 80;
        const interval = duration / steps;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            // Cubic ease-out for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCounts(STATS_DATA.map((stat) => Math.floor(stat.value * easeOut)));

            if (step >= steps) {
                clearInterval(timer);
                setCounts(STATS_DATA.map((stat) => stat.value));
            }
        }, interval);
    };

    return (
        <section className={`stats ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
            {/* Background decoration */}
            <div className="stats-bg">
                <div className="stats-shape shape-1"></div>
                <div className="stats-shape shape-2"></div>
            </div>

            <div className="stats-container">
                {/* Section header */}
                <div className="stats-header">
                    <span className="stats-label">Our Achievements</span>
                    <h2 className="stats-title">Numbers That Speak</h2>
                </div>

                {/* Stats grid */}
                <div className="stats-grid">
                    {STATS_DATA.map((stat, index) => (
                        <div
                            key={stat.id}
                            className="stat-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="stat-icon-wrapper">
                                <span className="stat-icon">{stat.icon}</span>
                            </div>
                            <div className="stat-content">
                                <div className="stat-value">
                                    {counts[index].toLocaleString()}
                                    <span className="stat-suffix">{stat.suffix}</span>
                                </div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                            {/* Decorative line */}
                            <div className="stat-line"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default StatsSection;
