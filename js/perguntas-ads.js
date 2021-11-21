(function(){
    // Functions
    function buildPerguntas(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      perguntasContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = perguntasContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} acertos de ${myQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const perguntasContainer = document.getElementById('perguntas');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "<b>1º:</b> A engenharia de requisitos, do ponto de vista do processo de software, é uma ação de engenharia de software, é uma ação de engenharia de software importante, que se inicia durante a atividade de comunicação e continua na de modelagem. Ela deve ser adaptada às necessidades do processo, do projeto, do produto e das pessoas que estão realizando o trabalho. <br><br>Considere os requisitos, a seguir, de um sistema para uma universidade, na qual se pretenda gerenciar o setor acadêmico.<br><br> •	R1: o sistema deve permitir que cada professor realize lançamento de notas das turmas que lecionou;<br> •	R2: o sistema deverá ser desenvolvido de forma a possibilitar seu transporte para outro sistema operacional em, no máximo, sessenta dias;<br> •	R3: o sistema deve permitir que um estudante realize a sua matrícula nas disciplinas oferecidas em um semestre letivo;<br> •	R4: o sistema atualiza a nota do estudante, permitindo sua visualização, em até dois segundos depois do momento que o professor registra;<br> •	R5: o sistema deve permitir que o auxiliar de serviços acadêmicos realize de um estudante em não mais do que dez minutos de orientação.<br><br>Nessa situação, representam descrições de requisitos não funcionais apenas os requisitos:<br><br>",
        answers: {
          a: "R1, R2 e R3",
          b: "R1, R2 e R5",
          c: "R1, R3 e R4",
          d: "R2, R4 e R5",
          e: "R3, R4 e R5"
        },
        correctAnswer: "d"
      },
      {
        question: "<b>2º:</b> Na área de desenvolvimento de software, prazos, custos e qualidade são questões que demandam gerenciamento, para que se evitem atrasos, estouros orçamentários e sistemas que não atendam aos requisitos. <br><br>Sobre o modelo CMMI, avalie as asserções a seguir e a relação proposta entre elas.<br><br>I. O CMMI fornece diretrizes para a melhoria dos processos e habilidades organizacionais, incluindo o ciclo de vida de produtos e serviços, que abrange as fases de concepção, desenvolvimento, aquisição, entrega e manutenção. <br><br> PORQUE <br><br> II.	As empresas brasileiras estão aderindo a programas de fomento à melhoria da qualidade de software, por meio da aplicação do modelo de maturidade CMMI, que é mais direcionado às pequenas e médias empresas, apesar de também ser um modelo aplicável em grandes organizações, sejam elas públicas ou privadas.<br><br> A respeito dessas asserções, assinale a opção correta.<br><br>",
        answers: {
          a: "As asserções I e II são proposições verdadeiras, e a II é uma justificativa correta da I.",
          b: "As asserções I e II são proposições verdadeiras, mas a II não é uma justificativa correta da I.",
          c: "A asserção I é uma proposição verdadeira, e a II é uma proposição falsa.",
          d: "A asserção I é uma proposição falsa, e a II é uma proposição verdadeira.",
          e: "As asserções I e II são proposições falsas."
        },
        correctAnswer: "c"
      },
      {
        question: "<b>3º:</b> Os requisitos de um sistema consistem nas descrições daquilo que o sistema deve fazer, dos serviços que oferece e das restrições a seu funcionamento. Esses requisitos refletem as necessidades específicas dos clientes do sistema, como controlar um dispositivo, realizar um pedido ou encontrar informações. O processo de descobrir, analisar, documentar e verificar esses serviços e restrições é denominado de engenharia de requisitos.<br><br>Tendo o texto como referência, avalie as atribuições listadas a seguir, no que se refere à etapa de especificação de requisitos em projetos de software.<br><br>I.	Identificar as expectativas e necessidade dos stakeholders com relação ao software a ser desenvolvido.<br>II.	Distribuir os requisitos em categorias, explorar as relações entre eles e classificar sua importância para os stakeholders.<br>III.	Produzir um documento de especificação de requisitos, de forma que todos os stakeholders possam entendê-lo.<br>IV.	Examinar a especificação do software para assegurar que todos os requisitos foram definidos sem inconsistências.<br><br>São atribuições na etapa de especificação de requisitos os itens: <br><br>",
        answers: {
          a: "I e III, apenas.",
          b: "I e IV, apenas.",
          c: "II e III, apenas.",
          d: "II e IV, apenas.",
          e: "I, II, III e IV."
        },
        correctAnswer: "e"
      },
      {
        question: "<b>4º:</b> Após a implantação de um sistema em ambiente de produção, este passa para a fase de manutenção dentro do ciclo de vida do desenvolvimento de software. Os sistemas geralmente necessitam de diversos tipos de manutenção durante sua existência.<br><br>Considerando a etapa de manutenção no processo de desenvolvimento de software, avalie as afirmações a seguir:<br><br>I.	A fase de manutenção é uma parte explícita do modelo em cascata do processo de desenvolvimento de software.<br>II.	A atualização do sistema para inserir customizações é considerada um tipo de manutenção.<br>III.	A depuração do programa é um processo específico da fase de desenvolvimento e um tipo de manutenção.<br>IV.	O acréscimo de novas funções a um sistema existente, sem pertubar sua operação, é considerado um tipo de manutenção.<br>V.	A manutenção do sistema está relacionada ao aumento do ciclo de vida do software.<br><br>É correto apenas o que se afirma em:<br><br>",
        answers: {
          a: "I e III.",
          b: "IV e V.",
          c: "I, II e III",
          d: "I, II, IV e V.",
          e: "II, III, IV e V."
        },
        correctAnswer: "d"
      },
      {
        question: "<b>5º:</b> As redes de computadores estão por toda parte. A internet é uma delas, assim como as várias redes das quais ela é composta, que compartilham recursos por meio de Sistemas Distribuídos. Como o número de dispositivos tem crescido exponencialmente, em vez de paralelizar tarefas em várias máquinas, tornou-se cada vez mais importante empregar sistemas distribuídos, comunicando e coordenando dispositivos e, assim, contribuindo para o cotidiano de empresas, governos e demais instituições.<br><br>Nesse contexto, assinale a opção que apresenta exemplos atuais de sistemas distribuídos.<br><br>",
        answers: {
          a: "Pesquisa na web, jogos on-line, E-Commerce e o banco de dados das agências bancárias.",
          b: "Jogos on-line, E-commerce, pesquisa no Windows e e-mails.",
          c: "E-commerce, jogos em mídia física, pesquisa no Windows e redes sociais.",
          d: "Pesquisa na web, jogos em mídia física, E-commerce e e-mails.",
          e: "Pesquisa no Windows, pesquisa na web, jogos on-line e o banco de dados das agências bancárias."
        },
        correctAnswer: "a"
      },
      {
        question: "<b>6º:</b> Conceitualmente, cada processo tem sua própria CPU(Central Processing Unit) virtual. É claro que, na realidade, CPU troca a execução, a todo momento, de um processo para outro, mas para entender esse sistema, é muito mais fácil pensar em um conjunto de processos sendo executados(pseudo) paralelamente do que tentar controlar o modo como a CPU faz esses chaveamentos.<br><br>De acordo com o exposto, o conceito descrito denomina-se:<br><br>",
        answers: {
          a: "Thread.",
          b: "Multiprocessador.",
          c: "Multiprogramação.",
          d: "Processo monothread.",
          e: "Máquina de estados finitos."
        },
        correctAnswer: "c"
      },
      {
        question: "<b>7º:</b> Os modelos de processos foram propostas para trazer ordem ao caos existente na área de desenvolvimento de software. A história mostra que esses modelos trouxeram considerável contribuição no trabalho da engenharia de software.<br><br>A respeito dos modelos de processo, avalie as afirmações a seguir: <br><br>I.	São atividades do modelo incremental: especificação, desenvolvimento e validação.<br>II. No modelo espiral, a fase de modelagem é responsável, entre outras atividades, pela estimativa, cronograma e análise de risco.<br>III.	O modelo cascata sugere uma abordagem sequencial e sistemática para o desenvolvimento de software, iniciando na especificação de requisitos e finalizando com a entrega do software concluído.<br><br>É correto o que se afirma em:<br><br>",
        answers: {
          a: "II, apenas.",
          b: "III, apenas",
          c: "I e II, apenas",
          d: "I e III, apenas.",
          e: "I, II e III"
        },
        correctAnswer: "d"
      },
      {
        question: "<b>8º:</b> Um desenvolvedor de software recém-formado foi contratado para implementação de um projeto em uma empresa e, em reunião, recebeu várias explicações sobre como a gerência de configuração funcionava. <br><br>Considerando  essa situação, avalie as afirmações a seguir, referentes às informações dadas ao desenvolvedor.<br><br>I.	Inicialmente, para ter acesso à base de desenvolvimento, o profissional deve realizar uma operação de checkout para baixar os arquivos do projeto que estão armazenados no servidor.<br>II.	Na situação em que mais de um desenvolvedor estiver modificando um mesmo documento, ao se tentar realizar uma operação de commit, pode ser necessário realizar uma operação de tag(release) para resolução do conflito entre a versão local e a versão mais recente no repositório, caso algum desenvolvedor tenha submetido uma mudança no documento previamente.<br>III.	No desenvolvimento de um novo caso de uso, em que diversos arquivos sejam modificados, é recomendada a criação de uma ramificação(branch).<br>IV.	A versão estável é o ramo principal de desenvolvimento, que segue do começo do desenvolvimento até o momento presente.<br><br>É correto apenas o que se afirma em: <br><br>",
        answers: {
          a: "I e II.",
          b: "I e III.",
          c: "II e IV.",
          d: "I, III e IV.",
          e: "II, III e IV."
        },
        correctAnswer: "b"
      },
      {
        question: "<b>9º:</b> Um software com defeito pode ser consequência de problemas no levantamento dos requisitos, uma vez que o requisito pode ser ambíguo porque o cliente não estava convicto da sua real necessidade ou porque a equipe o interpretou mal e registrou uma especificação de forma incorreta. Por esses motivos, as verificações, as validações e os testes são fundamentais para se certificar da qualidade do software resultante.<br><br>Considerando esse contexto, avalie as afirmações a seguir.<br><br> I.	O teste funcional certifica se o software desempenha as funções especificadas nos requisitos.<br>II.	O teste de desempenho valida a conformidade da especificação do processo de desenvolvimento de software.<br>III.	O teste de aceitação é realizado pelo cliente a fim de validar se aquilo que foi implementado é o que foi solicitado.<br>IV.	O teste de instalação, invariavelmente, é executado no local determinado pelo cliente para instalação do software.<br>V.	As técnicas de verificação e validação de software asseguram que o sistema que está sendo desenvolvido seja adequado ao seu propósito.<br><br>É correto o que se afirma em:<br><br>",
        answers: {
          a: "I e IV.",
          b: "I, III e V.",
          c: "II, III e IV.",
          d: "II, IV e V.",
          e: "I, II, III e V."
        },
        correctAnswer: "b"
      },

      {
        question: "<b>10º:</b> Nas décadas de 1970 e 1980, muitos sistemas corporativos foram desenvolvidos com a linguagem Cobol, utilizando o Sistema Gerenciador de Banco de dados ADABAS e arquivos indexados do tipo ISAM e VISAM. Alguns desses produtos de implementação foram, ou estão sendo, descontinuados pelos seus fabricantes. Por isso, o trabalho de reengenharia desses sistemas, utilizando linguagens mais modernas, como Python, Java ou mesmo C++, associadas com sistemas de banco de dados mais atuais, apresenta-se como uma boa oportunidade de negócios.<br><br>Considerando esse cenário, avalie as afirmações a seguir.<br><br> I.	A dificuldade de reengenharia de sistemas antigos deve-se ao fato de que, na maioria das vezes, o desenvolvedor definia o sistema e esse já era o próprio processo da organização.<br>II.	O custo de alteração para modernização de uma linha de código em Cobol é alto, por isso, fazer a manutenção desses sistemas é menos despendioso.<br>III.	Uma estratégia de conversão dos referidos sistemas para uma linguagem orientada a objetos é definir uma estrutura de classes e métodos e realizar o refatoramento do código.<br><br>É correto o que se afirma em:<br><br>",
        answers: {
          a: "I, apenas.",
          b: "III, apenas.",
          c: "I e II, apenas.",
          d: "II e III, apenas.",
          e: "I, II e III."
        },
        correctAnswer: "e"
      },
    ];
  
    // Kick things off
    buildPerguntas();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  