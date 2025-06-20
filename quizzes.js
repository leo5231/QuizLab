 

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
           
        <button onclick="responderQuiz(quiz.id)">Responder Quiz</button>

        `

        quizzesContainer.appendChild(div)
    });

    function responderQuiz(id) {
        console.log()
    }
}

