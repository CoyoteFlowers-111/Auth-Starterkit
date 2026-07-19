# 🔑 Auth Starter Kit

A reusable, full-stack JWT authentication boilerplate — register,
log in, and call a protected route with a bearer token. Meant to be
copied into new projects instead of rewriting auth every time.

**Stack:** Flask (backend + API) · SQLite (users) · PyJWT (tokens) · vanilla HTML/CSS/JS (frontend)

## Features

- Registration with hashed passwords (Werkzeug's PBKDF2)
- Login issues a short-lived JWT (60 min by default)
- `@token_required` decorator to protect any route
- Example protected route (`/api/protected`) that only responds with a valid token
- Clean separation: swap the SQLite calls for your real DB and the auth logic still works unchanged

## Install & run

```bash
git clone https://github.com/<your-username>/auth-starter-kit.git
cd auth-starter-kit
pip install -r requirements.txt
python app.py
```

Open **http://127.0.0.1:5000** — register, log in, then click "Call
/api/protected" to see the token in action.

## Project structure

```
auth-starter-kit/
├── app.py              # Flask app: register/login/JWT/protected route
├── requirements.txt
├── templates/
│   └── index.html
└── static/
    ├── app.js
    └── style.css
```

## Using this in your own project

1. Copy `app.py`'s `make_token`, `token_required`, and the
   `users` table schema into your project.
2. Protect any route by adding `@token_required` above it — it
   populates `request.user` with `{id, email}`.
3. Set `JWT_SECRET` as an environment variable in production
   (don't rely on the random default, which changes every restart).

```python
@app.route("/api/my-route")
@token_required
def my_route():
    return jsonify({"hello": request.user["email"]})
```

## Security notes

- Tokens expire after 60 minutes (configurable via `TOKEN_EXPIRY_MINUTES`) — there's no refresh-token flow here by design, to keep this a minimal starting point. Add one if you need long-lived sessions.
- Always run behind HTTPS in production — JWTs sent over plain HTTP can be intercepted.
- This stores tokens client-side; for higher-security apps consider httponly cookies instead.

## License

MIT — see [LICENSE](LICENSE).
