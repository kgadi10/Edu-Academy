/* js/form-validation.js
   - Validates enquiry + contact forms, shows inline feedback
   - Contact form shows email preview + mailto link (simulation)
*/

/* utility for messages */
function showMessage(el, msg, type='error') {
  if (!el) return;
  el.textContent = msg;
  el.style.color = (type === 'success') ? '#16A34A' : '#DC2626';
}

/* basic email and phone checks */
function validEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function validPhone(phone) { const p = phone.replace(/\s+/g,''); return /^[+]?[\d]{9,15}$/.test(p); }

/* ENQUIRY FORM */
(function() {
  const form = document.getElementById('enquiryForm');
  if (!form) return;
  const feedback = document.getElementById('enq-feedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (form.querySelector('#enq-name') || {}).value || '';
    const email = (form.querySelector('#enq-email') || {}).value || '';
    const phone = (form.querySelector('#enq-phone') || {}).value || '';
    const type = (form.querySelector('#enq-type') || {}).value || '';
    const message = (form.querySelector('#enq-message') || {}).value || '';

    if (!name.trim() || !email.trim() || !phone.trim() || !type.trim() || !message.trim()) {
      showMessage(feedback, 'Please complete all required fields.', 'error'); return;
    }
    if (!validEmail(email)) { showMessage(feedback, 'Please enter a valid email.', 'error'); return; }
    if (!validPhone(phone)) { showMessage(feedback, 'Please enter a valid phone number.', 'error'); return; }

    showMessage(feedback, 'Sending enquiry... please wait', 'success');
    setTimeout(() => { showMessage(feedback, 'Thank you! Your enquiry has been received. We will contact you shortly.', 'success'); form.reset(); }, 700);
  });
})();

/* CONTACT FORM (mail preview) */
(function() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const feedback = document.getElementById('ct-feedback') || document.getElementById('contact-feedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (form.querySelector('#ct-name') || {}).value || (form.querySelector('#name') || {}).value || '';
    const email = (form.querySelector('#ct-email') || {}).value || (form.querySelector('#email') || {}).value || '';
    const type = (form.querySelector('#ct-type') || {}).value || '';
    const message = (form.querySelector('#ct-message') || {}).value || (form.querySelector('#message') || {}).value || '';

    if (!name.trim() || !email.trim() || !message.trim() || (form.querySelector('#ct-type') && !type)) { showMessage(feedback, 'Please complete all required fields.', 'error'); return; }
    if (!validEmail(email)) { showMessage(feedback, 'Please enter a valid email address.', 'error'); return; }

    const to = 'info@eduacademy.org.za';
    const subject = encodeURIComponent(`[Website Contact] ${type || 'General'} - ${name}`);
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);

    const preview = document.createElement('div');
    preview.innerHTML = `
      <p><strong>Email preview (simulation):</strong></p>
      <p>To: ${to}</p>
      <p>Subject: ${decodeURIComponent(subject)}</p>
      <pre style="white-space:pre-wrap; background:#f3f4f6; padding:0.6rem; border-radius:6px;">${decodeURIComponent(body)}</pre>
      <p>Click <a href="mailto:${to}?subject=${subject}&body=${body}">here</a> to open your email client and send this message.</p>
    `;
    feedback.innerHTML = '';
    feedback.appendChild(preview);
    showMessage(feedback, 'Preview generated. Use mailto link to send or copy the content.', 'success');
    form.reset();
  });
})();
