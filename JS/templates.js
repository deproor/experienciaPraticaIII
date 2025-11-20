// js/templates.js
import { getState } from './store.js';

const html = (strings, ...values) =>
  strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '');

const badge = (text, kind = 'normal') => html`
  <span class="etiqueta ${kind === 'primaria' ? 'etiqueta-primaria' :
                          kind === 'sucesso' ? 'etiqueta-sucesso' :
                          kind === 'aviso' ? 'etiqueta-aviso' :
                          kind === 'erro' ? 'etiqueta-erro' : ''}">
    ${text}
  </span>
`;

const projectCard = (p) => html`
  <div class="cartao">
    ${p.img ? html`<img src="../imagens/${p.img}" alt="${p.titulo}">` : ''}
    <h3 class="titulo-cartao">${p.titulo}</h3>
    <p>${p.descricao}</p>
    <div class="lista-etiquetas">
      ${p.tags.map(t => badge(t.texto, t.tipo)).join('')}
    </div>
  </div>
`;

const TEMPLATES = {
  home: () => html`
    <section class="secao destaque hero-grid">
      <div class="conteudo-destaque">
        <h2 class="titulo-secao">Proteção e adoção responsável de cães</h2>
        <p class="texto-secao">Promovemos o bem-estar, resgates e campanhas de adoção com transparência e tecnologia.</p>
        <div class="lista-etiquetas">
          ${badge('Transparência', 'primaria')}
          ${badge('+1000 cães resgatados', 'sucesso')}
          ${badge('Feiras mensais', 'aviso')}
        </div>
        <div style="margin-top: var(--espaco-medio);">
          <a class="botao botao-principal" href="#/doar">Quero doar</a>
          <a class="botao botao-outline" href="#/cadastro">Quero ser voluntário</a>
        </div>
      </div>
      <div class="imagem-destaque">
        <img src="../imagens/ong2.jpg" alt="Imagem representando missão da ONG">
      </div>
    </section>

    <section class="secao">
      <h2 class="titulo-secao">Projetos em destaque</h2>
      <div class="lista-cartoes">
        ${getState().projetos.slice(0,3).map(projectCard).join('')}
      </div>
    </section>
  `,

  projects: ({ query }) => {
    const filtro = query.get('filtro'); // 'andamento' | 'voluntariado' | null
    const todos = getState().projetos;
    const lista = !filtro ? todos : todos.filter(p => p.categoria === filtro);

    return html`
      <section class="secao">
        <h2 class="titulo-secao">Projetos</h2>
        <p class="texto-secao">Ações sociais, campanhas de adoção, resgates e educação comunitária.</p>
        <div class="lista-cartoes">
          ${lista.map(projectCard).join('')}
        </div>
      </section>
    `;
  },

  donate: () => html`
    <section class="secao">
      <h2 class="titulo-secao">Doar</h2>
      <p>Contribua com nossos projetos e acompanhe o impacto gerado. Toda ajuda é bem-vinda!</p>
      <form class="formulario" data-form="doacao">
        <div class="campo">
          <label><input type="radio" name="valor" value="20"> R$ 20,00</label>
          <label><input type="radio" name="valor" value="50"> R$ 50,00</label>
          <label><input type="radio" name="valor" value="100"> R$ 100,00</label>
        </div>
        <div class="campo">
          <label for="valor-personalizado">Outro valor</label>
          <input type="number" id="valor-personalizado" name="valorPersonalizado" min="5" step="5" placeholder="R$">
        </div>
        <button class="botao botao-principal" type="submit">Continuar para pagamento</button>
      </form>
    </section>
  `,

  signup: () => html`
    <section class="secao">
      <h2 class="titulo-secao">Cadastro</h2>
      <form class="formulario" data-form="cadastro">
        <fieldset>
          <legend>Informações Pessoais</legend>
          <div class="campo">
            <label for="nome">Nome Completo</label>
            <input type="text" id="nome" name="nome" required>
          </div>
          <div class="campo">
            <label for="email">E-mail</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="campo">
            <label for="cpf">CPF</label>
            <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" required>
          </div>
          <div class="campo">
            <label for="telefone">Telefone</label>
            <input type="tel" id="telefone" name="telefone" placeholder="(00) 00000-0000" required>
          </div>
          <div class="campo">
            <label for="nascimento">Data de Nascimento</label>
            <input type="date" id="nascimento" name="nascimento" required>
          </div>
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>
          <div class="campo">
            <label for="endereco">Endereço</label>
            <input type="text" id="endereco" name="endereco" required>
          </div>
          <div class="campo">
            <label for="cep">CEP</label>
            <input type="text" id="cep" name="cep" placeholder="00000-000" required>
          </div>
          <div class="campo">
            <label for="cidade">Cidade</label>
            <input type="text" id="cidade" name="cidade" required>
          </div>
          <div class="campo">
            <label for="estado">Estado</label>
            <select id="estado" name="estado" required>
              <option value="">Selecione</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>
        </fieldset>

        <button class="botao botao-principal" type="submit">Enviar Cadastro</button>
      </form>
    </section>
  `,

  admin: () => {
    const s = getState();
    return html`
      <section class="secao">
        <h2 class="titulo-secao">Área Administrativa</h2>
        <p>Gestão simples de projetos, voluntários e doações.</p>

        <div class="lista-indicadores">
          <div class="indicador">
            <div class="indicador-valor">${s.projetos.length}</div>
            <div class="indicador-legenda">Projetos ativos</div>
          </div>
          <div class="indicador">
            <div class="indicador-valor">${s.voluntarios.length}</div>
            <div class="indicador-legenda">Voluntários</div>
          </div>
          <div class="indicador">
            <div class="indicador-valor">${s.doacoesTotal}</div>
            <div class="indicador-legenda">Doações (R$)</div>
          </div>
          <div class="indicador">
            <div class="indicador-valor">98%</div>
            <div class="indicador-legenda">Satisfação</div>
          </div>
        </div>

        <div class="acoes-admin">
          <a class="botao botao-secundario" href="#/projetos">Ver projetos</a>
          <a class="botao botao-outline" href="#/cadastro">Cadastrar voluntário</a>
          <a class="botao botao-principal" href="#/doar">Registrar doação</a>
        </div>
      </section>
    `;
  }
};

export const renderTemplate = (name, props = {}) => {
  const tpl = TEMPLATES[name];
  return tpl ? tpl(props) : TEMPLATES['home'](props);
};
