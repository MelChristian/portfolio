const mouseOver = () => {
  const nav = document.querySelector('.nav');
  const handleOver = function(e){
    if(e.target.classList.contains('nav-link')){
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav-link');
    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    })
  }
}
nav.addEventListener('mouseover',handleOver.bind(.5));
nav.addEventListener('mouseout',handleOver.bind(1));
}
mouseOver();
///////////////////////////////////

const navObserver = () => {
const header = document.querySelector('.header')
const about = document.querySelector('.home');
const headerHeight = header.getBoundingClientRect().height;
const stickyNav = function(entries){
   const [entry] = entries;
   if(!entry.isIntersecting){
     header.classList.add('fixed-top')
   }else{
     header.classList.remove('fixed-top')
   }
}
const headerObserver = new IntersectionObserver(stickyNav,{
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`
});
headerObserver.observe(about);
}
navObserver();

/////////////////////////

const navToggler = () => {
 const toggler = document.querySelector('.toggler');
 const navList = document.querySelector('.nav-list');
 const bgTogglerBtn = document.querySelector('.bg-toggler-btn');
 const body = document.querySelector('.body');

 const addHeaderActiveClass = () => {
  toggler.classList.toggle('active');
  navList.classList.toggle('active');
};
 const addHeaderActiveClassToToggle = () => {
  bgTogglerBtn.classList.toggle('active');
  body.classList.toggle('active');
};

toggler.addEventListener('click', addHeaderActiveClass);
bgTogglerBtn.addEventListener('click', addHeaderActiveClassToToggle);
};
navToggler();

/////////////////
const sectionObserver = () => {
const allSection = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-item a');
const sectionCallback = (entries, observer) => {
  const [entry] = entries;
  if(entry.isIntersecting){
     navLinks.forEach(links => {
       links.classList.remove('active');
       links.style.opacity = .5;
      if(entry.target.id === links.dataset.link){
       links.classList.add('active');
       links.style.opacity = 1;
      }
     })
  }
}
const sectionObserver = new IntersectionObserver(sectionCallback,{
  root: null,
  threshold: 0.7,
});
allSection.forEach(section => {
  sectionObserver.observe(section);
})
};
sectionObserver();

//////////////////

const smoothScroll = () => {
//const smoothScroll = () => {
 const aboutSection = document.querySelector('.about');
 const btn = document.querySelector('.btn');
 btn.addEventListener('click', (e) => {
  e.preventDefault();
  aboutSection.scrollIntoView({behavior: 'smooth'});
 });
 //const smoothScroll = () => {
 const navUl = document.querySelector('.nav-list');
  navUl.addEventListener('click', (e) => {
  e.preventDefault();
  if(e.target.classList.contains('nav-link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
});
}
smoothScroll();
///////////////

  const typeWriter = () => {
    class TypeWriter {
    constructor(txtElement, words, wait = 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }
  type(){
   const current = this.wordIndex % this.words.length;
   const fullTxt = this.words[current];
    
   if(this.isDeleting){
        this.txt = fullTxt.substring(0, this.txt.length -1);
   }else{
        this.txt = fullTxt.substring(0, this.txt.length +1);
  };
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

   let typeSpeed = 100;
   if(this.isDeleting){
     typeSpeed = 100;
     }
   if(!this.isDeleting && this.txt === fullTxt){
     typeSpeed = this.wait;
     this.isDeleting = true;
   }else if(this.isDeleting && this.txt === ''){
     this.isDeleting = false;
     this.wordIndex++;
     typeSpeed = 1000;
  }
  setTimeout(() => this.type(), typeSpeed)
  }
}

     document.addEventListener('DOMContentLoaded', init);
  function init(){
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  new TypeWriter(txtElement,words,wait);
 };
};
typeWriter();
