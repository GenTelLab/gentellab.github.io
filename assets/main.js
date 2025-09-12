document.addEventListener('DOMContentLoaded',()=>{
  const navToggle=document.querySelector('.nav-toggle');
  const siteNav=document.getElementById('site-nav');
  const backToTop=document.getElementById('backToTop');

  // 移动端菜单
  if(navToggle&&siteNav){
    navToggle.addEventListener('click',()=>{
      const expanded=navToggle.getAttribute('aria-expanded')==='true';
      navToggle.setAttribute('aria-expanded',String(!expanded));
      siteNav.classList.toggle('open');
    });
    siteNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
    }));
  }

  // 回到顶部按钮
  const onScroll=()=>{
    if(window.scrollY>320){
      backToTop.style.display='block';
    }else{
      backToTop.style.display='none';
    }
  };
  window.addEventListener('scroll',onScroll,{passive:true});
  backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  // 表单简单校验（示例）
  const form=document.querySelector('.contact-form');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const data=new FormData(form);
      const name=(data.get('name')||'').toString().trim();
      const email=(data.get('email')||'').toString().trim();
      const message=(data.get('message')||'').toString().trim();
      if(!name||!email||!message){
        alert('请完整填写信息');
        return;
      }
      alert('已收到您的信息，我们将尽快联系您！');
      form.reset();
    });
  }

  // 当前页导航高亮
  const currentPath=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.site-nav a').forEach(a=>{
    if(a.getAttribute('href')===currentPath){
      a.setAttribute('aria-current','page');
      a.style.fontWeight='700';
    }
  });

  // 轮播
  document.querySelectorAll('.carousel').forEach(carousel=>{
    const track=carousel.querySelector('.carousel-track');
    const slides=[...carousel.querySelectorAll('.carousel-slide')];
    const dots=[...carousel.querySelectorAll('.carousel-dot')];
    const prev=carousel.querySelector('.carousel-arrow.prev');
    const next=carousel.querySelector('.carousel-arrow.next');
    let index=0; let timer;
    const go=i=>{
      index=(i+slides.length)%slides.length;
      track.style.transform=`translateX(-${index*100}%)`;
      dots.forEach((d,k)=>d.classList.toggle('active',k===index));
    };
    const start=()=>{timer=setInterval(()=>go(index+1),5000)};
    const stop=()=>{if(timer) clearInterval(timer)};
    dots.forEach((d,i)=>d.addEventListener('click',()=>{stop();go(i);start();}));
    prev&&prev.addEventListener('click',()=>{stop();go(index-1);start();});
    next&&next.addEventListener('click',()=>{stop();go(index+1);start();});
    go(0); start();
    carousel.addEventListener('mouseenter',stop);
    carousel.addEventListener('mouseleave',start);
  });

  // 背景轮播（首页 hero）
  const hero=document.querySelector('.hero-slideshow');
  if(hero){
    const slides=[...hero.querySelectorAll('.hero-slide')];
    const dots=[...hero.querySelectorAll('.hero-dot')];
    let index=0; let timer;
    const show=i=>{
      index=(i+slides.length)%slides.length;
      slides.forEach((s,k)=>s.classList.toggle('active',k===index));
      dots.forEach((d,k)=>d.classList.toggle('active',k===index));
    };
    const start=()=>{timer=setInterval(()=>show(index+1),6000)};
    const stop=()=>{if(timer) clearInterval(timer)};
    dots.forEach((d,i)=>d.addEventListener('click',()=>{stop();show(i);start();}));
    show(0); start();
    hero.addEventListener('mouseenter',stop);
    hero.addEventListener('mouseleave',start);
  }

  // 选项卡
  document.querySelectorAll('.tabs').forEach(tabs=>{
    const buttons=[...tabs.querySelectorAll('.tab-list button')];
    const panels=[...tabs.querySelectorAll('.tab-panel')];
    const activate=i=>{
      buttons.forEach((b,k)=>{b.setAttribute('aria-selected',String(k===i));});
      panels.forEach((p,k)=>{p.classList.toggle('active',k===i)});
    };
    buttons.forEach((b,i)=>b.addEventListener('click',()=>activate(i)));
    activate(0);
  });

  // 手风琴
  document.querySelectorAll('.accordion .accordion-header').forEach((btn)=>{
    btn.addEventListener('click',()=>{
      const item=btn.closest('.accordion-item');
      item.classList.toggle('open');
    });
  });
});


