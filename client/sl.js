const API_BASE = "http://localhost:3000/api/auth";

/* ================= TAB SWITCH ================= */
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

loginTab.onclick = () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  loginForm.classList.add("active");
  signupForm.classList.remove("active");
};

signupTab.onclick = () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  signupForm.classList.add("active");
  loginForm.classList.remove("active");
};

/* ================= SIGNUP ================= */
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = signupForm.fullName.value.trim();
  const email = signupForm.email.value.trim();
  const password = signupForm.password.value;
  const confirm = signupForm.confirm.value;

  if (!fullName || !email || !password || !confirm) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Register failed");
      return;
    }

    alert("Register success! Please login.");
    loginTab.click();
    signupForm.reset();
  } catch (err) {
    alert("Cannot connect to server");
    console.error(err);
  }
});

/* ================= LOGIN ================= */
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value;

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    localStorage.setItem("accessToken", data.accessToken);

    alert("Login success!");
    console.log("TOKEN:", data.accessToken);

    // window.location.href = "/client/dashboard.html";
  } catch (err) {
    alert("Cannot connect to server");
    console.error(err);
  }
});
