console.log("Testando Webpack!");

// Sua IIFE que define o objeto 'atendimento'
let atendimento = (function() {
  function salvar() {
    const dados = {
      nome: $('#nome').val(),
      profissional: $('#profissional').val(),
      data: $('#data').val(),
      tipo: $('#tipo').val(),
      observacoes: $('#observacoes').val()
    };

    const id = $('#atendimento-form').data('id');
    const url = id ? `http://localhost:3000/atendimentos/${id}` : 'http://localhost:3000/atendimentos';
    const metodo = id ? 'PUT' : 'POST';

    $.ajax({
      url,
      method: metodo,
      contentType: 'application/json',
      data: JSON.stringify(dados),
      success: function() {
        $('#atendimento-form').trigger('reset');
        $('#atendimento-form').removeData('id'); // limpa modo edição
        listar(); // Chama a função interna listar()
      },
      error: function(xhr, status, error) { // Adicionado tratamento de erro
        alert('Erro ao salvar atendimento: ' + (xhr.responseJSON ? xhr.responseJSON.error : 'Erro desconhecido'));
        console.error('Erro na requisição AJAX (salvar):', status, error, xhr.responseText);
      }
    });
  }

  function listar() {
    $.get('http://localhost:3000/atendimentos', function(lista) {
      $('#lista-atendimentos').html('');
      // Formatação da data para exibição mais amigável
      lista.forEach(function(item) {
        const dataFormatada = new Date(item.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'}); // Adicionei timeZone para evitar problemas de data
        $('#lista-atendimentos').append(`
          <div data-id="${item.id}">
            <strong>${item.nome}</strong> - ${item.tipo} (${dataFormatada})<br/>
            Profissional: ${item.profissional}<br/>
            Observações: ${item.observacoes}<br/>
            <button class="editar-btn">Editar</button>
            <button class="excluir-btn">Excluir</button>
            <hr/>
          </div>
        `);
      });
    }).fail(function(xhr, status, error) { // Adicionado tratamento de erro para listar
        alert('Erro ao carregar atendimentos: ' + (xhr.responseJSON ? xhr.responseJSON.error : 'Erro desconhecido'));
        console.error('Erro na requisição AJAX (listar):', status, error, xhr.responseText);
    });
  }

  function carregar(id) {
    $.get(`http://localhost:3000/atendimentos/${id}`, function(dados) {
      $('#nome').val(dados.nome);
      $('#profissional').val(dados.profissional);
      // Ajuste para formatar a data vinda do DB para o input type="date"
      const dataParaInput = new Date(dados.data).toISOString().split('T')[0];
      $('#data').val(dataParaInput);
      $('#tipo').val(dados.tipo);
      $('#observacoes').val(dados.observacoes);
      $('#atendimento-form').data('id', id); // marca para edição
    }).fail(function(xhr, status, error) { // Adicionado tratamento de erro para carregar
        alert('Erro ao carregar atendimento para edição: ' + (xhr.responseJSON ? xhr.responseJSON.error : 'Erro desconhecido'));
        console.error('Erro na requisição AJAX (carregar):', status, error, xhr.responseText);
    });
  }

  function excluir(id) {
    $.ajax({
      url: `http://localhost:3000/atendimentos/${id}`,
      method: 'DELETE',
      success: function() {
        alert('Atendimento excluído com sucesso!'); // Feedback visual
        listar(); // Atualiza a lista após exclusão
      },
      error: function(xhr, status, error) { // Adicionado tratamento de erro para excluir
        alert('Erro ao excluir atendimento: ' + (xhr.responseJSON ? xhr.responseJSON.error : 'Erro desconhecido'));
        console.error('Erro na requisição AJAX (excluir):', status, error, xhr.responseText);
      }
    });
  }

  // Retorna o objeto público com as funções
  return {
    salvar: salvar,
    listar: listar,
    excluir: excluir,
    carregar: carregar
  };
})();

// ESTE É O ÚNICO BLOCO jQuery $(function() { ... }); QUE DEVE EXISTIR
// Ele só é executado quando o DOM está pronto e o objeto 'atendimento' já foi definido.
$(function() {
  // Lista os atendimentos ao carregar a página
  atendimento.listar();

  // Listener para o formulário de cadastro/edição
  $('#atendimento-form').on('submit', function(e) {
    e.preventDefault(); // Evita o recarregamento da página
    atendimento.salvar();
  });

  // Event delegation para o botão Excluir
  $('#lista-atendimentos').on('click', '.excluir-btn', function() {
    const id = $(this).closest('[data-id]').data('id');
    if (confirm('Tem certeza que deseja excluir este atendimento?')) {
      atendimento.excluir(id);
    }
  });

  // Event delegation para o botão Editar
  $('#lista-atendimentos').on('click', '.editar-btn', function() {
    const id = $(this).closest('[data-id]').data('id');
    atendimento.carregar(id);
  });
});