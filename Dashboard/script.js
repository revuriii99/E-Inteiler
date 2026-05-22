// Mengambil semua elemen tombol navigasi bawah
const navItems = document.querySelectorAll('.nav-item');

// Menambahkan fungsi klik pada setiap tombol di navigasi bawah
navItems.forEach(item => {
    item.addEventListener('click', function() {
        // Hapus kelas 'active' dari tombol yang saat ini aktif
        document.querySelector('.nav-item.active').classList.remove('active');
        
        // Tambahkan kelas 'active' ke tombol yang baru saja diklik
        this.classList.add('active');
    });
});

// Mengambil elemen tombol "Tambah Tugas Baru"
const btnAddTask = document.getElementById('btnAddTask');

// Menangani klik pada tombol Tambah Tugas
btnAddTask.addEventListener('click', function() {
    alert('Tombol "Tambah Tugas Baru" berhasil merespon dari file script.js!');
});