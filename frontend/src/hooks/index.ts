// Custom hooks for reusable logic
import { useState, useEffect, useRef } from 'react';

/**
 * Hook to animate a counter when element is in viewport
 */
export function useCounterAnimation(targetValue: number, duration = 2000) {
    const [count, setCount] = useState(0);
    const elementRef = useRef<HTMLElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    animateCounter();
                }
            },
            { threshold: 0.3 }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, []);

    const animateCounter = () => {
        const steps = 60;
        const interval = duration / steps;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(targetValue * easeOut));

            if (step >= steps) {
                clearInterval(timer);
                setCount(targetValue);
            }
        }, interval);
    };

    return { count, elementRef };
}

/**
 * Hook to detect if element is in viewport
 */
export function useInView(threshold = 0.1) {
    const [isInView, setIsInView] = useState(false);
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [threshold]);

    return { isInView, elementRef };
}

/**
 * Hook for smooth scroll to section
 */
export function useSmoothScroll() {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return { scrollToSection };
}

// Re-export API hooks
export * from './useApi';

