// API base - Vercel routes /api/* to the serverless function
const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  const res = await fetch(url, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

export function submitAppointment(formData) {
  return request('/appointments', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}

export function submitContact(formData) {
  return request('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}

export function healthCheck() {
  return request('/health');
}