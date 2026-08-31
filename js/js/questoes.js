import { supabase } from "./supabase.js";

const lista = document.getElementById("question-list");
const status = document.getElementById("list-status");

async function carregarQuestoes() {
  if (!lista) return;

  status.textContent = "Carregando questões...";

  const { data, error } = await supabase
    .from("questoes")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Erro ao buscar questões:", error);
    status.textContent = "Não foi possível carregar as questões.";
    lista.innerHTML = "";
    return;
  }

  status.textContent = `${data.length} questão(ões) encontrada(s).`;

  if (data.length === 0) {
    lista.innerHTML = "<p>Nenhuma questão encontrada.</p>";
    return;
  }

  lista.innerHTML = "";

  data.forEach((questao) => {
    const article = document.createElement("article");
    article.className = "card";

    article.innerHTML = `
      <h2>${questao.titulo}</h2>

      <p><strong>Matéria:</strong> ${questao.materia}</p>
      <p><strong>Assunto:</strong> ${questao.assunto}</p>
      <p><strong>Dificuldade:</strong> ${questao.dificuldade}</p>

      <p>${questao.enunciado}</p>

      <ol type="A">
        <li>${questao.alternativa_a}</li>
        <li>${questao.alternativa_b}</li>
        <li>${questao.alternativa_c}</li>
        <li>${questao.alternativa_d}</li>
        <li>${questao.alternativa_e}</li>
      </ol>

      <details>
        <summary>Ver gabarito e explicação</summary>

        <p>
          <strong>Gabarito:</strong>
          ${questao.resposta_correta}
        </p>

        <p>${questao.explicacao || ""}</p>

        ${
          questao.dica
            ? `<p><strong>Dica:</strong> ${questao.dica}</p>`
            : ""
        }
      </details>
    `;

    lista.appendChild(article);
  });
}

carregarQuestoes();
