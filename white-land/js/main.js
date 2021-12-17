
let faqList = document.querySelectorAll('.faq_item');

for(let faq of faqList){
  faq.addEventListener("click", toggleFaq, false);
}

function toggleFaq(){
  this.classList.toggle('active');
}

document.getElementById('scrollTop').addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
})

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector('header').classList.remove('active');
      const id = this.getAttribute('href').substring(1);
      const yOffset = -110; 
      const element = document.getElementById(id);
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({top: y, behavior: 'smooth'});
  });
});

document.getElementById('header_toggler').addEventListener('click', function() {
  document.querySelector('header').classList.toggle('active');
})