// ================== GLOBAL CONFIG ==================
const API_URL = "/api/events";
// ================== HÀM THÔNG BÁO TOAST (THAY THẾ ALERT) ==================
function showToast(message, type = 'success') {
    // 1. Tạo container nếu chưa có
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    // 2. Chọn icon dựa trên loại thông báo
    let iconClass = 'fa-circle-check'; // Mặc định là dấu tích
    if (type === 'error') iconClass = 'fa-circle-exclamation';
    if (type === 'info') iconClass = 'fa-circle-info';

    // 3. Tạo HTML cho thông báo
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fa-solid ${iconClass}"></i>
        <div class="toast-message">${message}</div>
    `;

    // 4. Thêm vào màn hình và tự xóa sau 4 giây
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 4000); // Thời gian khớp với animation CSS
}

window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add("show");
    } else {
        console.error("Không tìm thấy modal:", modalId);
    }
}

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("show");
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove("show");
    }
}

async function loadEventsFromDB() {
    const container = document.getElementById('event-schedule');
    if (!container) return;

    try {
        const res = await fetch(API_URL);
        const events = await res.json();
        
        container.innerHTML = ""; 

        if (!events || events.length === 0) {
            container.innerHTML = "<tr><td colspan='5' style='text-align:center; padding: 30px;'>Chưa có sự kiện nào.</td></tr>";
            return;
        }

        const recentEvents = events.slice(0, 5); 

        container.innerHTML = recentEvents.map(ev => renderEventRow(ev)).join('');

    } catch (err) {
        console.error("Lỗi tải sự kiện:", err);
        container.innerHTML = "<tr><td colspan='5' style='text-align:center; color:red;'>Lỗi kết nối server!</td></tr>";
    }
}

function renderEventRow(ev) {
    const eventString = encodeURIComponent(JSON.stringify(ev));
    const imgSrc = ev.image || 'https://via.placeholder.com/150x150?text=No+Image';

    return `
        <tr>
            <td class="poster-cell">
                <div class="schedule-poster-wrapper">
                    <img src="${imgSrc}" class="schedule-poster">
                </div>
            </td>
            <td class="event-info">
                <strong class="schedule-title">${ev.title}</strong>
                <div class="schedule-datetime">
                    <i class="fa-regular fa-calendar-days"></i>
                    <span>${ev.date || 'TBA'}/${ev.month || 'TBA'}</span>
                    <span style="margin: 0 5px;">|</span>
                    <i class="fa-regular fa-clock"></i>
                    <span>${ev.time || 'TBA'}</span>
                </div>
            </td>
            <td>
                <div class="location"><i class="fa-solid fa-map-pin"></i> ${ev.location}</div>
            </td>
            <td>
                <div class="price">${ev.price ? Number(ev.price).toLocaleString() + 'đ' : 'Miễn phí'}</div>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="showEventDetails('${eventString}')" class="btn-details">
                    <i class="fa-solid fa-circle-info"></i> Chi tiết
                </a>
                <a href="javascript:void(0)" onclick="openRegisterModal('${ev.title}', ${ev.id})" class="btn-register">
                    ĐĂNG KÝ
                </a>
            </td>
        </tr>
    `;
}
window.openAllEventsModal = async function() {
    window.openModal('allEventsModal');
    const container = document.getElementById('allEventsListBody');
    container.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:20px;">Đang tải dữ liệu...</td></tr>`;

    try {
        const res = await fetch(API_URL); 
        const events = await res.json();

        if (!events || events.length === 0) {
            container.innerHTML = `<tr><td colspan="5" style="text-align:center;">Không có dữ liệu.</td></tr>`;
            return;
        }

        container.innerHTML = events.map(ev => renderEventRow(ev)).join('');

    } catch (err) {
        console.error(err);
        container.innerHTML = `<tr><td colspan="5" style="text-align:center; color:red;">Lỗi kết nối!</td></tr>`;
    }
}

window.openRegisterModal = function(eventName, eventId) {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        if(confirm("Bạn cần đăng nhập để đăng ký. Đi tới trang đăng nhập?")) {
            window.location.href = "sl.html";
        }
        return;
    }

    document.getElementById("targetEventName").innerText = `Sự kiện: ${eventName}`;
    document.getElementById("regEventName").value = eventName;
    document.getElementById("regEventName").dataset.eventId = eventId;

    const userStr = localStorage.getItem("user");
    if (userStr) {
        const user = JSON.parse(userStr);
        if(document.getElementById("regFullName")) document.getElementById("regFullName").value = user.fullName || "";
        if(document.getElementById("regEmail")) document.getElementById("regEmail").value = user.email || "";
    }

    window.openModal('eventModal');
};

const regForm = document.getElementById("eventRegisterForm");
if (regForm) {
    regForm.addEventListener("submit", async (e) => {
        e.preventDefault(); 
        const token = localStorage.getItem("accessToken");
        const eventId = document.getElementById("regEventName").dataset.eventId; 

        if (!eventId) return showToast("Lỗi: Không tìm thấy ID sự kiện!");

        const formData = {
            ticketClass: document.getElementById("regTicketClass").value,
            fullName: document.getElementById("regFullName").value,
            phone: document.getElementById("regPhone").value,
            email: document.getElementById("regEmail").value,
            dob: document.getElementById("regDob").value,
            idCard: document.getElementById("regIdCard").value
        };

        try {
            const response = await fetch(`/api/events/${eventId}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                showToast("🎉 Chúc mừng! Đăng ký thành công, chúng tôi sẽ sớm liên hệ với bạn.");
                regForm.reset(); 
                window.closeModal('eventModal');
                
                const historyModal = document.getElementById("myTicketsModal");
                if (historyModal && historyModal.classList.contains("show")) {
                    openMyTicketsModal();
                }
            } else {
                showToast("Lỗi: " + (result.message || "Đăng ký thất bại"));
            }
        } catch (error) {
            console.error("Register Error:", error);
            showToast("Lỗi kết nối server!");
        }
    });
}

window.openMyTicketsModal = async function() {
    const token = localStorage.getItem("accessToken");
    if (!token) return showToast("Vui lòng đăng nhập!");

    window.openModal('myTicketsModal');
    const container = document.getElementById("ticketsListContainer");
    container.innerHTML = `<p style="text-align: center; padding: 20px;">Đang tải danh sách vé...</p>`;

    try {
        const res = await fetch("/api/events/my-tickets", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });

        const tickets = await res.json();

        if (!tickets || tickets.length === 0) {
            container.innerHTML = `<div style="text-align:center; padding:40px; color: #888;">
                                    <i class="fa-solid fa-ticket-simple" style="font-size: 40px; margin-bottom: 10px;"></i>
                                    <p>Bạn chưa mua vé nào.</p>
                                   </div>`;
            return;
        }

        container.innerHTML = tickets.map(t => {
            const ev = t.event;
            const purchasedDate = new Date(t.purchasedAt).toLocaleDateString('vi-VN');
            const imgSrc = ev.image || 'https://via.placeholder.com/80';
            
            return `
                <div style="display: flex; gap: 15px; background: #0a0a0a; padding: 15px; margin-bottom: 10px; border-radius: 8px; border: 1px solid #333;">
                    <img src="${imgSrc}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 5px;">
                    <div style="flex: 1;">
                        <h4 style="color: #ff3366; margin-bottom: 5px;">${ev.title}</h4>
                        <p style="font-size: 13px; color: #ccc; margin-bottom: 3px;"><i class="fa-solid fa-ticket"></i> ${t.ticketClass}</p>
                        <p style="font-size: 12px; color: #888;">Ngày mua: ${purchasedDate}</p>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 20px; font-size: 11px; font-weight: bold;">ĐÃ MUA</span>
                    </div>
                </div>
            `;
        }).join('');

    } catch (err) {
        console.error("Lỗi lấy vé:", err);
        container.innerHTML = `<p style="text-align: center; color: red;">Lỗi tải dữ liệu!</p>`;
    }
}

window.showEventDetails = function(eventStr) {
    const ev = JSON.parse(decodeURIComponent(eventStr));
    const imgSrc = ev.image || 'https://via.placeholder.com/600x300';

    const content = `
        <div class="modal-image-container">
            <img src="${imgSrc}" alt="${ev.title}">
        </div>
        <div class="modal-info-body">
            <h2 style="color: #ff3366; text-transform: uppercase; margin-bottom: 15px;">${ev.title}</h2>
            <p><strong><i class="fa-regular fa-clock"></i> Thời gian:</strong> ${ev.time}, ${ev.date}/${ev.month}</p>
            <p><strong><i class="fa-solid fa-map-pin"></i> Địa điểm:</strong> ${ev.location}</p>
            <p><strong><i class="fa-solid fa-money-bill"></i> Giá vé:</strong> ${ev.price ? Number(ev.price).toLocaleString() + 'đ' : 'Miễn phí'}</p>
            <hr style="border: 0; border-top: 1px solid #333; margin: 15px 0;">
            <div style="line-height: 1.6; color: #ccc;">
                ${ev.description || "Chưa có mô tả chi tiết."}
            </div>
        </div>
    `;
    
    document.getElementById("detailContent").innerHTML = content;
    window.openModal('detailModal');
};


function checkAuthStatus() {
    const authBox = document.getElementById('authBox');
    const token = localStorage.getItem("accessToken");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
        const user = JSON.parse(userStr);
        const isAdmin = user.role === 'ADMIN' || user.role === 'admin';
        const adminLink = isAdmin ? `<a href="admin.html" class="dropdown-item"><i class="fa-solid fa-user-shield"></i> Admin Panel</a>` : '';

        authBox.innerHTML = `
            <div class="user-profile">
                <span class="nav-user-name">${user.fullName}</span>
                <div class="avatar-circle"><i class="fa-solid fa-user"></i></div>
                <div class="dropdown-menu">
                    <div class="dropdown-header">
                        <div class="d-name">${user.fullName}</div>
                        <div class="d-email">${user.email}</div>
                    </div>
                    ${adminLink}
                    <a href="javascript:void(0)" class="dropdown-item" onclick="openMyTicketsModal()">
                        <i class="fa-solid fa-ticket"></i> Vé đã mua
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item" onclick="logout()"><i class="fa-solid fa-right-from-bracket"></i> Đăng xuất</a>
                </div>
            </div>`;
    } else {
        authBox.innerHTML = `<a href="sl.html" style="background: #ff3366; color: white; padding: 8px 20px; border-radius: 20px; font-weight: bold; font-size: 14px;">ĐĂNG NHẬP</a>`;
    }
}

window.logout = function() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
    loadEventsFromDB();
    loadSpeakers();
    checkAuthStatus();

    const dots = document.querySelectorAll(".dot");
    const slides = document.querySelectorAll(".hero-section");
    const showSlide = (id) => {
        slides.forEach(s => s.classList.remove("active-slide"));
        dots.forEach(d => d.classList.remove("active"));
        document.getElementById(id).classList.add("active-slide");
        document.querySelector(`.dot[data-target="${id}"]`).classList.add("active");
    };
    if (dots.length) dots.forEach(dot => dot.addEventListener("click", () => showSlide(dot.dataset.target)));
});
// XỬ LÝ FORM LIÊN HỆ QUẢNG CÁO 
const adsForm = document.getElementById("adsForm");
if (adsForm) {
    adsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Lấy dữ liệu (để sau này gửi API)
        const data = {
            name: document.getElementById("adsName").value,
            phone: document.getElementById("adsPhone").value,
            email: document.getElementById("adsEmail").value,
            company: document.getElementById("adsCompany").value,
            position: document.getElementById("adsPosition").value,
            note: document.getElementById("adsNote").value
        };

        console.log("Dữ liệu liên hệ quảng cáo:", data);

        // Giả lập gửi thành công
        showToast("✅ Cảm ơn bạn đã liên hệ! Chúng tôi đã nhận được thông tin và sẽ gọi lại cho bạn (SĐT: " + data.phone + ") sớm nhất.");
        
        adsForm.reset();
        window.closeModal('adsContactModal');
    });
}
