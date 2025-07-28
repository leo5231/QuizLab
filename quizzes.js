const quizzes = []
let quizAtual = []

let quizName = null

function nameCap() {
    const modalName = document.querySelector('.modal-name')
    modalName.classList.add('open')

    const nameButton = document.getElementById('name-button')
    const nameInput = document.getElementById('name-input')

    
   nameButton.addEventListener('click' ,function(){
        const nameQuiz = nameInput.value.trim()
        if(nameQuiz !== ''){
            quizName = nameQuiz

            modalName.classList.remove('open')

            criarQuiz()

            console.log(quizName)
        }
   })

}

function criarQuiz() {

    const overlay = document.querySelector('.modal-overlay')
    overlay.classList.add('open')
    
    const modal = document.querySelector('.criacao-container')
    modal.classList.add('open')

}

function adicionarPergunta() {
    
    
    const pergunta = document.getElementById('enunciado').value
    const alt1 = document.getElementById('alt1').value
    const alt2 = document.getElementById('alt2').value
    const alt3 = document.getElementById('alt3').value
    const alt4 = document.getElementById('alt4').value
    const radios = document.getElementsByName('resposta')
    
    let respostaCorreta = null

    for (let radio of radios){
        if(radio.checked){
            respostaCorreta = parseInt(radio.value)
            break
        }
    }

    if (pergunta && alt1 && alt2 && alt3 && alt4 && respostaCorreta !== null) {
        const novaPergunta = 
        {
            pergunta,
            alternativas: [alt1,alt2,alt3,alt4],
            respostaCorreta
        }

        quizAtual.push(novaPergunta)

      
        document.getElementById('enunciado').value = ''
        document.getElementById('alt1').value = ''
        document.getElementById('alt2').value = ''
        document.getElementById('alt3').value = ''
        document.getElementById('alt4').value = ''
        radios.forEach(r => r.checked = false)    
        
        alert('pergunta adicionada com sucesso')
        console.log(quizAtual)
    }else{
        alert('preencha todos os campos')
    }
}





function concluirQuiz() {
    
    
    
    
    const id = Date.now()
    
    if (quizAtual.length === 0) {
        alert('adicione pelo menos uma pergunta')
    }else{
        const novoQuiz =
        {
            quizName,
            id,
            perguntas: quizAtual
        }

        quizzes.push(novoQuiz)
        quizAtual = []
        quizName = null
        
        const modal = document.querySelector('.criacao-container')
        modal.classList.remove('open')
    
        const overlay = document.querySelector('.modal-overlay')
        overlay.classList.remove('open')
        
        
        
        console.log(quizzes)

        previewQuizzes()
    }
}

function previewQuizzes() {
    const quizzesContainer = document.getElementById('quiz-container')
    quizzesContainer.innerHTML = ''

    quizzes.forEach(quiz => {
        const div = document.createElement('div')
        div.classList.add('quizzes-card')
        div.innerHTML = 
        `
        <label>Tema do seu Quiz<label>
        <p>tema:${quiz.quizName}</p>
        
        <label>ID do seu Quiz<label>
        <p>id:${quiz.id}</p>

        <label>Tamanho do Quiz<label>
        <p>tamanho:${quiz.perguntas.length}</p>
           
        <button onclick="responderQuiz(${quiz.id})">Responder Quiz</button>

        `

        quizzesContainer.appendChild(div)
    });

}

function responderQuiz(id) {
    // Esconde outros elementos e mostra o container de resposta
    const responderContainer = document.getElementById('responder-container')
    responderContainer.classList.remove('hidden')
    responderContainer.innerHTML = ''

    // Busca o quiz pelo id
    const quiz = quizzes.find(q => q.id === id)
    if (!quiz) {
        alert('Quiz não encontrado!')
        return
    }

    let indicePergunta = 0
    let respostasUsuario = []

    function mostrarPergunta() {
        responderContainer.innerHTML = ''
        const perguntaObj = quiz.perguntas[indicePergunta]
        if (!perguntaObj) return

        const perguntaDiv = document.createElement('div')
        perguntaDiv.classList.add('pergunta-card')
        perguntaDiv.innerHTML = `
            <h2>Pergunta ${indicePergunta + 1} de ${quiz.perguntas.length}</h2>
            <p>${perguntaObj.pergunta}</p>
            <form id="form-resposta">
                ${perguntaObj.alternativas.map((alt, i) => `
                    <div class="choices">
                        <input type="radio" name="resposta" id="alt${i}" value="${i}" required>
                        <label for="alt${i}">${alt}</label>
                    </div>
                `).join('')}
                <button type="submit">${indicePergunta === quiz.perguntas.length - 1 ? 'Finalizar' : 'Próxima'}</button>
            </form>
        `
        responderContainer.appendChild(perguntaDiv)

        const form = document.getElementById('form-resposta')
        form.onsubmit = function(e) {
            e.preventDefault()
            const respostaSelecionada = form.resposta.value
            respostasUsuario[indicePergunta] = parseInt(respostaSelecionada)
            indicePergunta++
            if (indicePergunta < quiz.perguntas.length) {
                mostrarPergunta()
            } else {
                mostrarResultado()
            }
        }
    }

    function mostrarResultado() {
        let acertos = 0
        quiz.perguntas.forEach((perg, i) => {
            if (respostasUsuario[i] === perg.respostaCorreta) {
                acertos++
            }
        })
        responderContainer.innerHTML = `
            <div class="resultado-card">
                <h2>Resultado do Quiz</h2>
                <p>Você acertou <strong>${acertos}</strong> de <strong>${quiz.perguntas.length}</strong> perguntas!</p>
                <button id="fechar-resultado">Fechar</button>
            </div>
        `
        document.getElementById('fechar-resultado').onclick = function() {
            responderContainer.classList.add('hidden')
            responderContainer.innerHTML = ''
        }
    }

    mostrarPergunta()
}

