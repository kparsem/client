# Banking Client

This is a simple React frontend for a banking backend used for quick testing and verification.

Features:

- Home page with features and a nice nav bar
- Signup form (firstName, lastName, email, password, confirmPassword, company, role)
- Verification page to input 6-digit code after signup (email pre-populated)
- Login form (email, password) with token persistence
- Blue / White / Purple theme

API:

- Base URL is `https://choreal-flexional-makenna.ngrok-free.dev` (can be overridden with `VITE_API_URL`)
- Signup: `/banking/auth/signup`
- Login: `/banking/auth/login`
- Verify: `/banking/auth/verifyemail`

Note about request format:

- The app sends auth payloads (signup/login/verify) as application/x-www-form-urlencoded (form-encoded) to match the backend's form endpoints.
- If you need to send JSON instead, the API helpers support an optional `asJson` boolean parameter; e.g. `signup(payload, true)` will send application/json.

## Debugging / Error details

When a request fails, the UI shows a diagnostic panel with the following information to help you debug quickly:

- HTTP status (e.g. 400, 401, 422, 500) and statusText
- Server-provided error message and the full response body (if provided)
- Request method and URL, request headers, and the request body (as sent by the frontend)
- Tips and advice based on the status (network error, authorization problem, validation or content-type issues)

Common issues to verify:

- Make sure `Content-Type` is the type your backend expects (application/x-www-form-urlencoded by default in this client).
- Ensure required fields are included (e.g. `firstName`, `email`, `password`, `role` for sign up).
- Check your backend logs for 5xx errors, and confirm the base URL is correct (or set `VITE_API_URL` to override).

## What the backend needs (per endpoint)

Signup (`POST /banking/auth/signup`)

- Content-Type: `application/x-www-form-urlencoded` by default (use `asJson` to send JSON)
- Required fields: `firstName` (string), `lastName` (string), `email` (string, email), `password` (string, min length 6), `confirmPassword` (string; must match `password`), `company` (string), `role` (string; e.g. 'admin', 'manager', 'staff', 'customer')

Verify Email (`POST /banking/auth/verifyemail`)

- Content-Type: `application/x-www-form-urlencoded` by default
- Required fields: `email` (string), `code` (string/number; 6-digit code)

Login (`POST /banking/auth/login`)

- Content-Type: `application/x-www-form-urlencoded` by default
- Required fields: `email` (string), `password` (string)

## Expected/Helpful Response Patterns

- Signup may return 200/201 with a message that a verification code was sent (or directly return a token in some backends). Check response body to find message or token.
- Verify returns 200 on success and may return a token or success message.
- Login returns 200 on success with a token in one of these fields: `token`, `accessToken`, `jwt`, or `authToken`.

If you see a validation error (400/422), the `Response Body` panel will show the exact missing fields/validation errors the server sent back.

Quick start:

Install deps:

```
npm install
```

Run dev server:

```
npm run dev
```

Open http://localhost:5173/ and use the nav bar to create an account and verify.

Notes:

- If you don't have a backend running at the default URL, set `VITE_API_URL` to your API base or run with ngrok to expose a local server.
- The project uses `vite` and React 18.
