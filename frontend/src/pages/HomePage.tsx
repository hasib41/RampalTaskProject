// HomePage - assembles all sections
import { Header, Footer } from '../components/layout';
import { HeroSection, ProjectsGrid, NewsletterCTA } from '../components/sections';
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-page">
            <Header />
            <main>
                <HeroSection />
                <ProjectsGrid />
                <NewsletterCTA />
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;

