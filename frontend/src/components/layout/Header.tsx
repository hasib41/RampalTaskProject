// Header Component - Premium navbar with dropdowns, accessibility, and smooth animations
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY_INFO } from '../../constants';
import './Header.css';

// Navigation structure with dropdowns
const NAV_ITEMS = [
    { id: 1, label: 'Home', href: '/' },
    {
        id: 2,
        label: 'About',
        href: '/about',
        submenu: [
            { id: 21, label: 'Corporate Profile', href: '/about' },
            { id: 22, label: 'Board of Directors', href: '/about/board' },
        ]
    },
    { id: 3, label: 'Projects', href: '/projects' },
    { id: 4, label: 'Sustainability', href: '/sustainability' },
    { id: 5, label: 'Tenders', href: '/tenders' },
    { id: 6, label: 'Careers', href: '/careers' },
    { id: 7, label: 'News', href: '/news' },
    { id: 8, label: 'Contact', href: '/contact' },
];

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const location = useLocation();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile menu when clicking a link
    const handleNavClick = () => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
    };

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
    }, [location]);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent, itemId: number, hasSubmenu: boolean) => {
        if (hasSubmenu && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setActiveDropdown(activeDropdown === itemId ? null : itemId);
        }
        if (e.key === 'Escape') {
            setActiveDropdown(null);
        }
    };

    // Check if path is active (including subpages)
    const isActive = (href: string) => {
        if (href === '/') return location.pathname === '/';
        return location.pathname.startsWith(href);
    };

    return (
        <header
            className={`header ${isScrolled ? 'header-scrolled' : ''}`}
            role="banner"
        >
            <div className="header-container">
                {/* Logo */}
                <Link to="/" className="logo" aria-label={`${COMPANY_INFO.shortName} - Home`}>
                    <span className="logo-icon" aria-hidden="true">⚡</span>
                    <div className="logo-text-wrapper">
                        <span className="logo-text">{COMPANY_INFO.shortName}</span>
                        <span className="logo-tagline">Power Company</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="navbar" ref={dropdownRef} aria-label="Main navigation">
                    <ul className="nav-links" role="menubar">
                        {NAV_ITEMS.map((item) => (
                            <li
                                key={item.id}
                                className={item.submenu ? 'has-dropdown' : ''}
                                role="none"
                            >
                                {item.submenu ? (
                                    <>
                                        <button
                                            className={`nav-link dropdown-trigger ${isActive(item.href) ? 'active' : ''}`}
                                            onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
                                            onKeyDown={(e) => handleKeyDown(e, item.id, true)}
                                            aria-expanded={activeDropdown === item.id}
                                            aria-haspopup="true"
                                            role="menuitem"
                                        >
                                            {item.label}
                                            <span className={`dropdown-arrow ${activeDropdown === item.id ? 'open' : ''}`} aria-hidden="true">
                                                ▾
                                            </span>
                                        </button>
                                        <ul
                                            className={`dropdown-menu ${activeDropdown === item.id ? 'open' : ''}`}
                                            role="menu"
                                            aria-label={`${item.label} submenu`}
                                        >
                                            {item.submenu.map((subItem) => (
                                                <li key={subItem.id} role="none">
                                                    <Link
                                                        to={subItem.href}
                                                        onClick={handleNavClick}
                                                        className={location.pathname === subItem.href ? 'active' : ''}
                                                        role="menuitem"
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <Link
                                        to={item.href}
                                        onClick={handleNavClick}
                                        className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                                        role="menuitem"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* CTA Button */}
                <Link to="/contact" className="header-cta">
                    <span className="btn-text">Get in Touch</span>
                    <span className="btn-icon" aria-hidden="true">→</span>
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-menu"
                >
                    <span className="hamburger-line" aria-hidden="true"></span>
                    <span className="hamburger-line" aria-hidden="true"></span>
                    <span className="hamburger-line" aria-hidden="true"></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                id="mobile-menu"
                className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
                aria-hidden={!isMobileMenuOpen}
            >
                <nav className="mobile-nav" aria-label="Mobile navigation">
                    <ul>
                        {NAV_ITEMS.map((item, index) => (
                            <li key={item.id} style={{ transitionDelay: `${0.05 * index}s` }}>
                                {item.submenu ? (
                                    <div className="mobile-dropdown">
                                        <Link
                                            to={item.href}
                                            onClick={handleNavClick}
                                            className={isActive(item.href) ? 'active' : ''}
                                        >
                                            {item.label}
                                        </Link>
                                        <div className="mobile-submenu">
                                            {item.submenu.map((subItem) => (
                                                <Link
                                                    key={subItem.id}
                                                    to={subItem.href}
                                                    onClick={handleNavClick}
                                                    className={location.pathname === subItem.href ? 'active' : ''}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to={item.href}
                                        onClick={handleNavClick}
                                        className={isActive(item.href) ? 'active' : ''}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                    <Link to="/contact" className="mobile-cta" onClick={handleNavClick}>
                        Get in Touch
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
