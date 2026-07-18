document.addEventListener('DOMContentLoaded', function () {
    
    // ==========================================
    // 1. FITUR DRAG & DROP BOX UPLOAD DIAGNOSA
    // ==========================================
    const dropzone = document.querySelector('.dropzone-area') || document.querySelector('.upload-box');
    const fileInput = document.querySelector('input[type="file"]');

    if (dropzone && fileInput) {
        // Jika kotak dropzone diklik, picu input file tersembunyi
        dropzone.addEventListener('click', () => fileInput.click());

        // Efek saat file diseret di atas kotak
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('drag-over');
            dropzone.style.borderColor = '#16a34a';
            dropzone.style.background = '#f0fdf4';
        });

        // Efek saat file batal diseret keluar dari kotak
        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, () => {
                dropzone.classList.remove('drag-over');
                dropzone.style.borderColor = '#cbd5e1';
                dropzone.style.background = '#ffffff';
            });
        });

        // Ketika file dilepaskan di dalam kotak
        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                handleFilePreview(fileInput.files[0]);
            }
        });

        // Ketika memilih file lewat tombol jelajah biasa
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                handleFilePreview(fileInput.files[0]);
            }
        });
    }

    // Fungsi pembantu untuk menampilkan nama file/submit form otomatis setelah upload
    function handleFilePreview(file) {
        const textPrompt = document.querySelector('.dropzone-area p') || document.querySelector('.upload-box p');
        if (textPrompt) {
            textPrompt.innerHTML = `File terpilih: <strong style="color: #16a34a;">${file.name}</strong><br><span style="font-size:12px; color:#64748b;">Klik tombol diagnosa untuk memproses</span>`;
        }
        
        // Opsional: Jika ingin form otomatis submit setelah gambar dimasukkan, aktifkan baris di bawah ini:
        // document.querySelector('form').submit();
    }

    // ==========================================
    // 2. SMOOTH SCROLL UNTUK NAVIGASI NAVBAR
    // ==========================================
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset ukuran tinggi navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 3. HAMBURGER MENU UNTUK NAVBAR MOBILE
    // ==========================================
    const navToggle = document.getElementById('navToggle');
    const navMenu   = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        const setMenuState = (isOpen) => {
            navMenu.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        };

        // Buka/tutup menu saat tombol hamburger diklik
        navToggle.addEventListener('click', () => {
            setMenuState(!navMenu.classList.contains('active'));
        });

        // Tutup menu otomatis setelah salah satu link diklik (khusus mobile)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setMenuState(false));
        });

        // Tutup menu kalau layar di-resize kembali ke ukuran desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) setMenuState(false);
        });
    }

});