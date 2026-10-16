const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const dialog = document.getElementById('registerDialog');
const closeDialog = document.getElementById('closeDialog');
const form = document.getElementById('registrationForm');
const message = document.getElementById('formMessage');

document.getElementById('year').textContent = new Date().getFullYear();

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('[data-register]').forEach(button => {
  button.addEventListener('click', () => {
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else alert('Please call 9972534135 or 9972621357 to register.');
  });
});
closeDialog.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const lines = [
    'Registration enquiry — All-India Drawing Competition',
    `Participant: ${data.get('studentName')}`,
    `Age group: ${data.get('ageGroup')}`,
    `Parent/guardian phone: ${data.get('guardianPhone')}`,
    `Email: ${data.get('email') || 'Not provided'}`
  ];
  const text = lines.join('\n');
  message.textContent = 'Your enquiry is prepared. Choose Copy below to share it with the organizers.';
  let copyButton = document.getElementById('copyEnquiry');
  if (!copyButton) {
    copyButton = document.createElement('button');
    copyButton.type = 'button';
    copyButton.id = 'copyEnquiry';
    copyButton.className = 'register-button';
    copyButton.textContent = 'Copy Enquiry';
    copyButton.style.marginTop = '6px';
    message.after(copyButton);
  }
  copyButton.onclick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      message.textContent = 'Enquiry copied. Contact the organizers to complete registration.';
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
      message.textContent = 'Enquiry copied. Contact the organizers to complete registration.';
    }
  };
});
