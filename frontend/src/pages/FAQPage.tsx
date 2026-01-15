// FAQ Page - Frequently Asked Questions
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { COMPANY_INFO } from '../constants';
import './FAQPage.css';

// FAQ Categories and Questions
const FAQ_CATEGORIES = [
    {
        id: 'general',
        title: 'General Information',
        icon: '🏢',
        questions: [
            {
                q: 'What is BIFPCL?',
                a: `${COMPANY_INFO.name} (${COMPANY_INFO.shortName}) is a joint venture company between Bangladesh Power Development Board (BPDB) and NTPC Limited of India. We are developing the 1320 MW Maitree Super Thermal Power Project at Rampal, Bagerhat.`
            },
            {
                q: 'Where is the power plant located?',
                a: 'The Maitree Super Thermal Power Project is located at Rampal Upazila in Bagerhat District, Bangladesh, approximately 14 kilometers north of the Sundarbans mangrove forest.'
            },
            {
                q: 'What is the capacity of the power plant?',
                a: 'The power plant has a total installed capacity of 1320 MW, consisting of two units of 660 MW each using ultra-supercritical technology.'
            },
            {
                q: 'When did operations begin?',
                a: 'Unit 1 was synchronized with the national grid in 2022, and the plant achieved full commercial operation in 2023, providing reliable baseload power to the national grid.'
            },
        ]
    },
    {
        id: 'technology',
        title: 'Technology & Operations',
        icon: '⚡',
        questions: [
            {
                q: 'What technology does the power plant use?',
                a: 'We use Ultra-Supercritical (USC) technology, which operates at higher temperatures and pressures than conventional plants. This results in approximately 40% thermal efficiency, significantly reducing coal consumption and emissions per unit of electricity generated.'
            },
            {
                q: 'What type of coal is used?',
                a: 'The plant uses high-quality imported coal with low ash and sulfur content, primarily sourced from Indonesia, Australia, and South Africa. This ensures cleaner combustion and lower emissions.'
            },
            {
                q: 'What environmental measures are in place?',
                a: 'We employ state-of-the-art environmental technologies including Flue Gas Desulfurization (FGD) for SOx removal, Electrostatic Precipitators (ESP) for particulate matter, Selective Catalytic Reduction (SCR) for NOx control, and a zero liquid discharge system for water management.'
            },
            {
                q: 'How is the cooling water managed?',
                a: 'The plant uses a closed-cycle cooling system with cooling towers, minimizing water consumption. Water is drawn from the Passur River and treated before use. All wastewater is treated and recycled within the plant.'
            },
        ]
    },
    {
        id: 'careers',
        title: 'Careers & Employment',
        icon: '💼',
        questions: [
            {
                q: 'How can I apply for a job at BIFPCL?',
                a: 'You can view current openings and apply through our Careers page. Simply click the "Apply Now" button on any job listing to submit your application with your resume and cover letter.'
            },
            {
                q: 'What qualifications are typically required?',
                a: 'Requirements vary by position. Technical roles typically require engineering degrees (Mechanical, Electrical, Chemical), while management positions may require relevant business or technical qualifications with industry experience.'
            },
            {
                q: 'Does BIFPCL offer internships?',
                a: 'Yes, we offer internship programs for engineering students from recognized universities. Internship opportunities are posted on our Careers page when available.'
            },
            {
                q: 'What benefits does BIFPCL offer employees?',
                a: 'We offer competitive salaries, comprehensive health insurance, professional development opportunities, international training programs, and a collaborative work environment with state-of-the-art facilities.'
            },
        ]
    },
    {
        id: 'sustainability',
        title: 'Sustainability & CSR',
        icon: '🌱',
        questions: [
            {
                q: 'What CSR initiatives does BIFPCL undertake?',
                a: 'Our CSR programs focus on education (scholarships, school development), healthcare (medical camps, health facilities), livelihood development (skill training, employment), and environmental conservation around the project area.'
            },
            {
                q: 'How does BIFPCL protect the Sundarbans?',
                a: 'We implement comprehensive environmental safeguards including using low-emission technology, maintaining a 14 km distance from the core Sundarbans area, continuous environmental monitoring, and reforestation programs in the region.'
            },
            {
                q: 'What is the environmental monitoring process?',
                a: 'We conduct continuous real-time monitoring of emissions, water quality, and ambient air quality. Data is shared with regulatory authorities and independent environmental agencies for verification.'
            },
        ]
    },
    {
        id: 'contact',
        title: 'Contact & Visits',
        icon: '📞',
        questions: [
            {
                q: 'How can I contact BIFPCL?',
                a: `You can reach us through our Contact page, by email at ${COMPANY_INFO.email}, or by phone at ${COMPANY_INFO.phone}. Our corporate office is located at ${COMPANY_INFO.address}.`
            },
            {
                q: 'Can I visit the power plant?',
                a: 'Educational and professional visits can be arranged by contacting our Public Relations department. Visits are subject to safety protocols and prior approval. Please submit your request at least two weeks in advance.'
            },
            {
                q: 'How can I report a concern or complaint?',
                a: 'You can submit concerns through our Contact page or directly email our Grievance Redressal Cell. All complaints are handled confidentially and addressed within the stipulated timeframe.'
            },
        ]
    },
];

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
    return (
        <div className={`faq-item ${isOpen ? 'open' : ''}`}>
            <button className="faq-question" onClick={onClick} aria-expanded={isOpen}>
                <span>{question}</span>
                <span className="faq-icon">{isOpen ? '−' : '+'}</span>
            </button>
            <div className="faq-answer">
                <p>{answer}</p>
            </div>
        </div>
    );
}

function FAQPage() {
    const [openItems, setOpenItems] = useState<Record<string, number | null>>({});
    const [activeCategory, setActiveCategory] = useState('general');

    const toggleItem = (categoryId: string, index: number) => {
        setOpenItems(prev => ({
            ...prev,
            [categoryId]: prev[categoryId] === index ? null : index
        }));
    };

    const activeData = FAQ_CATEGORIES.find(c => c.id === activeCategory);

    return (
        <>
            <Header />
            <main className="faq-page">
                <div className="container">
                    {/* Breadcrumb */}
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link>
                        <span>/</span>
                        <Link to="/about">About Us</Link>
                        <span>/</span>
                        <span>FAQ</span>
                    </nav>

                    {/* Page Header */}
                    <div className="page-header">
                        <h1>Frequently Asked Questions</h1>
                        <p>Find answers to common questions about BIFPCL, our operations, careers, and more.</p>
                    </div>

                    {/* FAQ Content */}
                    <div className="faq-layout">
                        {/* Category Sidebar */}
                        <aside className="faq-sidebar">
                            <h3>Categories</h3>
                            <div className="faq-categories">
                                {FAQ_CATEGORIES.map(category => (
                                    <button
                                        key={category.id}
                                        className={`faq-category-btn ${activeCategory === category.id ? 'active' : ''}`}
                                        onClick={() => setActiveCategory(category.id)}
                                    >
                                        <span className="category-icon">{category.icon}</span>
                                        <span className="category-title">{category.title}</span>
                                        <span className="category-count">{category.questions.length}</span>
                                    </button>
                                ))}
                            </div>
                        </aside>

                        {/* FAQ Questions */}
                        <div className="faq-content">
                            {activeData && (
                                <>
                                    <div className="faq-content-header">
                                        <span className="faq-content-icon">{activeData.icon}</span>
                                        <h2>{activeData.title}</h2>
                                    </div>
                                    <div className="faq-list">
                                        {activeData.questions.map((item, index) => (
                                            <FAQItem
                                                key={index}
                                                question={item.q}
                                                answer={item.a}
                                                isOpen={openItems[activeData.id] === index}
                                                onClick={() => toggleItem(activeData.id, index)}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Contact CTA */}
                    <section className="faq-cta">
                        <div className="faq-cta-content">
                            <h3>Still have questions?</h3>
                            <p>Can't find the answer you're looking for? Our team is happy to help.</p>
                        </div>
                        <Link to="/contact" className="faq-cta-btn">
                            Contact Us →
                        </Link>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default FAQPage;
