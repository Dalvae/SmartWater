// lib/api-client.ts

const API_BASE_URL = process.env.SMARTWATER_API_BASE_URL;
const AUTH_TOKEN = process.env.SMARTWATER_API_AUTH_TOKEN;

const fetchApi = async (endpoint: string, options?: RequestInit) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: AUTH_TOKEN,
    ...options?.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const get = async (endpoint: string) => {
  return fetchApi(endpoint);
};

export const post = async (endpoint: string, data: any) => {
  return fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const put = async (endpoint: string, data: any) => {
  return fetchApi(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const del = async (endpoint: string) => {
  return fetchApi(endpoint, {
    method: "DELETE",
  });
};
