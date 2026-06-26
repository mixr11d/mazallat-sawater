// --- CENTRALIZED CONTROLLER CONFIGURATION (FIRST 15 LINES) ---
const CONFIG = {
  clientPhoneRaw: '0532744390', // هاتف العميل المحلي
  devPhoneRaw: '0578539687',    // هاتف المطور (الرعد التقني)
  googleAdsId: 'AW-1648753290',   // كود تتبع إعلانات قوقل (استبدله برقمك الفعلي)
  web3FormsKey: '532744390',    // مفتاح الوصول Web3Forms الخاص بك
  valCall: 50,                  // قيمة تحويل الاتصال بالريال
  valWhatsapp: 45,              // قيمة تحويل الواتساب بالريال
  valForm: 40,                  // قيمة تحويل النموذج بالريال
  businessName: 'حداد الاحتراف بالرياض'
};

// --- PHONE NUMBER NORMALIZER & DYNAMIC LINKS RESOLVER ---
const cleanPhone = (phone) => phone.trim().replace(/^(00966|966|0)/, '');
const clientClean = cleanPhone(CONFIG.clientPhoneRaw);
const devClean = cleanPhone(CONFIG.devPhoneRaw);

const clientLocal = `0${clientClean}`;
const clientInt = `966${clientClean}`;
const devLocal = `0${devClean}`;
const devInt = `966${devClean}`;

// --- DYNAMIC GOOGLE ADS TAG LOADER ---
(function loadGoogleAdsTag() {
  if (!CONFIG.googleAdsId || CONFIG.googleAdsId.includes('xxxxxx')) return;
  
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.googleAdsId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', CONFIG.googleAdsId);
})();

// --- CONVERSION TRACKING HELPER ---
function trackGtagConversion(action, category, value) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      'event_category': category,
      'event_label': CONFIG.businessName,
      'value': value,
      'currency': 'SAR',
      'transport_type': 'beacon'
    });
  }
}

// --- DYNAMIC CONTENT INJECTION ---
document.addEventListener('DOMContentLoaded', () => {
  // Inject Header
  const headerContainer = document.getElementById('globalHeader');
  if (headerContainer) {
    headerContainer.innerHTML = `
      <nav class="nav-bar" aria-label="القائمة الرئيسية">
        <div class="nav-container">
          <a href="index.html" class="nav-logo" aria-label="الصفحة الرئيسية">${CONFIG.businessName}</a>
          <button class="menu-toggle" aria-label="افتح قائمة التنقل" aria-expanded="false" id="menuToggleBtn">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>
          <ul class="nav-links" id="navLinks">
            <li><a href="index.html">الرئيسية</a></li>
            <li class="dropdown">
              <button type="button" class="dropdown-trigger" id="dropdownBtn" aria-expanded="false" aria-haspopup="true">خدماتنا <span class="arrow">▾</span></button>
              <ul class="dropdown-content" id="dropdownContent" role="menu">
                <li><a href="car-parking-umbrellas.html" role="menuitem">مظلات مواقف سيارات</a></li>
                <li><a href="bamboo-umbrellas.html" role="menuitem">مظلات خيزران</a></li>
                <li><a href="privacy-screens.html" role="menuitem">سواتر خصوصية</a></li>
                <li><a href="sandwich-panels.html" role="menuitem">ساندوتش بانل</a></li>
                <li><a href="aluminum-doors-windows.html" role="menuitem">ألمنيوم أبواب ودرايش</a></li>
              </ul>
            </li>
            <li><a href="contact-us.html">تواصل معنا</a></li>
            <li><a href="about-us.html">من نحن؟</a></li>
          </ul>
        </div>
      </nav>
    `;
  }

  // Inject Footer
  const footerContainer = document.getElementById('globalFooter');
  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer class="site-footer">
        <div class="footer-container">
          <div class="footer-column info-col">
            <h3>${CONFIG.businessName}</h3>
            <p>متخصصون في توريد وتركيب كافة أنواع المظلات، السواتر، الساندوتش بانل وأعمال الألمنيوم في الرياض بأعلى معايير الجودة والدقة.</p>
          </div>
          <div class="footer-column links-col">
            <h3>روابط سريعة</h3>
            <ul>
              <li><a href="index.html">الرئيسية</a></li>
              <li><a href="about-us.html">من نحن؟</a></li>
              <li><a href="contact-us.html">تواصل معنا</a></li>
              <li><a href="privacy-policy.html">سياسة الخصوصية</a></li>
            </ul>
          </div>
          <div class="footer-column services-col">
            <h3>خدماتنا المميزة</h3>
            <ul>
              <li><a href="car-parking-umbrellas.html">مظلات سيارات</a></li>
              <li><a href="bamboo-umbrellas.html">مظلات خيزران</a></li>
              <li><a href="privacy-screens.html">سواتر خصوصية</a></li>
              <li><a href="sandwich-panels.html">ساندوتش بانل</a></li>
              <li><a href="aluminum-doors-windows.html">أبواب ونوافذ ألمنيوم</a></li>
            </ul>
          </div>
          <div class="footer-column contact-col">
            <h3>اتصل بنا</h3>
            <p>نطاق العمل: الرياض والمناطق المجاورة</p>
            <a href="tel:${clientLocal}" class="footer-phone" aria-label="اتصل بنا عبر الهاتف">هاتف: ${clientLocal}</a>
            <a href="https://wa.me/${clientInt}" class="footer-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="تواصل معنا عبر واتساب">واتساب: ${clientLocal}</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} ${CONFIG.businessName}. جميع الحقوق محفوظة.</p>
          <p class="developer-text">تطوير ودعم تقني: <a href="tel:${devLocal}" target="_blank" rel="noopener noreferrer" aria-label="اتصل بالمطور الرعد التقني">${CONFIG.devPhoneRaw} (الرعد التقني)</a></p>
        </div>
      </footer>
    `;
  }

  // Inject Floating Action Buttons
  const floatingContainer = document.createElement('div');
  floatingContainer.innerHTML = `
    <div class="floating-actions" aria-label="أزرار التواصل السريع">
      <a href="https://wa.me/${clientInt}" class="btn-float btn-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="تواصل معنا عبر واتساب">
        <span class="icon">💬</span>
        <span class="text">واتساب</span>
      </a>
      <a href="tel:${clientLocal}" class="btn-float btn-call" aria-label="اتصل بنا الآن">
        <span class="icon">📞</span>
        <span class="text">اتصال</span>
      </a>
      <button id="backToTop" class="btn-back-to-top" aria-label="الرجوع لأعلى الصفحة" style="display: none;">
        ↑
      </button>
    </div>
  `;
  document.body.appendChild(floatingContainer);

  // --- COMPONENT LOGIC AND EVENT HANDLERS ---
  
  // Mobile Hamburger Menu Toggle
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuToggleBtn && navLinks) {
    menuToggleBtn.addEventListener('click', () => {
      const isExpanded = menuToggleBtn.getAttribute('aria-expanded') === 'true';
      menuToggleBtn.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });
  }

  // Accessible Services Dropdown Dynamic Controls
  const dropdownBtn = document.getElementById('dropdownBtn');
  const dropdownContent = document.getElementById('dropdownContent');
  if (dropdownBtn && dropdownContent) {
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
      dropdownBtn.setAttribute('aria-expanded', !isExpanded);
      dropdownContent.style.display = isExpanded ? 'none' : 'block';
    });

    // Close on clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdownBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
        dropdownBtn.setAttribute('aria-expanded', 'false');
        dropdownContent.style.display = 'none';
      }
    });
  }

  // Back to top button visibility and logic
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// --- CLICKS AND CONVERSIONS EVENT DELEGATION ---
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a');
  if (!anchor) return;

  const href = anchor.getAttribute('href') || '';
  const cleanHref = href.replace(/\s+/g, '').toLowerCase();

  if (cleanHref.startsWith('tel:')) {
    trackGtagConversion('click_call', 'engagement', CONFIG.valCall);
  } else if (cleanHref.includes('wa.me') || cleanHref.includes('api.whatsapp.com') || cleanHref.includes('send?phone')) {
    trackGtagConversion('click_whatsapp', 'engagement', CONFIG.valWhatsapp);
  }
});

// --- DYNAMIC FORM SUBMISSION WITH INTEGRITY CHECK ---
document.addEventListener('submit', (e) => {
  const form = e.target;
  if (!form.classList.contains('contact-form-element')) return;

  e.preventDefault();
  
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const submitBtn = form.querySelector('[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;

  const formData = new FormData(form);
  if (!formData.has('access_key')) {
    formData.append('access_key', CONFIG.web3FormsKey);
  }

  // Fire conversion event immediately upon valid submit
  trackGtagConversion('submit_form', 'lead', CONFIG.valForm);

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('تم إرسال رسالتك بنجاح! سنتواصل معك في أقرب وقت.');
      form.reset();
    } else {
      alert('عذراً، لم تكتمل عملية الإرسال. يرجى تجربة خيار الاتصال المباشر.');
    }
  })
  .catch(error => {
    console.error('Form processing error:', error);
    alert('حدث خطأ غير متوقع. يرجى مراجعة اتصال الإنترنت وإعادة المحاولة.');
  })
  .finally(() => {
    if (submitBtn) submitBtn.disabled = false;
  });
});
