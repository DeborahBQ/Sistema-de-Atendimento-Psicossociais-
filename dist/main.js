/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var atendimentos;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("{console.log(\"Testando Webpack!\");\r\n\r\n// Sua IIFE que define o objeto 'atendimento'\r\nlet atendimento = (function() {\r\n  function salvar() {\r\n    const dados = {\r\n      nome: $('#nome').val(),\r\n      profissional: $('#profissional').val(),\r\n      data: $('#data').val(),\r\n      tipo: $('#tipo').val(),\r\n      observacoes: $('#observacoes').val()\r\n    };\r\n\r\n    const id = $('#atendimento-form').data('id');\r\n    const url = id ? `http://localhost:3000/atendimentos/${id}` : 'http://localhost:3000/atendimentos';\r\n    const metodo = id ? 'PUT' : 'POST';\r\n\r\n    $.ajax({\r\n      url,\r\n      method: metodo,\r\n      contentType: 'application/json',\r\n      data: JSON.stringify(dados),\r\n      success: function() {\r\n        $('#atendimento-form').trigger('reset');\r\n        $('#atendimento-form').removeData('id'); // limpa modo edição\r\n        listar(); // Chama a função interna listar()\r\n      },\r\n      error: function(xhr, status, error) { // Adicionado tratamento de erro\r\n        alert('Erro ao salvar atendimento: ' + (xhr.responseJSON ? xhr.responseJSON.error : 'Erro desconhecido'));\r\n        console.error('Erro na requisição AJAX (salvar):', status, error, xhr.responseText);\r\n      }\r\n    });\r\n  }\r\n\r\n  function listar() {\r\n    $.get('http://localhost:3000/atendimentos', function(lista) {\r\n      $('#lista-atendimentos').html('');\r\n      // Formatação da data para exibição mais amigável\r\n      lista.forEach(function(item) {\r\n        const dataFormatada = new Date(item.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'}); // Adicionei timeZone para evitar problemas de data\r\n        $('#lista-atendimentos').append(`\r\n          <div data-id=\"${item.id}\">\r\n            <strong>${item.nome}</strong> - ${item.tipo} (${dataFormatada})<br/>\r\n            Profissional: ${item.profissional}<br/>\r\n            Observações: ${item.observacoes}<br/>\r\n            <button class=\"editar-btn\">Editar</button>\r\n            <button class=\"excluir-btn\">Excluir</button>\r\n            <hr/>\r\n          </div>\r\n        `);\r\n      });\r\n    }).fail(function(xhr, status, error) { // Adicionado tratamento de erro para listar\r\n        alert('Erro ao carregar atendimentos: ' + (xhr.responseJSON ? xhr.responseJSON.error : 'Erro desconhecido'));\r\n        console.error('Erro na requisição AJAX (listar):', status, error, xhr.responseText);\r\n    });\r\n  }\r\n\r\n  function carregar(id) {\r\n    $.get(`http://localhost:3000/atendimentos/${id}`, function(dados) {\r\n      $('#nome').val(dados.nome);\r\n      $('#profissional').val(dados.profissional);\r\n      // Ajuste para formatar a data vinda do DB para o input type=\"date\"\r\n      const dataParaInput = new Date(dados.data).toISOString().split('T')[0];\r\n      $('#data').val(dataParaInput);\r\n      $('#tipo').val(dados.tipo);\r\n      $('#observacoes').val(dados.observacoes);\r\n      $('#atendimento-form').data('id', id); // marca para edição\r\n    }).fail(function(xhr, status, error) { // Adicionado tratamento de erro para carregar\r\n        alert('Erro ao carregar atendimento para edição: ' + (xhr.responseJSON ? xhr.responseJSON.error : 'Erro desconhecido'));\r\n        console.error('Erro na requisição AJAX (carregar):', status, error, xhr.responseText);\r\n    });\r\n  }\r\n\r\n  function excluir(id) {\r\n    $.ajax({\r\n      url: `http://localhost:3000/atendimentos/${id}`,\r\n      method: 'DELETE',\r\n      success: function() {\r\n        alert('Atendimento excluído com sucesso!'); // Feedback visual\r\n        listar(); // Atualiza a lista após exclusão\r\n      },\r\n      error: function(xhr, status, error) { // Adicionado tratamento de erro para excluir\r\n        alert('Erro ao excluir atendimento: ' + (xhr.responseJSON ? xhr.responseJSON.error : 'Erro desconhecido'));\r\n        console.error('Erro na requisição AJAX (excluir):', status, error, xhr.responseText);\r\n      }\r\n    });\r\n  }\r\n\r\n  // Retorna o objeto público com as funções\r\n  return {\r\n    salvar: salvar,\r\n    listar: listar,\r\n    excluir: excluir,\r\n    carregar: carregar\r\n  };\r\n})();\r\n\r\n// ESTE É O ÚNICO BLOCO jQuery $(function() { ... }); QUE DEVE EXISTIR\r\n// Ele só é executado quando o DOM está pronto e o objeto 'atendimento' já foi definido.\r\n$(function() {\r\n  // Lista os atendimentos ao carregar a página\r\n  atendimento.listar();\r\n\r\n  // Listener para o formulário de cadastro/edição\r\n  $('#atendimento-form').on('submit', function(e) {\r\n    e.preventDefault(); // Evita o recarregamento da página\r\n    atendimento.salvar();\r\n  });\r\n\r\n  // Event delegation para o botão Excluir\r\n  $('#lista-atendimentos').on('click', '.excluir-btn', function() {\r\n    const id = $(this).closest('[data-id]').data('id');\r\n    if (confirm('Tem certeza que deseja excluir este atendimento?')) {\r\n      atendimento.excluir(id);\r\n    }\r\n  });\r\n\r\n  // Event delegation para o botão Editar\r\n  $('#lista-atendimentos').on('click', '.editar-btn', function() {\r\n    const id = $(this).closest('[data-id]').data('id');\r\n    atendimento.carregar(id);\r\n  });\r\n});\n\n//# sourceURL=webpack://atendimentos/./src/index.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	atendimentos = __webpack_exports__;
/******/ 	
/******/ })()
;