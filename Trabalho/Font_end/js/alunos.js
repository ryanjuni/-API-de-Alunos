
        const API_URL = "http://localhost:8004/api/dados";

        // Função assíncrona para buscar alunos da API e exibir na tabela
        async function carregarAlunos() {
            try {
                const resp = await fetch(API_URL);
                if (!resp.ok) {
                    throw new Error(`Erro ao buscar alunos: ${resp.status} ${resp.statusText}`);
                }
                const alunos = await resp.json();
                const tbody = document.getElementById("alunosBody");
                tbody.innerHTML = "";
                alunos.forEach(aluno => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${aluno.id}</td>
                        <td>${aluno.nome}</td>
                        <td>${aluno.matricula}</td>  
                        <td>${aluno.turma}</td>
                        <td>${aluno.curso}</td>
                    `;
                    tbody.appendChild(tr);
                });
            } catch (error) {
                console.error("Erro ao carregar alunos:", error);
                alert("Erro ao carregar a lista de alunos. Por favor, verifique o console para mais detalhes.");
            }
        }

        // Evento de envio do formulário de cadastro
        document.getElementById("alunoForm").addEventListener("submit", async function (e) {
            e.preventDefault();
            const nome = document.getElementById("nome").value.trim();
            const matricula = document.getElementById("matricula").value.trim();
            const turma = document.getElementById("turma").value.trim();
            const curso = document.getElementById("curso").value.trim();

            if (!nome || !matricula || !turma || !curso) {
                alert("Preencha todos os campos.");
                return;
            }

            try {
                const resp = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nome, matricula, turma, curso }),
                });

                if (!resp.ok) {
                    const errorData = await resp.json(); // Tenta obter detalhes do erro da resposta
                    let errorMessage = `Erro ao cadastrar aluno: ${resp.status} ${resp.statusText}`;
                    if (errorData && errorData.erro) {
                        errorMessage += ` Detalhes: ${errorData.erro}`; // Adiciona detalhes, se disponíveis
                    }
                    throw new Error(errorMessage);
                }

                alert("Aluno inserido com sucesso!");
                this.reset();
                carregarAlunos();
            } catch (error) {
                console.error("Erro ao salvar aluno na API:", error);
            
            }
        });

        // Carrega a lista de alunos ao carregar a página
        window.onload = carregarAlunos;