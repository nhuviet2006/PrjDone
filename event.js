<<<<<<< HEAD
// ========== Global Data ==========
const appData = {
    // Event Information
    event: {
        name: "Tech Innovators Conference 2025",
        date: "2025-12-15T09:00:00",
        location: "San Francisco, CA",
        description: {
            part1: "Join us for the most anticipated tech conference of the year, featuring cutting-edge innovations, industry leaders, and networking opportunities.",
            part2: "Experience three days of insightful talks, hands-on workshops, and valuable connections with professionals from around the globe."
        }
    },
    
    // Hero Slider Data
    slides: [
        {
            title: "Prepare yourself for the",
            mainText: "Conference",
            date: "15-17 December 2025 - San Francisco, CA",
            align: "left"
        },
        {
            title: "Join the biggest",
            mainText: "Tech Event",
            date: "15-17 December 2025 - San Francisco, CA",
            align: "center"
        },
        {
            title: "Network with industry",
            mainText: "Leaders",
            date: "15-17 December 2025 - San Francisco, CA",
            align: "center"
        }
    ],
    
    // Info Boxes
    infoBoxes: [
        {
            icon: "fas fa-calendar-alt",
            title: "DATE",
            content: "15-17 December 2025"
        },
        {
            icon: "fas fa-map-marker-alt",
            title: "LOCATION",
            content: "San Francisco, CA"
        },
        {
            icon: "fas fa-users",
            title: "SPEAKERS",
            content: "12 Industry Experts"
        },
        {
            icon: "fas fa-ticket-alt",
            title: "TICKETS",
            content: "From $99"
        }
    ],
    
    // Event Features
    features: [
        {
            icon: "fas fa-microphone",
            title: "12 Speakers",
            description: "Learn from industry leaders and innovators sharing their insights and experiences.",
            link: "#speakers"
        },
        {
            icon: "fas fa-rocket",
            title: "24 Sessions",
            description: "Engage in comprehensive sessions covering the latest trends and technologies.",
            link: "#events"
        },
        {
            icon: "fas fa-broadcast-tower",
            title: "Live Broadcast",
            description: "Can't attend in person? Join us live online from anywhere in the world.",
            link: "#live"
        },
        {
            icon: "fas fa-clock",
            title: "Early Bird Offers",
            description: "Special discounted rates available for early registrations. Limited time offer!",
            link: "#pricing"
        }
    ],
    
    // Speakers Data
    speakers: [
        {
            id: 1,
            name: "Sarah Johnson",
            position: "CTO at TechVision",
            image: "https://i.pinimg.com/1200x/1e/cb/a9/1ecba98ac8bfd242436a87fb0996f14d.jpg",
            bio: "AI and Machine Learning Expert"
        },
        {
            id: 2,
            name: "Michael Chen",
            position: "Lead Developer at InnovateCo",
            image: "https://i.pinimg.com/736x/8a/ae/c3/8aaec3c92019e854e93fffb30fa5193a.jpg",
            bio: "Blockchain & Web3 Specialist"
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            position: "Product Director at FutureLabs",
            image: "https://i.pinimg.com/736x/b3/e7/67/b3e7678fbc9a8f949f69979d0b5b65ee.jpg",
            bio: "UX/UI Design Innovator"
        },
        {
            id: 4,
            name: "David Park",
            position: "CEO at QuantumLeap",
            image: "https://i.pinimg.com/1200x/0e/c7/cb/0ec7cbc9e263c5e10d8ba4cdd0d3e0af.jpg",
            bio: "Quantum Computing Pioneer"
        },
    
    ],
    
    // Pricing Data
    pricing: [
        {
            name: "Basic",
            price: "$99",
            period: "per ticket",
            features: [
                "Access to all conference sessions",
                "Conference materials",
                "Lunch & coffee breaks",
                "Networking opportunities"
            ],
            featured: false
        },
        {
            name: "Premium",
            price: "$199",
            period: "per ticket",
            features: [
                "All Basic features",
                "VIP seating",
                "Speaker dinner access",
                "Conference merchandise",
                "Priority networking"
            ],
            featured: true
        },
        {
            name: "Enterprise",
            price: "$499",
            period: "per ticket",
            features: [
                "All Premium features",
                "Private mentoring sessions",
                "Exclusive workshop access",
                "Year-round community access",
                "Dedicated support"
            ],
            featured: false
        }
    ],
    
    // Calendar Events
    calendarEvents: [
        {
            date: "15",
            month: "December",
            title: "Opening Keynote",
            time: "09:00 AM - 10:30 AM",
            speaker: "Sarah Johnson",
            image: "assets/img/calendar/c1.png"
        },
        {
            date: "16",
            month: "December",
            title: "Tech Workshops",
            time: "10:00 AM - 04:00 PM",
            speaker: "Michael Chen & Team",
            image: "assets/img/calendar/c2.png"
        },
        {
            date: "17",
            month: "December",
            title: "Closing Ceremony",
            time: "03:00 PM - 05:00 PM",
            speaker: "All Speakers",
            image: "assets/img/calendar/c3.png"
        }
    ],
    
    // Social Links
    socialLinks: [
        { icon: "fab fa-twitter", url: "#" },
        { icon: "fab fa-facebook-f", url: "#" },
        { icon: "fab fa-linkedin-in", url: "#" },
        { icon: "fab fa-instagram", url: "#" },
        { icon: "fab fa-youtube", url: "#" }
    ],
    
    // Footer Menu
    footerMenu: [
        { text: "Home", url: "#home" },
        { text: "Speakers", url: "#speakers" },
        { text: "Events", url: "#events" },
        { text: "News", url: "#news" },
        { text: "Contact", url: "#contact" }
    ]
};

// ========== DOM Elements ==========
const DOM = {
    loader: document.getElementById('loader'),
    heroSlider: document.getElementById('heroSlider'),
    sliderDots: document.getElementById('sliderDots'),
    infoBoxes: document.getElementById('infoBoxes'),
    eventCountdown: document.getElementById('eventCountdown'),
    aboutText1: document.getElementById('aboutText1'),
    aboutText2: document.getElementById('aboutText2'),
    eventFeatures: document.getElementById('eventFeatures'),
    speakersGrid: document.getElementById('speakersGrid'),
    pricingCards: document.getElementById('pricingCards'),
    eventCalendar: document.getElementById('eventCalendar'),
    ctaText: document.getElementById('ctaText'),
    buyTicketBtn: document.getElementById('buyTicketBtn'),
    footerAbout: document.getElementById('footerAbout'),
    socialLinks: document.getElementById('socialLinks'),
    instagramFeed: document.getElementById('instagramFeed'),
    newsletterEmail: document.getElementById('newsletterEmail'),
    subscribeBtn: document.getElementById('subscribeBtn'),
    subscriptionMessage: document.getElementById('subscriptionMessage'),
    copyrightText: document.getElementById('copyrightText'),
    currentYear: document.getElementById('currentYear'),
    footerMenu: document.getElementById('footerMenu'),
    searchToggle: document.getElementById('searchToggle'),
    searchBox: document.getElementById('searchBox'),
    logo: document.getElementById('logo')
};

// ========== Initialize Application ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initLoader();
    initHeroSlider();
    initInfoBoxes();
    initCountdown();
    initAboutSection();
    initFeatures();
    initSpeakers();
    initPricing();
    initCalendar();
    initCTASection();
    initFooter();
    initEventListeners();
    updateCurrentYear();
    
    // Hide loader after content loads
    setTimeout(() => {
        DOM.loader.style.display = 'none';
    }, 1000);
});

// ========== Loader ==========
function initLoader() {
    // Loader will hide automatically after page loads
}

// ========== Hero Slider ==========
function initHeroSlider() {
    // Create slides
    appData.slides.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'cover_item';
        slideDiv.style.background = "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('assets/img/bg/slider.png')";
        
        slideDiv.innerHTML = `
            <div class="slider_content">
                <div class="slider-content-inner">
                    <div class="container">
                        <div class="slider-content-${slide.align}">
                            <h2 class="cover-title">${slide.title}</h2>
                            <strong class="cover-xl-text">${slide.mainText}</strong>
                            <p class="cover-date">${slide.date}</p>
                            <a href="#pricing" class="btn btn-primary btn-rounded">Buy Tickets Now</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        DOM.heroSlider.appendChild(slideDiv);
        
        // Create dots
        const dot = document.createElement('li');
        dot.setAttribute('data-index', index);
        dot.innerHTML = '<span></span>';
        dot.addEventListener('click', () => goToSlide(index));
        DOM.sliderDots.appendChild(dot);
    });
    
    // Initialize Owl Carousel
    if (typeof jQuery !== 'undefined' && typeof $.fn.owlCarousel !== 'undefined') {
        $(DOM.heroSlider).owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            nav: true,
            dots: false,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn'
        });
        
        // Update active dot
        $(DOM.heroSlider).on('changed.owl.carousel', (event) => {
            const current = event.item.index - 1;
            const dots = DOM.sliderDots.querySelectorAll('li');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === current);
            });
        });
    }
}

function goToSlide(index) {
    if (typeof jQuery !== 'undefined' && typeof $.fn.owlCarousel !== 'undefined') {
        $(DOM.heroSlider).trigger('to.owl.carousel', [index, 300]);
    }
}

// ========== Info Boxes ==========
function initInfoBoxes() {
    appData.infoBoxes.forEach(info => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-3';
        
        col.innerHTML = `
            <div class="icon_box_two">
                <i class="${info.icon}"></i>
                <div class="content">
                    <h5 class="box_title">${info.title}</h5>
                    <p>${info.content}</p>
                </div>
            </div>
        `;
        
        DOM.infoBoxes.appendChild(col);
    });
}

// ========== Countdown Timer ==========
function initCountdown() {
    const eventDate = moment(appData.event.date);
    
    function updateCountdown() {
        const now = moment();
        const diff = moment.duration(eventDate.diff(now));
        
        if (diff.asSeconds() > 0) {
            DOM.eventCountdown.innerHTML = `
                <div>${Math.floor(diff.asWeeks())} <span>Weeks</span></div>
                <div>${Math.floor(diff.asDays()) % 7} <span>Days</span></div>
                <div>${diff.hours()} <span>Hours</span></div>
                <div>${diff.minutes()} <span>Minutes</span></div>
                <div>${diff.seconds()} <span>Seconds</span></div>
            `;
        } else {
            DOM.eventCountdown.innerHTML = '<div class="text-center">Event has started!</div>';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ========== About Section ==========
function initAboutSection() {
    DOM.aboutText1.textContent = appData.event.description.part1;
    DOM.aboutText2.textContent = appData.event.description.part2;
}

// ========== Features ==========
function initFeatures() {
    appData.features.forEach(feature => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-3';
        
        col.innerHTML = `
            <div class="icon_box_one">
                <i class="${feature.icon}"></i>
                <div class="content">
                    <h4>${feature.title}</h4>
                    <p>${feature.description}</p>
                    <a href="${feature.link}">read more</a>
                </div>
            </div>
        `;
        
        DOM.eventFeatures.appendChild(col);
    });
}

// ========== Speakers ==========
function initSpeakers() {
    appData.speakers.forEach(speaker => {
        const col = document.createElement('div');
        col.className = 'col-md-3 col-sm-6';
        
        col.innerHTML = `
            <div class="speaker_box">
                <div class="speaker_img">
                    <img src="${speaker.image}" alt="${speaker.name}" 
                         onerror="this.src='assets/img/speakers/default.png'">
                    <div class="info_box">
                        <h5 class="name">${speaker.name}</h5>
                        <p class="position">${speaker.position}</p>
                        <p class="bio">${speaker.bio}</p>
                    </div>
                </div>
            </div>
        `;
        
        col.addEventListener('click', () => showSpeakerModal(speaker));
        DOM.speakersGrid.appendChild(col);
    });
}

function showSpeakerModal(speaker) {
    const modalHTML = `
        <div class="modal fade" id="speakerModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${speaker.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${speaker.image}" alt="${speaker.name}" class="img-fluid rounded">
                            </div>
                            <div class="col-md-8">
                                <h6>${speaker.position}</h6>
                                <p><strong>Expertise:</strong> ${speaker.bio}</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('speakerModal');
    if (existingModal) existingModal.remove();
    
    // Add new modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('speakerModal'));
    modal.show();
}

// ========== Pricing ==========
function initPricing() {
    appData.pricing.forEach(plan => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        
        col.innerHTML = `
            <div class="pricing-card ${plan.featured ? 'featured' : ''}">
                <div class="pricing-header">
                    <h4>${plan.name}</h4>
                    <div class="price">${plan.price}</div>
                    <div class="period">${plan.period}</div>
                </div>
                <ul class="pricing-features">
                    ${plan.features.map(feature => `<li><i class="fas fa-check text-success me-2"></i>${feature}</li>`).join('')}
                </ul>
                <div class="pricing-footer p-4">
                    <button class="btn btn-primary btn-rounded w-100" onclick="selectPlan('${plan.name}')">
                        Select Plan
                    </button>
                </div>
            </div>
        `;
        
        DOM.pricingCards.appendChild(col);
    });
}

function selectPlan(planName) {
    alert(`You selected the ${planName} plan! Redirecting to checkout...`);
    // In a real app, you would redirect to checkout page
    window.location.href = `#checkout?plan=${encodeURIComponent(planName)}`;
}

// ========== Calendar ==========
function initCalendar() {
    const thead = DOM.eventCalendar.createTHead();
    const headerRow = thead.insertRow();
    const headerCell = headerRow.insertCell();
    headerCell.colSpan = 5;
    headerCell.innerHTML = `
        <i class="fas fa-calendar-alt"></i>
        <span>Event Schedule</span>
    `;
    headerCell.className = 'event_title';
    
    const tbody = DOM.eventCalendar.createTBody();
    
    appData.calendarEvents.forEach(event => {
        const row = tbody.insertRow();
        
        const cell1 = row.insertCell();
        cell1.innerHTML = `<img src="${event.image}" alt="${event.title}" class="img-fluid">`;
        
        const cell2 = row.insertCell();
        cell2.className = 'event_date';
        cell2.innerHTML = `
            ${event.date}
            <span>${event.month}</span>
        `;
        
        const cell3 = row.insertCell();
        cell3.innerHTML = `
            <div class="event_place">
                <h5>${event.title}</h5>
                <h6>${event.time}</h6>
                <p>Speaker: ${event.speaker}</p>
            </div>
        `;
        
        const cell4 = row.insertCell();
        cell4.innerHTML = '<a href="#" class="btn btn-primary btn-rounded">Details</a>';
        
        const cell5 = row.insertCell();
        cell5.className = 'buy_link';
        cell5.innerHTML = '<a href="#pricing">Register</a>';
    });
}

// ========== CTA Section ==========
function initCTASection() {
    DOM.ctaText.textContent = `Don't miss your chance to be part of ${appData.event.name}. Limited seats available!`;
    DOM.buyTicketBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#pricing').scrollIntoView({ behavior: 'smooth' });
    });
}

// ========== Footer ==========
function initFooter() {
    // Footer About
    DOM.footerAbout.textContent = `Welcome to ${appData.event.name} - Where innovation meets opportunity. Connect with like-minded professionals and expand your network.`;
    
    // Social Links
    appData.socialLinks.forEach(social => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${social.url}" target="_blank"><i class="${social.icon}"></i></a>`;
        DOM.socialLinks.appendChild(li);
    });
    
    // Instagram Feed
    const instagramImages = [
        'assets/img/calendar/c1.png',
        'assets/img/calendar/c2.png',
        'assets/img/calendar/c3.png',
        'assets/img/speakers/s1.png',
        'assets/img/speakers/s2.png',
        'assets/img/speakers/s3.png'
    ];
    
    instagramImages.forEach(img => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#"><img src="${img}" alt="Instagram" onerror="this.style.display='none'"></a>`;
        DOM.instagramFeed.appendChild(li);
    });
    
    // Footer Menu
    appData.footerMenu.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${item.url}">${item.text}</a>`;
        DOM.footerMenu.appendChild(li);
    });
    
    // Copyright
    DOM.copyrightText.innerHTML = `&copy; <span id="currentYear"></span> MeetHub. All rights reserved. | Made with <i class="fas fa-heart text-danger"></i> for the community`;
}

// ========== Event Listeners ==========
function initEventListeners() {
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Search Toggle
    if (DOM.searchToggle && DOM.searchBox) {
        DOM.searchToggle.addEventListener('click', (e) => {
            e.preventDefault();
            DOM.searchBox.classList.toggle('show');
        });
        
        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!DOM.searchToggle.contains(e.target) && !DOM.searchBox.contains(e.target)) {
                DOM.searchBox.classList.remove('show');
            }
        });
    }
    
    // Newsletter Subscription
    DOM.subscribeBtn.addEventListener('click', handleSubscription);
    DOM.newsletterEmail.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSubscription();
    });
    
    // Scroll Effect for Header
    window.addEventListener('scroll', handleScroll);
    
    // Logo Click - Scroll to Top
    if (DOM.logo) {
        DOM.logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function handleSubscription() {
    const email = DOM.newsletterEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showSubscriptionMessage('Please enter your email address.', 'danger');
        return;
    }
    
    if (!emailRegex.test(email)) {
        showSubscriptionMessage('Please enter a valid email address.', 'danger');
        return;
    }
    
    // Simulate API call
    DOM.subscribeBtn.disabled = true;
    DOM.subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    
    setTimeout(() => {
        showSubscriptionMessage('Thank you for subscribing to our newsletter!', 'success');
        DOM.newsletterEmail.value = '';
        DOM.subscribeBtn.disabled = false;
        DOM.subscribeBtn.innerHTML = 'SUBSCRIBE';
    }, 1500);
}

function showSubscriptionMessage(message, type) {
    DOM.subscriptionMessage.textContent = message;
    DOM.subscriptionMessage.className = `mt-2 text-${type}`;
    
    setTimeout(() => {
        DOM.subscriptionMessage.textContent = '';
        DOM.subscriptionMessage.className = 'mt-2';
    }, 5000);
}

function handleScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

function updateActiveNavLink(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// ========== Utility Functions ==========
function updateCurrentYear() {
    DOM.currentYear.textContent = new Date().getFullYear();
}

// ========== Error Handling ==========
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    // In production, you might want to log this to an error tracking service
});

// ========== Public Functions for Buttons ==========
window.selectPlan = selectPlan;

// ========== Initialize when DOM is ready ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    // Already handled in DOMContentLoaded event listener
}
// Làm header trong suốt ở đầu trang
function handleHeroHeader() {
    const header = document.querySelector('.header');
    if (window.scrollY < window.innerHeight - 100) {
        header.classList.add('transparent');
    } else {
        header.classList.remove('transparent');
    }
}

window.addEventListener('scroll', handleHeroHeader);
window.addEventListener('load', handleHeroHeader);

// Cập nhật background slider đúng ảnh concert (ảnh bạn chụp)
document.querySelectorAll('.cover_item').forEach(item => {
    item.style.backgroundImage = `
        linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.4)), 
        url('https://png.pngtree.com/thumb_back/fw800/background/20241018/pngtree-aluminum-stage-truss-image_16222505.jpg')
    `;
});
=======
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
>>>>>>> a460443823d60f452f5e173cc26f940ab229627a
