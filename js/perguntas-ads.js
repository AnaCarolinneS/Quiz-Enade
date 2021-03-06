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
        question: "<b>1??:</b> A engenharia de requisitos, do ponto de vista do processo de software, ?? uma a????o de engenharia de software, ?? uma a????o de engenharia de software importante, que se inicia durante a atividade de comunica????o e continua na de modelagem. Ela deve ser adaptada ??s necessidades do processo, do projeto, do produto e das pessoas que est??o realizando o trabalho. <br><br>Considere os requisitos, a seguir, de um sistema para uma universidade, na qual se pretenda gerenciar o setor acad??mico.<br><br> ???	R1: o sistema deve permitir que cada professor realize lan??amento de notas das turmas que lecionou;<br> ???	R2: o sistema dever?? ser desenvolvido de forma a possibilitar seu transporte para outro sistema operacional em, no m??ximo, sessenta dias;<br> ???	R3: o sistema deve permitir que um estudante realize a sua matr??cula nas disciplinas oferecidas em um semestre letivo;<br> ???	R4: o sistema atualiza a nota do estudante, permitindo sua visualiza????o, em at?? dois segundos depois do momento que o professor registra;<br> ???	R5: o sistema deve permitir que o auxiliar de servi??os acad??micos realize de um estudante em n??o mais do que dez minutos de orienta????o.<br><br>Nessa situa????o, representam descri????es de requisitos n??o funcionais apenas os requisitos:<br><br>",
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
        question: "<b>2??:</b> Na ??rea de desenvolvimento de software, prazos, custos e qualidade s??o quest??es que demandam gerenciamento, para que se evitem atrasos, estouros or??ament??rios e sistemas que n??o atendam aos requisitos. <br><br>Sobre o modelo CMMI, avalie as asser????es a seguir e a rela????o proposta entre elas.<br><br>I. O CMMI fornece diretrizes para a melhoria dos processos e habilidades organizacionais, incluindo o ciclo de vida de produtos e servi??os, que abrange as fases de concep????o, desenvolvimento, aquisi????o, entrega e manuten????o. <br><br> PORQUE <br><br> II.	As empresas brasileiras est??o aderindo a programas de fomento ?? melhoria da qualidade de software, por meio da aplica????o do modelo de maturidade CMMI, que ?? mais direcionado ??s pequenas e m??dias empresas, apesar de tamb??m ser um modelo aplic??vel em grandes organiza????es, sejam elas p??blicas ou privadas.<br><br> A respeito dessas asser????es, assinale a op????o correta.<br><br>",
        answers: {
          a: "As asser????es I e II s??o proposi????es verdadeiras, e a II ?? uma justificativa correta da I.",
          b: "As asser????es I e II s??o proposi????es verdadeiras, mas a II n??o ?? uma justificativa correta da I.",
          c: "A asser????o I ?? uma proposi????o verdadeira, e a II ?? uma proposi????o falsa.",
          d: "A asser????o I ?? uma proposi????o falsa, e a II ?? uma proposi????o verdadeira.",
          e: "As asser????es I e II s??o proposi????es falsas."
        },
        correctAnswer: "c"
      },
      {
        question: "<b>3??:</b> Os requisitos de um sistema consistem nas descri????es daquilo que o sistema deve fazer, dos servi??os que oferece e das restri????es a seu funcionamento. Esses requisitos refletem as necessidades espec??ficas dos clientes do sistema, como controlar um dispositivo, realizar um pedido ou encontrar informa????es. O processo de descobrir, analisar, documentar e verificar esses servi??os e restri????es ?? denominado de engenharia de requisitos.<br><br>Tendo o texto como refer??ncia, avalie as atribui????es listadas a seguir, no que se refere ?? etapa de especifica????o de requisitos em projetos de software.<br><br>I.	Identificar as expectativas e necessidade dos stakeholders com rela????o ao software a ser desenvolvido.<br>II.	Distribuir os requisitos em categorias, explorar as rela????es entre eles e classificar sua import??ncia para os stakeholders.<br>III.	Produzir um documento de especifica????o de requisitos, de forma que todos os stakeholders possam entend??-lo.<br>IV.	Examinar a especifica????o do software para assegurar que todos os requisitos foram definidos sem inconsist??ncias.<br><br>S??o atribui????es na etapa de especifica????o de requisitos os itens: <br><br>",
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
        question: "<b>4??:</b> Ap??s a implanta????o de um sistema em ambiente de produ????o, este passa para a fase de manuten????o dentro do ciclo de vida do desenvolvimento de software. Os sistemas geralmente necessitam de diversos tipos de manuten????o durante sua exist??ncia.<br><br>Considerando a etapa de manuten????o no processo de desenvolvimento de software, avalie as afirma????es a seguir:<br><br>I.	A fase de manuten????o ?? uma parte expl??cita do modelo em cascata do processo de desenvolvimento de software.<br>II.	A atualiza????o do sistema para inserir customiza????es ?? considerada um tipo de manuten????o.<br>III.	A depura????o do programa ?? um processo espec??fico da fase de desenvolvimento e um tipo de manuten????o.<br>IV.	O acr??scimo de novas fun????es a um sistema existente, sem pertubar sua opera????o, ?? considerado um tipo de manuten????o.<br>V.	A manuten????o do sistema est?? relacionada ao aumento do ciclo de vida do software.<br><br>?? correto apenas o que se afirma em:<br><br>",
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
        question: "<b>5??:</b> As redes de computadores est??o por toda parte. A internet ?? uma delas, assim como as v??rias redes das quais ela ?? composta, que compartilham recursos por meio de Sistemas Distribu??dos. Como o n??mero de dispositivos tem crescido exponencialmente, em vez de paralelizar tarefas em v??rias m??quinas, tornou-se cada vez mais importante empregar sistemas distribu??dos, comunicando e coordenando dispositivos e, assim, contribuindo para o cotidiano de empresas, governos e demais institui????es.<br><br>Nesse contexto, assinale a op????o que apresenta exemplos atuais de sistemas distribu??dos.<br><br>",
        answers: {
          a: "Pesquisa na web, jogos on-line, E-Commerce e o banco de dados das ag??ncias banc??rias.",
          b: "Jogos on-line, E-commerce, pesquisa no Windows e e-mails.",
          c: "E-commerce, jogos em m??dia f??sica, pesquisa no Windows e redes sociais.",
          d: "Pesquisa na web, jogos em m??dia f??sica, E-commerce e e-mails.",
          e: "Pesquisa no Windows, pesquisa na web, jogos on-line e o banco de dados das ag??ncias banc??rias."
        },
        correctAnswer: "a"
      },
      {
        question: "<b>6??:</b> Conceitualmente, cada processo tem sua pr??pria CPU(Central Processing Unit) virtual. ?? claro que, na realidade, CPU troca a execu????o, a todo momento, de um processo para outro, mas para entender esse sistema, ?? muito mais f??cil pensar em um conjunto de processos sendo executados(pseudo) paralelamente do que tentar controlar o modo como a CPU faz esses chaveamentos.<br><br>De acordo com o exposto, o conceito descrito denomina-se:<br><br>",
        answers: {
          a: "Thread.",
          b: "Multiprocessador.",
          c: "Multiprograma????o.",
          d: "Processo monothread.",
          e: "M??quina de estados finitos."
        },
        correctAnswer: "c"
      },
      {
        question: "<b>7??:</b> Os modelos de processos foram propostas para trazer ordem ao caos existente na ??rea de desenvolvimento de software. A hist??ria mostra que esses modelos trouxeram consider??vel contribui????o no trabalho da engenharia de software.<br><br>A respeito dos modelos de processo, avalie as afirma????es a seguir: <br><br>I.	S??o atividades do modelo incremental: especifica????o, desenvolvimento e valida????o.<br>II. No modelo espiral, a fase de modelagem ?? respons??vel, entre outras atividades, pela estimativa, cronograma e an??lise de risco.<br>III.	O modelo cascata sugere uma abordagem sequencial e sistem??tica para o desenvolvimento de software, iniciando na especifica????o de requisitos e finalizando com a entrega do software conclu??do.<br><br>?? correto o que se afirma em:<br><br>",
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
        question: "<b>8??:</b> Um desenvolvedor de software rec??m-formado foi contratado para implementa????o de um projeto em uma empresa e, em reuni??o, recebeu v??rias explica????es sobre como a ger??ncia de configura????o funcionava. <br><br>Considerando  essa situa????o, avalie as afirma????es a seguir, referentes ??s informa????es dadas ao desenvolvedor.<br><br>I.	Inicialmente, para ter acesso ?? base de desenvolvimento, o profissional deve realizar uma opera????o de checkout para baixar os arquivos do projeto que est??o armazenados no servidor.<br>II.	Na situa????o em que mais de um desenvolvedor estiver modificando um mesmo documento, ao se tentar realizar uma opera????o de commit, pode ser necess??rio realizar uma opera????o de tag(release) para resolu????o do conflito entre a vers??o local e a vers??o mais recente no reposit??rio, caso algum desenvolvedor tenha submetido uma mudan??a no documento previamente.<br>III.	No desenvolvimento de um novo caso de uso, em que diversos arquivos sejam modificados, ?? recomendada a cria????o de uma ramifica????o(branch).<br>IV.	A vers??o est??vel ?? o ramo principal de desenvolvimento, que segue do come??o do desenvolvimento at?? o momento presente.<br><br>?? correto apenas o que se afirma em: <br><br>",
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
        question: "<b>9??:</b> Um software com defeito pode ser consequ??ncia de problemas no levantamento dos requisitos, uma vez que o requisito pode ser amb??guo porque o cliente n??o estava convicto da sua real necessidade ou porque a equipe o interpretou mal e registrou uma especifica????o de forma incorreta. Por esses motivos, as verifica????es, as valida????es e os testes s??o fundamentais para se certificar da qualidade do software resultante.<br><br>Considerando esse contexto, avalie as afirma????es a seguir.<br><br> I.	O teste funcional certifica se o software desempenha as fun????es especificadas nos requisitos.<br>II.	O teste de desempenho valida a conformidade da especifica????o do processo de desenvolvimento de software.<br>III.	O teste de aceita????o ?? realizado pelo cliente a fim de validar se aquilo que foi implementado ?? o que foi solicitado.<br>IV.	O teste de instala????o, invariavelmente, ?? executado no local determinado pelo cliente para instala????o do software.<br>V.	As t??cnicas de verifica????o e valida????o de software asseguram que o sistema que est?? sendo desenvolvido seja adequado ao seu prop??sito.<br><br>?? correto o que se afirma em:<br><br>",
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
        question: "<b>10??:</b> Nas d??cadas de 1970 e 1980, muitos sistemas corporativos foram desenvolvidos com a linguagem Cobol, utilizando o Sistema Gerenciador de Banco de dados ADABAS e arquivos indexados do tipo ISAM e VISAM. Alguns desses produtos de implementa????o foram, ou est??o sendo, descontinuados pelos seus fabricantes. Por isso, o trabalho de reengenharia desses sistemas, utilizando linguagens mais modernas, como Python, Java ou mesmo C++, associadas com sistemas de banco de dados mais atuais, apresenta-se como uma boa oportunidade de neg??cios.<br><br>Considerando esse cen??rio, avalie as afirma????es a seguir.<br><br> I.	A dificuldade de reengenharia de sistemas antigos deve-se ao fato de que, na maioria das vezes, o desenvolvedor definia o sistema e esse j?? era o pr??prio processo da organiza????o.<br>II.	O custo de altera????o para moderniza????o de uma linha de c??digo em Cobol ?? alto, por isso, fazer a manuten????o desses sistemas ?? menos despendioso.<br>III.	Uma estrat??gia de convers??o dos referidos sistemas para uma linguagem orientada a objetos ?? definir uma estrutura de classes e m??todos e realizar o refatoramento do c??digo.<br><br>?? correto o que se afirma em:<br><br>",
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
  