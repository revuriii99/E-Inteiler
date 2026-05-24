const btnEdit = document.getElementById('btn-edit');
if (btnEdit) {
  btnEdit.addEventListener('click', function() {
    window.location.href = 'layarDua.html';
  });
}

const btnBack = document.getElementById('btn-back');
if (btnBack) {
  btnBack.addEventListener('click', function() {
    window.location.href = 'layarSatu.html';
  });
}

const navItems = document.querySelectorAll('#bottom-nav div');
navItems.forEach(function(item) {
  item.addEventListener('click', function() {
    navItems.forEach(function(el) {
      el.classList.remove('active');
    });
    this.classList.add('active');
  });
});

//lupa namain commit javascript tadi hehe

