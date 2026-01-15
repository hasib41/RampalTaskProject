/**
 * Job Application Modal Component
 * Collects applicant information and submits to backend API.
 */

import { useState, useEffect } from 'react';
import { submitJobApplication } from '../services/api';
import type { Career } from '../services/api';
import './JobApplicationModal.css';

interface JobApplicationModalProps {
    job: Career;
    onClose: () => void;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    cover_letter: string;
    resume_url: string;
    experience_years: string;
    current_position: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
}

function JobApplicationModal({ job, onClose }: JobApplicationModalProps) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        cover_letter: '',
        resume_url: '',
        experience_years: '0',
        current_position: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[+\d\s()-]{7,20}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            await submitJobApplication({
                career: job.id,
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                cover_letter: formData.cover_letter.trim() || undefined,
                resume_url: formData.resume_url.trim() || undefined,
                experience_years: parseInt(formData.experience_years) || 0,
                current_position: formData.current_position.trim() || undefined,
            });
            setIsSuccess(true);
        } catch (error) {
            console.error('Failed to submit application:', error);
            setErrors({ name: 'Failed to submit. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="job-modal-overlay" onClick={handleOverlayClick}>
            <div className="job-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                {isSuccess ? (
                    <div className="job-modal-success">
                        <div className="success-icon" aria-hidden="true">✓</div>
                        <h3>Application Submitted!</h3>
                        <p>Thank you for applying for the {job.title} position. We'll review your application and get back to you soon.</p>
                        <button className="btn-done" onClick={onClose}>Done</button>
                    </div>
                ) : (
                    <>
                        <div className="job-modal-header">
                            <div>
                                <h2 id="modal-title">Apply for {job.title}</h2>
                                <p>{job.department} • {job.location}</p>
                            </div>
                            <button
                                className="job-modal-close"
                                onClick={onClose}
                                aria-label="Close modal"
                            >
                                ×
                            </button>
                        </div>

                        <form className="job-modal-body" onSubmit={handleSubmit}>
                            <div className="job-form">
                                {/* Name & Email Row */}
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            Full Name <span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            className={errors.name ? 'error' : ''}
                                            autoFocus
                                        />
                                        {errors.name && <span className="error-message">{errors.name}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">
                                            Email <span className="required">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className={errors.email ? 'error' : ''}
                                        />
                                        {errors.email && <span className="error-message">{errors.email}</span>}
                                    </div>
                                </div>

                                {/* Phone & Experience Row */}
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="phone">
                                            Phone <span className="required">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+880 1XX-XXXX-XXX"
                                            className={errors.phone ? 'error' : ''}
                                        />
                                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="experience_years">Years of Experience</label>
                                        <input
                                            type="number"
                                            id="experience_years"
                                            name="experience_years"
                                            value={formData.experience_years}
                                            onChange={handleChange}
                                            min="0"
                                            max="50"
                                        />
                                    </div>
                                </div>

                                {/* Current Position */}
                                <div className="form-group">
                                    <label htmlFor="current_position">Current Position</label>
                                    <input
                                        type="text"
                                        id="current_position"
                                        name="current_position"
                                        value={formData.current_position}
                                        onChange={handleChange}
                                        placeholder="e.g., Senior Engineer at XYZ Company"
                                    />
                                </div>

                                {/* Resume URL */}
                                <div className="form-group">
                                    <label htmlFor="resume_url">Resume/CV Link</label>
                                    <input
                                        type="url"
                                        id="resume_url"
                                        name="resume_url"
                                        value={formData.resume_url}
                                        onChange={handleChange}
                                        placeholder="https://drive.google.com/... or LinkedIn profile"
                                    />
                                </div>

                                {/* Cover Letter */}
                                <div className="form-group">
                                    <label htmlFor="cover_letter">Cover Letter</label>
                                    <textarea
                                        id="cover_letter"
                                        name="cover_letter"
                                        value={formData.cover_letter}
                                        onChange={handleChange}
                                        placeholder="Tell us why you're a great fit for this role..."
                                    />
                                </div>
                            </div>

                            <div className="job-modal-footer">
                                <button
                                    type="button"
                                    className="btn-cancel"
                                    onClick={onClose}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="btn-spinner"></span>
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit Application'
                                    )}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default JobApplicationModal;
