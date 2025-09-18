console.log("Script localizado")

const tamanhoDsenha = document.getElementById('tamanhoSenha');
const incluirLetraMaiuscula = document.getElementById('letrasMaiusculas');
const incluirLetraMinusculas = document.getElementById('letrasMinusculas');
const incluirNumeros = document.getElementById('adicionarNumeros');
const incluirSimbolos = document.getElementById('adicionarSimbolos');
const gerarSenhaBotao = document.getElementById('botaoGerar');
const saidaSenha = document.getElementById('senhaGerada');

const lMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%~&*()_-+={}[];:.,<>/?*|'";

function gerarSenhas(){
    let caracteres = "";
    let senha = "";
    const tamanho = parseInt(tamanhoDsenha.value);

    if (incluirLetraMaiuscula.checked){
        caracteres += lMaiusculas;
        console.log("incluiu letra maiuscula");
    }
    if (incluirLetraMinusculas.checked){
        caracteres += lMinusculas;
        console.log("incluiu letra minusculas");
    }
    if (incluirNumeros.checked){
        caracteres += numeros;
        console.log("incluiu numeros");
    }
    if (incluirSimbolos.checked){
        caracteres += simbolos;
        console.log("incluiu simbolos");
    }
    // para caso o usuario não selecionar nada
    if (caracteres === ""){
        alert ("Selecione ao menos uma opção!");
        return
    }

    // criando a senha
    for (let i = 0; i < tamanho; i++){
        const indexRandom = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indexRandom];
    }

    saidaSenha.value = senha;
}

gerarSenhaBotao.addEventListener('click', gerarSenhas);

//desativando o recarregamento da pagina pelo enter
document.addEventListener('keydown', function(event){
    if (event.key === 'Enter'){
        event.preventDefault();
    }
});

//codigo do botão de copiar
function copiarTexto(){
    var saidaSenha = document.getElementById('senhaGerada');

    saidaSenha.select();
    saidaSenha.setSelectionRange(0, 99999);

}

const mensagemDeCopiada = document.getElementById('mensagemCopiado');
const mensagemDeErro = document.getElementById('mensagemDeErro');
const botaoDeCopiarSenha = document.getElementById('botaoDeCopiarSenha');
// const gerarSenhaBotao = document.getElementById('botaoGerar');
// const saidaSenha = document.getElementById('senhaGerada');

botaoDeCopiarSenha.addEventListener('click', async() => {
    mensagemDeCopiada.style.display = 'none';
    mensagemDeErro.style.display = 'none';
    saidaSenha.classList.remove('input-invalido');

    if (saidaSenha.value.trim() === ''){
        mensagemDeErro.style.display = 'block';
        saidaSenha.classList.add('input-invalido')

        setTimeout(() => {
            mensagemDeErro.style.display = 'none';
        }, 3000);

        return;
    }

    try{
        await navigator.clipboard.writeText(saidaSenha.value);
        exibirMensagemTemporariamente();
    } catch (err){
        console.error('Falha ao copiar o texto: ', err);
        alert('Erro ao copiar o texto. Por favor, tente novamente');
    }
});

function exibirMensagemTemporariamente(){
    mensagemDeCopiada.style.display = 'block';

    setTimeout(() => {
        mensagemDeCopiada.style.display = 'none';
    }, 3000);
}