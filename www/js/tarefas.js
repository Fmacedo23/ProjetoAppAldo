let db;
let editandoId = null;
const isSqlite = !!window.sqlitePlugin;

// Abstração simples para salvar/listar em LocalStorage
const LS_KEY = 'tarefas_ls';
function lsSalvar(t) {
  const arr = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  if (editandoId !== null) {
    arr[editandoId] = t;
  } else {
    arr.push(t);
  }
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
  return arr.length - 1;
}
function lsListar() {
  return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
}
function lsExcluir(id) {
  const arr = lsListar();
  arr.splice(id, 1);
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
}

document.addEventListener('deviceready', initDB);
if (!isSqlite) window.addEventListener('load', initDB); // fallback no browser

function initDB() {
  console.log('[TAREFAS] Inicializando, sqlite?', isSqlite);

  if (isSqlite) {
    db = window.sqlitePlugin.openDatabase({ name: 'tarefas.db', location: 'default' },
      () => console.log('[TAREFAS] SQLite aberto'),
      e => console.error('[TAREFAS] erro abrir SQLite', e)
    );
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tarefas (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, descricao TEXT)',
        [],
        () => console.log('[TAREFAS] Tabela pronta'),
        (tx, e) => console.error('[TAREFAS] erro CREATE TABLE', e)
      );
    }, e => console.error('[TAREFAS] erro transação', e),
       listarTarefas);
  } else {
    console.log('[TAREFAS] Modo browser / LocalStorage');
    listarTarefas();
  }
}

function salvarTarefa() {
  const titulo = document.getElementById('titulo').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  if (!titulo) { alert('Informe o título da tarefa.'); return; }

  if (isSqlite) {
    const sql = editandoId
      ? ['UPDATE tarefas SET titulo=?, descricao=? WHERE id=?', [titulo, descricao, editandoId]]
      : ['INSERT INTO tarefas (titulo, descricao) VALUES (?,?)', [titulo, descricao]];

    db.transaction(tx => {
      tx.executeSql(...sql,
        (tx, res) => {
          console.log('[TAREFAS] SQL OK, insertId:', res.insertId);
          resetarFormulario(); listarTarefas();
        },
        (tx, e) => console.error('[TAREFAS] SQL ERR', e)
      );
    });
  } else {
    // LocalStorage
    const arr = lsSalvar({ titulo, descricao });
    console.log('[TAREFAS LS] gravou index', arr);
    resetarFormulario(); listarTarefas();
  }
}

function listarTarefas() {
  const tbody = document.getElementById('listaTarefas');
  tbody.innerHTML = '';

  if (isSqlite) {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM tarefas', [], (tx, res) => {
        for (let i = 0; i < res.rows.length; i++) {
          const t = res.rows.item(i);
          appendLinha(i, t.titulo, t.descricao, t.id);
        }
      });
    });
  } else {
    const arr = lsListar();
    arr.forEach((t, i) => appendLinha(i, t.titulo, t.descricao, i));
  }
}

function appendLinha(idx, titulo, desc, dbId) {
  const tbody = document.getElementById('listaTarefas');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${titulo}</td>
    <td>${desc}</td>
    <td>
      <button onclick="editarTarefa(${dbId}, '${titulo}', '${desc}')">Editar</button>
      <button onclick="excluirTarefa(${dbId})">Excluir</button>
    </td>`;
  tbody.appendChild(tr);
}

function editarTarefa(id, titulo, desc) {
  editandoId = id;
  document.getElementById('titulo').value = titulo;
  document.getElementById('descricao').value = desc;
}

function excluirTarefa(id) {
  if (!confirm('Deseja excluir?')) return;

  if (isSqlite) {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM tarefas WHERE id=?', [id],
        () => { resetarFormulario(); listarTarefas(); },
        (tx,e) => console.error('[TAREFAS] erro DELETE', e)
      );
    });
  } else {
    lsExcluir(id);
    resetarFormulario(); listarTarefas();
  }
}

function resetarFormulario() {
  editandoId = null;
  document.getElementById('titulo').value = '';
  document.getElementById('descricao').value = '';
}

function voltar() {
    window.location.href = "index.html";  // Redireciona para o menu principal
  }
  