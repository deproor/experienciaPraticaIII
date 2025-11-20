const KEY = 'amigosDePatasStore';

const initialState = {
  projetos: [
    {
      id: 'p1',
      titulo: 'Campanha Adote com Amor',
      descricao: 'Feiras mensais com triagem e acompanhamento pós-adoção.',
      categoria: 'andamento',
      img: 'ong1.jpg',
      tags: [{ texto: 'Adoção', tipo: 'primaria' }, { texto: 'Ativo', tipo: 'sucesso' }]
    },
    {
      id: 'p2',
      titulo: 'Educação Comunitária',
      descricao: 'Palestras sobre bem-estar animal e guarda responsável.',
      categoria: 'voluntariado',
      img: '',
      tags: [{ texto: 'Comunidade' }, { texto: 'Ativo', tipo: 'sucesso' }]
    },
    {
      id: 'p3',
      titulo: 'Resgate e Reabilitação',
      descricao: 'Apoio veterinário e lares temporários para reabilitação.',
      categoria: 'andamento',
      img: 'ong3.jpg',
      tags: [{ texto: 'Resgate', tipo: 'aviso' }, { texto: 'Ativo', tipo: 'sucesso' }]
    }
  ],
  voluntarios: [],
  doacoesTotal: 0
};

let state = { ...initialState };

export function initStore() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) state = JSON.parse(saved);
    else localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

export function getState() {
  return state;
}

export function addVoluntario(vol) {
  state.voluntarios.push(vol);
  persist();
}

export function addDoacao(valor) {
  const v = Number(valor) || 0;
  state.doacoesTotal = Number((state.doacoesTotal + v).toFixed(2));
  persist();
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}