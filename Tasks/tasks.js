<script>
      // ── Jam real-time ──
      function updateClock() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, "0");
        const m = String(now.getMinutes()).padStart(2, "0");
        document.getElementById("clock").textContent = h + ":" + m;
      }
      updateClock();
      setInterval(updateClock, 1000);

      // ── Filter buttons (Semua / Hari Ini / Selesai) ──
      const filterBtns = document.querySelectorAll('.filter-btn');
      const panels = document.querySelectorAll('.view-panel');

      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => {
            b.classList.remove('is-active');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('is-active');
          btn.setAttribute('aria-pressed', 'true');

          const target = btn.dataset.filter;
          panels.forEach(p => {
            const match = p.dataset.panel === target;
            p.classList.toggle('is-active', match);
            p.setAttribute('aria-hidden', String(!match));
          });
        });
      });

      // ── Bottom nav buttons — hanya ubah active icon, TIDAK ubah panel ──
      const navBtns = document.querySelectorAll('.bottom-nav .nav-link--button');

      navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          navBtns.forEach(b => {
            b.classList.remove('is-active');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('is-active');
          btn.setAttribute('aria-pressed', 'true');
        });
      });
    </script>