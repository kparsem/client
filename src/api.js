import axios from "axios";

// Default to requested ngrok base URL unless overridden via VITE_API_URL
const defaultBase = "https://choreal-flexional-makenna.ngrok-free.dev";
const baseURL = import.meta.env.VITE_API_URL || defaultBase;

export const api = axios.create({
  baseURL,
  // Keep default headers minimal; request-specific functions will override Content-Type
  headers: {},
});

export const endpoints = {
  auth: {
    signup: "/banking/auth/signup",
    login: "/banking/auth/login",
    verifyEmail: "/banking/auth/verifyemail",
  },
};

export function attachToken(token) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}

export function parseAxiosError(err) {
  // Returns a normalized error object with request and response info
  const parsed = {
    message: err.message || "Unknown error",
    isNetworkError: !err.response && !!err.request,
    status: err.response?.status || null,
    statusText: err.response?.statusText || null,
    serverMessage:
      err.response?.data?.message || err.response?.data?.error || null,
    serverData: err.response?.data || null,
    request: {
      method: err.config?.method || null,
      url: err.config?.url || null,
      headers: err.config?.headers || null,
      body: err.config?.data || null,
    },
    responseHeaders: err.response?.headers || null,
  };
  return parsed;
}

export async function signup(payload, asJson = false) {
  // payload: { firstName, lastName, email, password, company, role }
  try {
    if (asJson) {
      return await api.post(endpoints.auth.signup, payload, {
        headers: { "Content-Type": "application/json" },
      });
    }
    const body = new URLSearchParams(payload).toString();
    return await api.post(endpoints.auth.signup, body, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  } catch (err) {
    const parsed = parseAxiosError(err);
    const e = new Error(
      parsed.serverMessage || parsed.message || "Signup failed"
    );
    e.parsed = parsed;
    throw e;
  }
}

export async function login(payload, asJson = false) {
  // payload: { email, password }
  try {
    if (asJson) {
      return await api.post(endpoints.auth.login, payload, {
        headers: { "Content-Type": "application/json" },
      });
    }
    const body = new URLSearchParams(payload).toString();
    return await api.post(endpoints.auth.login, body, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  } catch (err) {
    const parsed = parseAxiosError(err);
    const e = new Error(
      parsed.serverMessage || parsed.message || "Login failed"
    );
    e.parsed = parsed;
    throw e;
  }
}

export async function verifyEmail(payload, asJson = false) {
  // payload: { email, code }
  try {
    if (asJson) {
      return await api.post(endpoints.auth.verifyEmail, payload, {
        headers: { "Content-Type": "application/json" },
      });
    }
    const body = new URLSearchParams(payload).toString();
    return await api.post(endpoints.auth.verifyEmail, body, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  } catch (err) {
    const parsed = parseAxiosError(err);
    const e = new Error(
      parsed.serverMessage || parsed.message || "Verification failed"
    );
    e.parsed = parsed;
    throw e;
  }
}
