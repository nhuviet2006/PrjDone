const API_URL = "/api";
const container = document.querySelector('.container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signupForm = document.getElementById('signupForm');

// Xử lý chuyển đổi qua lại giữa Login/Signup
if(registerBtn && loginBtn){
    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });
    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });
}

/* HÀM HIỂN THỊ THÔNG BÁO (TOAST) */
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        const newContainer = document.createElement('div');
        newContainer.id = 'toast-container';
        newContainer.style.cssText = "position: fixed; top: 20px; right: 20px; z-index: 1000;";
        document.body.appendChild(newContainer);
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
        background: #1a1a1a; 
        color: #fff; 
        padding: 15px 20px; 
        border-left: 5px solid ${type === 'error' ? '#ff3333' : '#00ff88'}; 
        margin-bottom: 10px; 
        border-radius: 4px; 
        box-shadow: 0 5px 15px rgba(0,0,0,0.5); 
        min-width: 250px;
    `;
    toast.innerText = message;
    
    document.getElementById('toast-container').appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

/*XỬ LÝ ĐĂNG NHẬP (REAL MODE)  */
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        console.log("Đã bắt được sự kiện click Login!"); // [DEBUG 1]

        const emailInp = document.getElementById('loginEmail');
        const passInp = document.getElementById('loginPass');

        const email = emailInp.value;
        const password = passInp.value;

        // Kiểm tra dữ liệu đầu vào
        if (!email || !password) {
            showToast("Vui lòng nhập đủ email và mật khẩu", "error");
            return;
        }

        try {            
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log("Server phản hồi:", data); 

            if (response.ok) { // Status 200-299
                showToast("Đăng nhập thành công!", "success");
                
                // Lưu Token
                localStorage.setItem("accessToken", data.accessToken);
                if (data.user && data.user.role) {
                    localStorage.setItem("role", data.user.role); 
                }
                localStorage.setItem("user", JSON.stringify(data.user));
                setTimeout(() => {
                    window.location.href = "event.html";
                }, 1000);
            } else {
                showToast(data.message || "Đăng nhập thất bại!", "error");
            }

        } catch (err) {
            console.error("Lỗi kết nối:", err); 
            showToast("Không kết nối được với Server! Hãy kiểm tra Server.", "error");
        }
    });
} else {
    console.error("Lỗi: Không tìm thấy form có ID 'loginForm' trong HTML");
}

/*  XỬ LÝ ĐĂNG KÝ  */
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Đã bắt sự kiện click Đăng ký!");

        const nameInp = document.getElementById('signupName');
        const emailInp = document.getElementById('signupEmail');
        const passInp = document.getElementById('signupPass');
        const confirmPassInp = document.getElementById('signupConfirmPass');

        const fullName = nameInp.value;
        const email = emailInp.value;
        const password = passInp.value;
        const confirmPass = confirmPassInp.value;

        // 1. Kiểm tra mật khẩu nhập lại
        if (password !== confirmPass) {
            showToast("Mật khẩu nhập lại không khớp!", "error");
            return;
        }

        try {            
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, email, password })
            });

            const data = await response.json();
            console.log("Server phản hồi:", data);

            if (response.status === 201 || response.ok) {
                showToast("Đăng ký thành công! Hãy đăng nhập.", "success");
                
                // Xóa dữ liệu trên form
                signupForm.reset();
                
                // Chuyển sang màn hình Login sau 1.5s
                setTimeout(() => {
                    const container = document.querySelector('.container');
                    container.classList.remove("active");
                }, 1500);

            } else {
                showToast(data.message || "Đăng ký thất bại (Email đã tồn tại?)", "error");
            }
        } catch (err) {
            console.error("Lỗi:", err);
            showToast("Lỗi kết nối server!", "error");
        }
    });
} else {
    console.error("Lỗi: Không tìm thấy form có ID 'signupForm' trong HTML");
}