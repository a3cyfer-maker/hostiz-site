const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const dialog = document.querySelector('#notice-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogCopy = document.querySelector('#dialog-copy');
const contactDialog = document.querySelector('#contact-dialog');
const contactForm = document.querySelector('#contact-form');
const contactError = document.querySelector('#contact-error');

function showNotice(title, copy) {
  dialogTitle.textContent = title;
  dialogCopy.textContent = copy;
  if (typeof dialog.showModal === 'function') dialog.showModal();
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    const target = event.target.getAttribute('href');
    if (target && document.querySelector(target)) {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
      return;
    }
    event.preventDefault();
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    showNotice('A primeira dobra está pronta.', 'As seções internas serão criadas e conectadas na próxima etapa do site.');
  }
});

document.querySelectorAll('.js-contact').forEach((button) => {
  button.addEventListener('click', () => {
    contactError.textContent = '';
    if (typeof contactDialog.showModal === 'function') contactDialog.showModal();
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const services = data.getAll('service');

  if (!services.length) {
    contactError.textContent = 'Selecione pelo menos uma opção para continuar.';
    return;
  }

  contactError.textContent = '';
  const message = [
    'Olá! Vim pelo site da Hostiz e gostaria de solicitar um atendimento.',
    '',
    `Nome: ${data.get('name')}`,
    `Contato: ${data.get('contact')}`,
    `Empresa: ${data.get('company') || 'Não informada'}`,
    `Tenho interesse em: ${services.join(', ')}`,
    `Detalhes: ${data.get('details') || 'Não informado'}`
  ].join('\n');

  window.open(`https://wa.me/5531976011753?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  contactDialog.close();
});

document.querySelector('.contact-dialog-close').addEventListener('click', () => contactDialog.close());
contactDialog.addEventListener('click', (event) => {
  if (event.target === contactDialog) contactDialog.close();
});

document.querySelector('.js-solutions').addEventListener('click', () => {
  document.querySelector('#solucoes').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('button.project-link').forEach((button) => {
  button.addEventListener('click', () => {
    showNotice('Case em preparação.', 'Os detalhes e resultados completos deste projeto serão conectados na próxima etapa.');
  });
});

document.querySelector('.js-about').addEventListener('click', () => {
  showNotice('Tecnologia orientada ao negócio.', 'A Hostiz combina estratégia, infraestrutura, desenvolvimento e automação para construir soluções sob medida.');
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('.dialog-button').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
