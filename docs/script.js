(function(){
  const search = document.getElementById('search');
  const list = document.getElementById('doc-list');
  const empty = document.querySelector('.empty-state');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  function normalize(s){ return (s || '').toLowerCase().trim(); }

  function applyFilter(){
    const q = normalize(search?.value);
    let visible = 0;
    list.querySelectorAll('.doc').forEach(li => {
      const title = normalize(li.dataset.title || li.querySelector('.doc-title')?.textContent);
      const match = !q || title.includes(q);
      li.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    if (empty) empty.hidden = visible !== 0;
  }

  if (search){
    search.addEventListener('input', applyFilter);
  }
  applyFilter();

  // Copy direct link buttons
  list.addEventListener('click', async (e) => {
    const btn = e.target.closest('.copy-link');
    if (!btn) return;
    const link = new URL(btn.dataset.link, window.location.href).toString();
    try{
      await navigator.clipboard.writeText(link);
      btn.textContent = 'Copied';
      setTimeout(()=>btn.textContent='Copy link', 1200);
    }catch{
      // Fallback: open prompt
      window.prompt('Copy this link:', link);
    }
  });
})();
