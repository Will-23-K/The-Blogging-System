// public/js/auth.js

const API_BASE = "http://localhost:5000/api/auth";

// 🔐 LOGIN
export async function login(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "index.html";
  } else {
    alert(data.message || "Login failed");
  }
}

// 📝 SIGNUP
export async function signup(username, email, password) {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Account created! Please log in.");
    window.location.href = "login.html";
  } else {
    alert(data.message || "Signup failed");
  }
}

// 🔑 FORGOT PASSWORD (basic flow)
export async function forgotPassword(email) {
  const res = await fetch(`${API_BASE}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Password reset email sent! Check your inbox.");
  } else {
    alert(data.message || "Could not send reset link");
  }
}
