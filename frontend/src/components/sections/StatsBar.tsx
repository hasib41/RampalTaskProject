// Stats Bar - Floating overlap component
import { STATS_DATA } from '../../constants';
import './StatsBar.css';

function StatsBar() {
    return (
        <section className="stats-bar">
            <div className="stats-bar-container">
                <div className="stats-bar-grid">
                    {STATS_DATA.map((stat, index) => (
                        <div key={stat.id} className="stats-bar-item">
                            <div className="stats-bar-header">
                                <span className="stats-bar-icon">{stat.icon}</span>
                                <p className="stats-bar-label">{stat.label}</p>
                            </div>
                            <div className="stats-bar-value-row">
                                <p className="stats-bar-value">
                                    {stat.value}{stat.suffix}
                                </p>
                                <span className={`stats-bar-trend ${index === 2 ? 'primary' : ''}`}>
                                    {index === 0 && '↑'}{stat.trend}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default StatsBar;
