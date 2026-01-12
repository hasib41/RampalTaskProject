// HomePage - assembles all sections
import { Header, Footer } from '../components/layout';
import { HeroSection, AboutSection, StatsSection } from '../components/sections';
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-page">
            <Header />
            <main>
                <HeroSection />
                <AboutSection />
                <StatsSection />
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;
