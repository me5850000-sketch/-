// Header scroll state
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form -> WhatsApp
const WHATSAPP_NUMBER = '201000000000'; // غيّري الرقم ده برقمك الحقيقي

const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const product = document.getElementById('product').value;
  const message = document.getElementById('message').value.trim();

  let text = `مرحبًا سوفيارا، معايا طلب جديد:%0A`;
  text += `الاسم: ${name}%0A`;
  text += `الموبايل: ${phone}%0A`;
  text += `العطر: ${product}%0A`;
  if (message) text += `الرسالة: ${message}%0A`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
});
