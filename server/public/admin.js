const API_URL = "api";
// --- (Thông báo nhỏ góc phải)  ---
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end', 
    showConfirmButton: false,
    timer: 3000, 
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

function showSuccess(message) {
    Toast.fire({ icon: 'success', title: message });
}

function showError(message) {
    Toast.fire({ icon: 'error', title: message });
}
// Cấu hình Quill Editor
var quill = new Quill('#editor-container', {
    theme: 'snow',
    modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image'],
            [{ 'color': [] }, { 'background': [] }]
        ]
    }
});


// Chuyển Tab
function switchTab(tabId) {
    document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    
    // Highlight menu
    const index = tabId === 'add-tab' ? 0 : tabId === 'list-tab' ? 1 : 2;
    document.querySelectorAll('.menu-item')[index].classList.add('active');

    if(tabId === 'list-tab') loadMyEvents();
}

// Preview Ảnh khi chọn file từ máy 
function previewFile() {
    const fileInput = document.getElementById('eventImageFile');
    const preview = document.getElementById('previewImg');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';
        preview.src = "";
    }
}

// 1. XỬ LÝ THÊM SỰ KIỆN (ĐÃ UPDATE FORMDATA)
document.getElementById('addEventForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();

    // Lấy dữ liệu Text
    formData.append("title", document.getElementById('evTitle').value);
    formData.append("speaker", document.getElementById('evSpeaker').value);
    formData.append("date", document.getElementById('evDate').value);
    formData.append("month", document.getElementById('evMonth').value);
    formData.append("time", document.getElementById('evTime').value);
    formData.append("location", document.getElementById('evLocation').value);
    formData.append("totalTickets", document.getElementById('evTotalTickets').value);
    formData.append("price", document.getElementById('evPrice').value);
    formData.append("description", quill.root.innerHTML); 

    // Lấy File Ảnh
    const fileInput = document.getElementById('eventImageFile');
    if (fileInput.files.length > 0) {
        formData.append("image", fileInput.files[0]);
    }

    try {
        const res = await fetch(`${API_URL}/events/create-event`, { 
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        const result = await res.json();

        if(res.ok) {
            showSuccess("Thêm sự kiện thành công!");
            document.getElementById('addEventForm').reset();
            quill.setContents([]); // Xóa trắng editor
            document.getElementById('previewImg').style.display = 'none';
        } else {
            showSuccess("Lỗi: " + (result.message || "Không thể thêm sự kiện"));
        }
    } catch (err) { 
        console.error(err); 
        showError("Lỗi kết nối Server");
    }
});

// 2. TẢI DANH SÁCH SỰ KIỆN
async function loadMyEvents() {
    const token = localStorage.getItem("accessToken");
    const container = document.getElementById('myEventList');
    container.innerHTML = "Đang tải...";

    try {
        const res = await fetch(`${API_URL}/events/my-events` , { 
            headers: { 
                "Authorization": `Bearer ${token}` 
            }
        });
        if (!res.ok) throw new Error("Lỗi tải data");
        const events = await res.json();

        container.innerHTML = "";
        if(!events || events.length === 0) {
            container.innerHTML = "<p>Bạn chưa thêm sự kiện nào.</p>";
            return;
        }

        events.forEach(ev => {
            container.innerHTML += `
                <div class="event-item">
                    <div>
                        <strong>${ev.title}</strong><br>
                        <small>${ev.date} ${ev.month} | ${ev.time}</small>
                    </div>
                    <button class="btn-delete" onclick="deleteEvent(${ev.id})">
                        <i class="fa-solid fa-trash"></i> Xóa
                    </button>
                </div>
            `;
        });
    } catch (err) { console.error(err); container.innerHTML = "Lỗi tải danh sách"; }
}

// 3. XÓA SỰ KIỆN
function deleteEvent(id) {
    Swal.fire({
        title: 'Bạn chắc chắn chứ?',
        text: "Hành động này không thể hoàn tác!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33', 
        cancelButtonColor: '#3085d6', 
        confirmButtonText: 'Vâng, xóa đi!',
        cancelButtonText: 'Hủy'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const token = localStorage.getItem("accessToken");
            try {
                const res = await fetch(`${API_URL}/events/${id}` , { 
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if(res.ok) {
                    Swal.fire(
                        'Đã xóa!',
                        'Sự kiện đã bị xóa khỏi hệ thống.',
                        'success'
                    );
                    loadMyEvents(); 
                } else {
                    showError("Lỗi khi xóa sự kiện");
                }
            } catch(err) { 
                console.error(err);
                showError("Lỗi kết nối khi xóa");
            }
        }
    });
}

// 4. CẤP QUYỀN ADMIN
async function grantAdmin() {
    const email = document.getElementById('adminEmail').value;
    const token = localStorage.getItem("accessToken");

    if(!email) return showError("Vui lòng nhập email");

    try {
        const res = await fetch(`${API_URL}/admin/grant-admin`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        
        if(res.ok){
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: data.message,
                confirmButtonText: 'Tuyệt vời'
            });
            document.getElementById('adminEmail').value = "";
        } else {
            showError(data.message || "Lỗi cấp quyền");
        }
    } catch(err) { showError("Lỗi kết nối"); }
}