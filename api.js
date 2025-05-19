const express = require('express');
const app = express();
const cors = require('cors');
const port = 8004;

app.use(express.json());
app.use(cors());

const data = [
    {
        "id": 430,
        "nome": "",
        "turma": "",
        "curso": "",
        "matricula": ""
    },
    {
        "id": 431,
        "nome": "Lucas",
        "turma": null,
        "curso": null,
        "matricula": null
    },
    {
        "id": 432,
        "nome": "Predo",
        "turma": "wev",
        "curso": "web",
        "matricula": "2132131"
    },
    {
        "id": 433,
        "nome": "Predo",
        "turma": "wev",
        "curso": "web",
        "matricula": "2132131"
    },
    {
        "id": 434,
        "nome": "Predo",
        "turma": "wev",
        "curso": "web",
        "matricula": "2132131"
    },
    {
        "id": 435,
        "nome": "Predo",
        "turma": "wev",
        "curso": "web",
        "matricula": "2132131"
    },
    {
        "id": 436,
        "nome": "Predo",
        "turma": "wev",
        "curso": "web",
        "matricula": "2132131"
    },
    {
        "id": 437,
        "nome": "Predo",
        "turma": "wev",
        "curso": "web",
        "matricula": "2132131"
    },
    {
        "id": 438,
        "nome": "Predo",
        "turma": "wev",
        "curso": "web",
        "matricula": "2132131"
    },
    {
        "id": 439,
        "nome": "Predo",
        "turma": "web",
        "curso": "web",
        "matricula": "2132131"
    }
];

app.get('/api/dados', (req, res) => {
    res.json(data);
});

app.post('/api/dados', (req, res) => {
    const novoAluno = {
        id: data.length > 0 ? Math.max(...data.map(a => a.id)) + 1 : 1,
        ...req.body
    };
    data.push(novoAluno);
    console.log("Aluno inserido:", novoAluno);
    res.status(201).json(novoAluno);
});


app.delete('/api/dados/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const index = data.findIndex(aluno => aluno.id === id); 

    if (index !== -1) { 
        data.splice(index, 1); y
        res.status(200).json({ mensagem: "Aluno removido com sucesso!" }); 
    } else { 
        res.status(404).json({ mensagem: "Aluno não encontrado!" }); 
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
