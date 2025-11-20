export function initGlobalUI() {
}

export function showInlineAlert(container, tipo, mensagem) {
  const map = {
    sucesso: 'etiqueta-sucesso',
    aviso: 'etiqueta-aviso',
    erro: 'etiqueta-erro',
    info: 'etiqueta-primaria'
  };
  const alert = document.createElement('div');
  alert.className = 'etiqueta ' + (map[tipo] || '');
  alert.style.display = 'inline-block';
  alert.style.margin = '6px 0';
  alert.textContent = mensagem;
  container.appendChild(alert);
  setTimeout(() => alert.remove(), 4000);
}