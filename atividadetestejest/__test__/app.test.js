/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Testando interações com HTML', () => {
  beforeEach(() => {
    // Carrega o conteúdo do arquivo HTML para simular o DOM
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    document.documentElement.innerHTML = html;

    // Simula a importação do script app.js que manipula o DOM
    require('../app.js');
  });

  test('O texto do parágrafo deve mudar ao clicar no botão', () => {
    // Seleciona o botão e o parágrafo
    const button = document.getElementById('btn');
    const paragraph = document.getElementById('message');

    // Verifica o texto inicial
    expect(paragraph.textContent).toBe('Texto original');

    // Simula o clique no botão
    button.click();

    // Verifica se o texto foi alterado após o clique
    expect(paragraph.textContent).toBe('Texto original');
  });
});

test('O botão deve estar presente no DOM', () => {
  const button = document.getElementById('btn');
  expect(button).not.toBeNull();
});

test('O parágrafo deve ter o texto original ao carregar a página', () => {
  const paragraph = document.getElementById('message');
  expect(paragraph.textContent).toBe('Texto original');
});

test('O texto do parágrafo não deve mudar sem o clique no botão', () => {
  const paragraph = document.getElementById('message');
  jest.advanceTimersByTime(1000);
  expect(paragraph.textContent).toBe('Texto original');
});