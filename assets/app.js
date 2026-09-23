const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();

const form=document.getElementById('contactForm');
const statusEl=document.getElementById('formStatus');

form?.addEventListener('submit',async e=>{
  e.preventDefault();
  const button=form.querySelector('button[type="submit"]');
  statusEl.textContent='שולח את הפנייה...';
  statusEl.className='form-status sending';
  button.disabled=true;
  button.setAttribute('aria-busy','true');

  try{
    const response=await fetch(form.action,{
      method:'POST',
      body:new FormData(form),
      headers:{'Accept':'application/json'}
    });

    if(response.ok){
      form.reset();
      statusEl.textContent='תודה! הפנייה נשלחה בהצלחה. נחזור אליכם בהקדם.';
      statusEl.className='form-status success';
    }else{
      const data=await response.json().catch(()=>({}));
      const message=data?.errors?.map(err=>err.message).join(' ')||'אירעה שגיאה בשליחת הפנייה. נסו שוב בעוד רגע.';
      statusEl.textContent=message;
      statusEl.className='form-status error';
    }
  }catch(err){
    statusEl.textContent='לא הצלחנו לשלוח את הפנייה כרגע. בדקו את החיבור ונסו שוב.';
    statusEl.className='form-status error';
  }finally{
    button.disabled=false;
    button.removeAttribute('aria-busy');
  }
});