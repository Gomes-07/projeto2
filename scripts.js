const button = document.querySelector('.button-task')
const input= document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-task')

let minhaListaDeItens = []

function adicionarNovaTarefa(){
    //chat que fez isso para não colocar coisas em branco
    if (input.value.trim() === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }
    
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    })

    input.value = ''

    mostrarTarefas()
}

function mostrarTarefas(){
    
    let novaLi=''

    minhaListaDeItens.forEach((item, posicao)=> {
        novaLi= novaLi + `
        
            <li class="task ${item.concluida && "done"}">
                <img src="./img/checked.png" alt="check na tarefa" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="./img/trash.png" alt="tarefa para o lixo" onclick="deletarItem(${posicao})">
            </li>
            `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens)) //JSON.stringify transforma objetos em strings para poderem ser guardados no localStorage
}

function concluirTarefa(posicao){
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida //valor dele = ele mesmo invertido

    mostrarTarefas()
}

function deletarItem(posicao){
    minhaListaDeItens.splice(posicao, 1)
    
    mostrarTarefas()
}

function recarregarTarefas(){
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if(tarefasDoLocalStorage){
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }
    mostrarTarefas()
}

recarregarTarefas()

button.addEventListener('click', adicionarNovaTarefa)
//chat que fez isso depois
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        adicionarNovaTarefa();
    }
});

