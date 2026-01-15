/**
 * API Service - Connects frontend to Django backend.
 * Provides typed functions for all API endpoints.
 */

// API Base URL - change in production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Types for API responses
export interface Tender {
    id: number;
    title: string;
    description: string;
    reference_number: string;
    deadline: string;
    document_url: string | null;
    category: 'goods' | 'works' | 'services' | 'consultancy';
    created_at: string;
}

export interface News {
    id: number;
    title: string;
    content: string;
    summary: string;
    image_url: string | null;
    is_featured: boolean;
    created_at: string;
}

export interface Career {
    id: number;
    title: string;
    department: string;
    location: string;
    description: string;
    requirements: string;
    job_type: 'full_time' | 'part_time' | 'contract' | 'internship';
    deadline: string;
    vacancies: number;
    created_at: string;
}

export interface ContactMessage {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

export interface ProjectStat {
    id: number;
    label: string;
    value: number;
    suffix: string;
    icon: string;
    order: number;
}

export interface Project {
    id: number;
    name: string;
    location: string;
    description: string;
    capacity: string;
    status: 'operational' | 'construction' | 'planning' | 'maintenance';
    category: 'coal' | 'solar' | 'wind' | 'hydro' | 'transmission';
    image_url: string | null;
    efficiency: string;
    is_featured: boolean;
    created_at: string;
}

// DRF Paginated Response type
interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

// Generic fetch wrapper with error handling
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

// Helper to extract results from paginated response
function extractResults<T>(data: PaginatedResponse<T> | T[]): T[] {
    if (Array.isArray(data)) {
        return data;
    }
    return data.results || [];
}

// ==================== API Functions ====================

/**
 * Get all tenders
 */
export async function getTenders(): Promise<Tender[]> {
    const data = await apiFetch<PaginatedResponse<Tender> | Tender[]>('/tenders/');
    return extractResults(data);
}

/**
 * Get single tender by ID
 */
export async function getTender(id: number): Promise<Tender> {
    return apiFetch<Tender>(`/tenders/${id}/`);
}

/**
 * Get all news articles
 */
export async function getNews(): Promise<News[]> {
    const data = await apiFetch<PaginatedResponse<News> | News[]>('/news/');
    return extractResults(data);
}

/**
 * Get featured news only
 */
export async function getFeaturedNews(): Promise<News[]> {
    const data = await apiFetch<PaginatedResponse<News> | News[]>('/news/featured/');
    return extractResults(data);
}

/**
 * Get single news article by ID
 */
export async function getNewsArticle(id: number): Promise<News> {
    return apiFetch<News>(`/news/${id}/`);
}

/**
 * Get all job openings
 */
export async function getCareers(): Promise<Career[]> {
    const data = await apiFetch<PaginatedResponse<Career> | Career[]>('/careers/');
    return extractResults(data);
}

/**
 * Get single job by ID
 */
export async function getCareer(id: number): Promise<Career> {
    return apiFetch<Career>(`/careers/${id}/`);
}

/**
 * Submit contact form
 */
export async function submitContactForm(data: ContactMessage): Promise<{ id: number }> {
    return apiFetch('/contact/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

/**
 * Get project statistics for homepage
 */
export async function getProjectStats(): Promise<ProjectStat[]> {
    const data = await apiFetch<PaginatedResponse<ProjectStat> | ProjectStat[]>('/stats/');
    return extractResults(data);
}

/**
 * Get all projects
 */
export async function getProjects(): Promise<Project[]> {
    const data = await apiFetch<PaginatedResponse<Project> | Project[]>('/projects/');
    return extractResults(data);
}

/**
 * Get single project by ID
 */
export async function getProject(id: number): Promise<Project> {
    return apiFetch<Project>(`/projects/${id}/`);
}

// ... types
export interface SustainabilityStat {
    id: number;
    label: string;
    value: string;
    trend: string | null;
    icon: string | null;
    order: number;
    is_active: boolean;
}

export interface CSRInitiative {
    id: number;
    title: string;
    description: string;
    category: 'education' | 'health' | 'environment' | 'livelihood' | 'infrastructure';
    impact_metric: string | null;
    image_url: string | null;
    is_active: boolean;
}

// ... existing helper functions ...

/**
 * Get sustainability statistics
 */
export async function getSustainabilityStats(): Promise<SustainabilityStat[]> {
    const data = await apiFetch<PaginatedResponse<SustainabilityStat> | SustainabilityStat[]>('/sustainability/');
    return extractResults(data);
}

/**
 * Get CSR initiatives
 */
export async function getCSRInitiatives(): Promise<CSRInitiative[]> {
    const data = await apiFetch<PaginatedResponse<CSRInitiative> | CSRInitiative[]>('/csr/');
    return extractResults(data);
}

/**
 * Get featured projects only
 */
export async function getFeaturedProjects(): Promise<Project[]> {
    const data = await apiFetch<PaginatedResponse<Project> | Project[]>('/projects/?is_featured=true');
    return extractResults(data);
}


// ==================== Job Application ====================

export interface JobApplicationData {
    career: number;
    name: string;
    email: string;
    phone: string;
    cover_letter?: string;
    resume_url?: string;
    experience_years?: number;
    current_position?: string;
}

/**
 * Submit a job application
 */
export async function submitJobApplication(data: JobApplicationData): Promise<{ id: number }> {
    return apiFetch('/applications/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}
