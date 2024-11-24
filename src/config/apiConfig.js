const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/lms-admin';

export const getApiUrl = (endpoint) => {
    // Remove leading slash if present to avoid double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${API_BASE_URL}/${cleanEndpoint}`;
};

export default API_BASE_URL;
