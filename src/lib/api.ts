/**
 * CrowCred API Client
 * Base integration with the Flask backend.
 */

const API_BASE_URL = 'http://127.0.0.1:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('crowdcred_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  // --- Auth ---
  register: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) });
    return res.json();
  },
  login: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) });
    return res.json();
  },
  
  // --- Courses ---
  listCourses: async () => {
    const res = await fetch(`${API_BASE_URL}/course/list`);
    return res.json();
  },
  enrollCourse: async (course_id: number) => {
    const res = await fetch(`${API_BASE_URL}/course/enroll`, { method: 'POST', headers: getHeaders(), body: JSON.stringify({ course_id }) });
    return res.json();
  },

  // --- Hackathon ---
  listHackathons: async () => {
    const res = await fetch(`${API_BASE_URL}/hackathon/list`);
    return res.json();
  },
  registerHackathon: async (data: { hackathon_id: number; team_name?: string }) => {
    const res = await fetch(`${API_BASE_URL}/hackathon/register`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) });
    return res.json();
  },
  
  // --- Community Posts ---
  getFeed: async () => {
    const res = await fetch(`${API_BASE_URL}/post/feed`, { headers: getHeaders() });
    return res.json();
  },
  createPost: async (content: string) => {
    const res = await fetch(`${API_BASE_URL}/post/create`, { method: 'POST', headers: getHeaders(), body: JSON.stringify({ content }) });
    return res.json();
  },

  // --- Payment ---
  createOrder: async (course_id: number) => {
    const res = await fetch(`${API_BASE_URL}/payment/create-order`, { method: 'POST', headers: getHeaders(), body: JSON.stringify({ course_id }) });
    return res.json();
  },
  
  // --- Notifications ---
  listNotifications: async () => {
    const res = await fetch(`${API_BASE_URL}/notification/list`, { headers: getHeaders() });
    return res.json();
  }
};
