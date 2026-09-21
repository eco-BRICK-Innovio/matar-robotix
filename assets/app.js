const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));document.getElementById('year').textContent=new Date().getFullYear();document.getElementById('contactForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const body=`שם: ${f.get('name')}
טלפון: ${f.get('phone')}
אימייל: ${f.get('email')}
תחום: ${f.get('interest')}

${f.get('message')||''}`;location.href=`mailto:office@matar-robotix.co.il?subject=${encodeURIComponent('פנייה חדשה מאתר מטר רובוטיקס')}&body=${encodeURIComponent(body)}`;});