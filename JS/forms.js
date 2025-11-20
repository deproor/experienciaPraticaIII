import { addVoluntario, addDoacao } from './store.js';
import { showInlineAlert } from './ui.js';

export function attachFormHandlers(root = document) {
  // Máscaras automáticas
  root.addEventListener('input', (e) => {
    const el = e.target;

    if (el.id === 'cpf') {
      let v = el.value.replace(/\D/g, '');
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      el.value = v;
    }

    if (el.id === 'telefone') {
      let v = el.value.replace(/\D/g, '');
      v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
      v = v.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
      el.value = v;
    }

    if (el.id === 'cep') {
      let v = el.value.replace(/\D/g, '');
      v = v.replace(/^(\d{5})(\d)/, '$1-$2');
      el.value = v;
    }
  });

  // Validação e envio
  root.addEventListener('submit', (e) => {
    const form = e.target.closest('form.formulario');
    if (!form) return;

    const tipo = form.getAttribute('data-form');
    const ok = validateForm(form, tipo);

    if (!ok) {
      e.preventDefault();
      showInlineAlert(form, 'erro', 'Verifique os campos destacados antes de enviar.');
      return;
    }

    e.preventDefault();
    if (tipo === 'cadastro') {
      const data = getFormData(form);
      addVoluntario(data);
      showInlineAlert(form, 'sucesso', 'Cadastro enviado com sucesso!');
      form.reset();
    } else if (tipo === 'doacao') {
      const valor = getDonationValue(form);
      addDoacao(valor);
      showInlineAlert(form, 'sucesso', `Doação registrada: R$ ${Number(valor).toFixed(2)}`);
      form.reset();
    }
  });
}

// Helpers
function getFormData(form) {
  const fd = new FormData(form);
  const obj = {};
  fd.forEach((v, k) => { obj[k] = v; });
  return obj;
}

function getDonationValue(form) {
  const fd = new FormData(form);
  const radio = fd.get('valor');
  const custom = Number(fd.get('valorPersonalizado') || 0);
  return radio ? Number(radio) : custom;
}

function validateForm(form, tipo) {
  let valid = true;
  form.querySelectorAll('.erro-campo').forEach(el => el.classList.remove('erro-campo'));

  const setError = (el) => {
    el.classList.add('erro-campo');
    valid = false;
  };

  const email = form.querySelector('#email');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) setError(email);

  const cpf = form.querySelector('#cpf');
  if (cpf && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf.value.trim())) setError(cpf);

  const cep = form.querySelector('#cep');
  if (cep && !/^\d{5}-\d{3}$/.test(cep.value.trim())) setError(cep);

  const tel = form.querySelector('#telefone');
  if (tel && !/^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(tel.value.trim())) setError(tel);

  const nome = form.querySelector('#nome');
  if (nome && nome.value.trim().length < 3) setError(nome);

  if (tipo === 'cadastro') {
    const estado = form.querySelector('#estado');
    if (estado && !estado.value) setError(estado);
  }

  if (tipo === 'doacao') {
    const valor = getDonationValue(form);
    if (!valor || Number(valor) < 5) {
      const custom = form.querySelector('#valor-personalizado');
      if (custom) setError(custom);
    }
  }

  return valid;
}

// Estilo de erro
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .erro-campo {
      border-color: var(--erro) !important;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, .2) !important;
    }
  `;
  document.head.appendChild(style);
});
