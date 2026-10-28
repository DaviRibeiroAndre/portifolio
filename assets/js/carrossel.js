const carrossel = document.querySelector('.carrossel-projetos');
const projetos = [...carrossel.querySelectorAll('.cartao-projeto')];
const indicadores = [...document.querySelectorAll('.indicador-carrossel')];
const posicao = document.querySelector('.posicao-carrossel');
const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)');
let atual = 0;
let quadro;
function mostrarProjeto(indice) {
  const destino = (indice + projetos.length) % projetos.length;
  const distancia = projetos[destino].getBoundingClientRect().left - carrossel.getBoundingClientRect().left + carrossel.scrollLeft - 2;
  carrossel.scrollTo({
    left: distancia,
    behavior: movimentoReduzido.matches ? 'instant' : 'smooth'
  });
}
function atualizarPosicao() {
  const inicio = carrossel.getBoundingClientRect().left + 2;
  atual = projetos.reduce((melhor, projeto, indice) => {
    const distanciaAtual = Math.abs(projeto.getBoundingClientRect().left - inicio);
    const distanciaMelhor = Math.abs(projetos[melhor].getBoundingClientRect().left - inicio);
    return distanciaAtual < distanciaMelhor ? indice : melhor;
  }, 0);
  indicadores.forEach((indicador, indice) => {
    if (indice === atual) indicador.setAttribute('aria-current', 'true');
    else indicador.removeAttribute('aria-current');
  });
  posicao.textContent = `${atual + 1} de ${projetos.length}`;
}
document.querySelector('.anterior').addEventListener('click', () => mostrarProjeto(atual - 1));
document.querySelector('.proximo').addEventListener('click', () => mostrarProjeto(atual + 1));
indicadores.forEach((indicador, indice) => indicador.addEventListener('click', () => mostrarProjeto(indice)));
carrossel.addEventListener('scroll', () => {
  cancelAnimationFrame(quadro);
  quadro = requestAnimationFrame(atualizarPosicao);
}, {passive: true});
carrossel.addEventListener('keydown', evento => {
  if (evento.target !== carrossel) return;
  if (evento.key === 'ArrowRight' || evento.key === 'ArrowLeft') {
    evento.preventDefault();
    mostrarProjeto(atual + (evento.key === 'ArrowRight' ? 1 : -1));
  }
});
window.addEventListener('resize', atualizarPosicao);
atualizarPosicao();

const paginasApi = [...document.querySelectorAll('.pagina-api')];
const botoesApi = [...document.querySelectorAll('.botao-api')];
let apiAtual = 0;
function mostrarApi(indice) {
  apiAtual = (indice + paginasApi.length) % paginasApi.length;
  paginasApi.forEach((pagina, numero) => {
    pagina.hidden = numero !== apiAtual;
  });
  botoesApi.forEach((botao, numero) => {
    if (numero === apiAtual) botao.setAttribute('aria-current', 'true');
    else botao.removeAttribute('aria-current');
  });
  document.querySelector('.posicao-api').textContent = `API ${apiAtual + 1} de ${paginasApi.length}`;
}
botoesApi.forEach((botao, numero) => botao.addEventListener('click', () => mostrarApi(numero)));
document.querySelector('.api-anterior').addEventListener('click', () => mostrarApi(apiAtual - 1));
document.querySelector('.api-proxima').addEventListener('click', () => mostrarApi(apiAtual + 1));
