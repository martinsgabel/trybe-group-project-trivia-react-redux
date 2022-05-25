export default function shuffleArray(arr) {
  // Loop em todos os elementos
  for (let i = arr.length - 1; i > 0; i - 1) {
    // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Retornando array com aleatoriedade
  return arr;
}

// https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/#:~:text=Veja%20a%20implementa%C3%A7%C3%A3o%20deste%20algoritmo%20na%20pr%C3%A1tica%3A
