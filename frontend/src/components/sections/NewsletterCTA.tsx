// Newsletter CTA Section
import './NewsletterCTA.css';

function NewsletterCTA() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription
    };

    return (
        <section className="newsletter-section">
            <div className="newsletter-container">
                <h2 className="newsletter-title">Ready to energize your community?</h2>
                <p className="newsletter-description">
                    Subscribe to our newsletter for the latest updates on sustainable energy and global projects.
                </p>
                <form className="newsletter-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="newsletter-input"
                        placeholder="Enter your business email"
                        required
                    />
                    <button type="submit" className="newsletter-button">Subscribe</button>
                </form>
            </div>
        </section>
    );
}

export default NewsletterCTA;
