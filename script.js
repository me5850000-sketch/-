// ===== رقم الواتساب: غيّريه هنا بس، وهيتغير في الموقع كله =====
const WHATSAPP_NUMBER = '201000000000'; // بالصيغة الدولية من غير + (مثال: 2010xxxxxxxx)

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const wa = (text) => `https://wa.me/${WHATSAPP_NUMBER}${text ? '?text=' + encodeURIComponent(text) : ''}`;

// روابط الواتساب
$$('.wa-any').forEach(a => a.href = wa());
const waLink = $('#waLink');
if (waLink) { waLink.href = wa(); waLink.textContent = '+' + WHATSAPP_NUMBER; }

// زرار "اطلبي الآن" على أي عطر: يفتح واتساب والطلب مكتوب، ويختار العطر في الفورم كمان
$$('[data-order]').forEach(btn => btn.addEventListener('click', (e) => {
  const name = btn.dataset.order;
  if (!name) return; // زرار الهيرو بينزل للفورم بس
  e.preventDefault();
  const sel = $('#product');
  if (sel) sel.value = name;
  window.open(wa(`مرحبًا سوفيارا، حابة أطلب عطر ${name} 🌸`), '_blank', 'noopener');
}));

// الهيدر + شريط التقدم + اللينك النشط
const header = $('#siteHeader'), bar = $('#progress');
const sections = $$('main section[id]');
const links = $$('.main-nav a');
let ticking = false;
function onScroll() {
  const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
  header.classList.toggle('scrolled', y > 40);
  if (bar) bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
  let cur = '';
  sections.forEach(s => { if (s.offsetTop - 140 <= y) cur = s.id; });
  links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + cur));
  ticking = false;
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

// منيو الموبايل
const menuToggle = $('#menuToggle'), mainNav = $('#mainNav');
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', open);
});
links.forEach(a => a.addEventListener('click', () => {
  mainNav.classList.remove('open'); menuToggle.classList.remove('open'); menuToggle.setAttribute('aria-expanded', false);
}));

// ليلي / نهاري
const root = document.documentElement;
const meta = $('meta[name="theme-color"]');
function setTheme(t) {
  root.dataset.theme = t;
  if (meta) meta.content = t === 'dark' ? '#171012' : '#F6ECE1';
  try { localStorage.setItem('sof.theme', t); } catch (e) {}
}
if (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches) root.dataset.theme = 'dark';
if (meta && root.dataset.theme === 'dark') meta.content = '#171012';
$('#themeBtn').addEventListener('click', (e) => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  if (!document.startViewTransition || reduce) { setTheme(next); return; }
  const x = e.clientX, y = e.clientY, r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  document.startViewTransition(() => setTheme(next)).ready.then(() => {
    root.animate({ clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 650, easing: 'cubic-bezier(.16,1,.3,1)', pseudoElement: '::view-transition-new(root)' });
  });
});

// العنوان حرف حرف (كلمة كلمة عشان العربي يفضل متشبك)
let k = 0;
$$('[data-split]').forEach(el => {
  if (reduce) return;
  el.innerHTML = el.textContent.split(' ').map(w => `<span class="ltr" style="animation-delay:${(0.15 + (k++) * 0.09).toFixed(2)}s">${w}</span>`).join(' ');
});

// ظهور الأقسام وقت السكرول
if ('IntersectionObserver' in window && !reduce) {
  const io = new IntersectionObserver((es) => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
  $$('.rv').forEach(el => io.observe(el));
} else $$('.rv').forEach(el => el.classList.add('in'));

// توهج بيمشي مع الماوس + زراير مغناطيسية
if (fine && !reduce) {
  const glow = $('#glow');
  addEventListener('mousemove', (e) => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; }, { passive: true });
  $$('.mag').forEach(b => {
    b.addEventListener('mousemove', (e) => {
      const r = b.getBoundingClientRect();
      b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.18}px ${(e.clientY - r.top - r.height / 2) * 0.28}px`;
    });
    b.addEventListener('mouseleave', () => { b.style.translate = ''; });
  });
}

// سنة الفوتر
$('#year').textContent = new Date().getFullYear();

// الفورم -> واتساب
$('#contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('#name').value.trim();
  const phone = $('#phone').value.trim();
  const product = $('#product').value;
  const message = $('#message').value.trim();
  let text = 'مرحبًا سوفيارا، معايا طلب جديد:\n';
  text += `الاسم: ${name}\n`;
  text += `الموبايل: ${phone}\n`;
  text += `العطر: ${product}\n`;
  if (message) text += `الرسالة: ${message}\n`;
  window.open(wa(text), '_blank', 'noopener');
});
