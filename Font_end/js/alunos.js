
        const API_URL = "http://localhost:8004/api/dados";

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
                        <td>${aluno.ações}
                        <button style = "display: flex;
                          color : #000 ;  
                          border: 2px ;
                          font-size: 18px;
                          border-radius: 20px;                     
                          font-family: "Raleway", sa  ns-serif;
                        
                        
                        "> Deletar </button>

                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            } catch (error) {
                console.error("Erro ao carregar alunos:", error);
                alert("Erro ao carregar a lista de alunos. Por favor, verifique o console para mais detalhes.");
            }
        }

  
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
                    const errorData = await resp.json(); 
                    let errorMessage = `Erro ao cadastrar aluno: ${resp.status} ${resp.statusText}`;
                    if (errorData && errorData.erro) {
                        errorMessage += ` Detalhes: ${errorData.erro}`; 
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


        window.onload = carregarAlunos;