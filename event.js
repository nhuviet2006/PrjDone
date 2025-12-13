// event.js

document.addEventListener('DOMContentLoaded', () => {
    // Lấy tất cả các nút chấm (1, 2, 3)
    const dots = document.querySelectorAll('.dot');
    // Lấy tất cả các slide (hero-section)
    const slides = document.querySelectorAll('.hero-section');

    // Hàm kích hoạt hiệu ứng chữ hiện lên lần lượt
    const runTextAnimation = (slideElement) => {
        // Lấy các thành phần text cần tạo hiệu ứng trong slide hiện tại
        const items = slideElement.querySelectorAll('.subtitle, .title, .date-location, .btn-buy-tickets');
        let delay = 300; 

        // 1. Reset trạng thái (để animation chạy lại)
        items.forEach(item => {
            item.classList.remove('show-text');
        });

        // 2. Chạy animation lần lượt sau một chút độ trễ
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show-text');
            }, delay * (index + 1));
        });
    };

    // Hàm chính để chuyển slide
    const showSlide = (targetId) => {
        // 1. Loại bỏ trạng thái 'active' cũ
        slides.forEach(slide => slide.classList.remove('active-slide'));
        dots.forEach(d => d.classList.remove('active'));

        // 2. Thêm trạng thái 'active' mới
        const targetSlide = document.getElementById(targetId);
        const targetDot = document.querySelector(`.dot[data-target="${targetId}"]`);
        
        if (targetSlide && targetDot) {
            targetSlide.classList.add('active-slide');
            targetDot.classList.add('active');
            
            // Kích hoạt animation text cho slide mới
            runTextAnimation(targetSlide); 
        }
    };

    // Xử lý sự kiện click (CHỈ CHẠY KHI ẤN VÀO SỐ 1, 2, 3)
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            showSlide(targetId);
        });
    });

    // Chạy animation khi trang vừa tải (cho slide mặc định ban đầu)
    const initialActiveDot = document.querySelector('.dot.active');
    if (initialActiveDot) {
        const initialSlideId = initialActiveDot.getAttribute('data-target');
        showSlide(initialSlideId);
    }

    // Lấy các phần tử cần thiết
    const searchIcon = document.querySelector('.search-icon');
    const searchBar = document.getElementById('search-bar');

    // Thêm sự kiện click cho icon kính lúp
    searchIcon.addEventListener('click', function() {
        // Toggle (chuyển đổi) class 'active' cho thanh tìm kiếm
        searchBar.classList.toggle('active');
    });

});