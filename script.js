(()=>{const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const els=document.querySelectorAll('.reveal');if(!reduced&&'IntersectionObserver'in window){const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}}),{threshold:.13});els.forEach(e=>obs.observe(e))}else els.forEach(e=>e.classList.add('in'));const route=document.querySelector('.route-line'),photo=document.querySelector('.hero-photo');if(!reduced){addEventListener('scroll',()=>{const y=scrollY;if(photo)photo.style.transform=`scale(1.03) translateY(${Math.min(y*.09,55)}px)`;if(route){const b=route.parentElement.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight-b.top)/(innerHeight+b.height*.35)));route.style.transform=`scaleX(${p})`}},{passive:true});document.querySelectorAll('[data-tilt]').forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(900px) rotateX(${-y*5}deg) rotateY(${x*6}deg) translateY(-5px)`});c.addEventListener('pointerleave',()=>c.style.transform='')});const dot=document.querySelector('.cursor-dot');addEventListener('pointermove',e=>{if(dot)dot.style.transform=`translate(${e.clientX-7}px,${e.clientY-7}px)`})}const menu=document.querySelector('.menu-toggle');menu?.addEventListener('click',()=>{const nav=document.querySelector('nav'),open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)})})();

// Published content from Sanity. If loading fails, the original HTML remains visible.
(()=>{
  const projectId='meb1vaxj';
  const dataset='production';
  const query=`*[_type == "sitePage"][0]{
    hero{eyebrow,titleLine1,titleLine2,text,image{alt,asset->{url}}},
    introduction{label,title,emphasis,text,noteTitle,noteText},
    workshop{label,title,text,services[]{_key,title,description,pricePrefix,price}},
    ride{label,title,text,date,distance,elevation},
    booking{label,title,text},
    contact{address,openingHours,email,phone}
  }`;
  const endpoint=`https://${projectId}.api.sanity.io/v2026-07-15/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  const setText=(selector,value)=>{
    const element=document.querySelector(selector);
    if(element&&value) element.textContent=value;
  };
  const setLines=(selector,value)=>{
    const element=document.querySelector(selector);
    if(!element||!value) return;
    element.replaceChildren();
    value.split('\n').forEach((line,index)=>{
      if(index) element.append(document.createElement('br'));
      element.append(document.createTextNode(line));
    });
  };
  const setHeading=(selector,main,emphasis)=>{
    const element=document.querySelector(selector);
    if(!element||!main) return;
    element.replaceChildren(document.createTextNode(main));
    if(emphasis){
      element.append(document.createElement('br'));
      const em=document.createElement('em');
      em.textContent=emphasis;
      element.append(em);
    }
  };

  fetch(endpoint)
    .then(response=>{
      if(!response.ok) throw new Error(`Sanity gaf status ${response.status}`);
      return response.json();
    })
    .then(({result:page})=>{
      if(!page) return;

      setText('.hero .eyebrow',page.hero?.eyebrow);
      setText('.hero-line',page.hero?.titleLine1);
      setText('.hero-line.line-two',page.hero?.titleLine2);
      setText('.hero-bottom > p',page.hero?.text);
      if(page.hero?.image?.asset?.url){
        const image=document.querySelector('.hero-photo');
        image.src=`${page.hero.image.asset.url}?auto=format&w=1800&q=85`;
        image.alt=page.hero.image.alt||'';
      }

      setText('#over .section-label',page.introduction?.label);
      setHeading('#over h2',page.introduction?.title,page.introduction?.emphasis);
      setText('#over .big-copy',page.introduction?.text);
      setText('#over .note-card strong',page.introduction?.noteTitle);
      setText('#over .note-card p',page.introduction?.noteText);

      setText('#werkplaats .section-label',page.workshop?.label);
      setText('#werkplaats h2',page.workshop?.title);
      setText('#werkplaats .services-head > p',page.workshop?.text);
      const cards=document.querySelectorAll('#werkplaats .service-card');
      page.workshop?.services?.slice(0,cards.length).forEach((service,index)=>{
        const card=cards[index];
        const title=card.querySelector('h3');
        const description=card.querySelector('p');
        const price=card.querySelector('.service-price');
        if(title&&service.title) title.textContent=service.title;
        if(description&&service.description) description.textContent=service.description;
        if(price&&service.price){
          const prefix=document.createElement('span');
          prefix.textContent=service.pricePrefix||'';
          price.replaceChildren(prefix,document.createTextNode(` ${service.price}`));
        }
      });

      setText('#ritten .section-label',page.ride?.label);
      setText('#ritten h2',page.ride?.title);
      setText('#ritten .rides-copy > h2 + p.reveal',page.ride?.text);
      const rideValues=document.querySelectorAll('#ritten .ride-meta strong');
      [page.ride?.date,page.ride?.distance,page.ride?.elevation].forEach((value,index)=>{
        if(rideValues[index]&&value) rideValues[index].textContent=value;
      });

      setText('#boeken .section-label',page.booking?.label);
      setText('#boeken h2',page.booking?.title);
      setText('#boeken .booking-copy > p:last-child',page.booking?.text);

      const footerColumns=document.querySelectorAll('footer .footer-grid > div');
      setLines('footer .footer-grid > div:nth-child(1) p',page.contact?.address);
      setLines('footer .footer-grid > div:nth-child(2) p',page.contact?.openingHours);
      const email=footerColumns[3]?.querySelector('a');
      if(email&&page.contact?.email){email.textContent=page.contact.email;email.href=`mailto:${page.contact.email}`;}
      const contactParagraph=footerColumns[3]?.querySelector('p');
      if(contactParagraph&&page.contact?.phone){
        const br=contactParagraph.querySelector('br');
        if(br){while(br.nextSibling) br.nextSibling.remove();br.after(document.createTextNode(page.contact.phone));}
      }
    })
    .catch(error=>console.warn('Sanity-inhoud kon niet worden geladen; de vaste inhoud blijft staan.',error));
})();
