(function(){
  // Functions
  function buildQuiz(){
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
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

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

    // mostrar total
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
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "<b>1??:</b> Durante o projeto da rede de uma empresa, muitas vezes ?? necess??rio limitar o dominio de broadcast, dividindo a rede em diversas LANs(Local Area Networks). Uma forma flex??vel de se realizar esse particionamento ?? por meio do uso de VLANs(virtual LANs). Nesse caso, diversas redes l??gicas s??o criadas em um mesmo switch f??sico, o qual segrega o tr??fego entre elas. <br><br>No que se refere ??s VLANs, avalie as informa????es a seguir. <br><br> I.	O padr??o IEEE 802.1Q especifica como pode ser estabelecido o trunking, isto ??, a liga????o ponto a ponto entre os dois switches que compartilham mais de uma VLAN.<br>II.	A interliga????o entre duas VLANs pode ser realizada sem a necessidade de um equipamento da camada de rede, uma vez que elas compartilham o mesmo switch.<br>III.	?? poss??vel criar um VLAN em fun????o dos endere??os MAC de seus membros, ou seja, um equipamento far?? parte da VLAN independentemente da porta do switch onde ele seja conectado.<br>IV.	Equipamentos ligados em uma mesma VLAN, em switches diferentes que estejam ligados entre si, fazem parte de diferentes dom??nios de colis??o.<br><br> ?? correto apenas o que se afirma em:",
      answers: {
        a: "I e II",
        b: "I e III",
        c: "III e IV",
        d: "I, II e IV",
        e: "II, III e IV"
      },
      correctAnswer: "b"
    },
    {
      question: "<b>2??:</b> A virtualiza????o, tecnologia que prov?? uma abstra????o dos recursos f??sicos e l??gicos, permite que inst??ncias de um sistema operacional sejam executadas em hardware virtual, suportadas por um hipervisor que gerencia o acesso aos recursos do hardware f??sico. <br><br>Considerando que, para a elabora????o e implanta????o de projetos l??gicos e f??sicos, a virtualiza????o ?? considerada na manuten????o, administra????o, seguran??a e gerenciamento de servi??os de redes de computadores em um datacenter, avalie as informa????es a seguir.<br><br>I.	A virtualiza????o faz com que um ??nico recurso de hardware suporte v??rias inst??ncias simult??neas de sistemas, ou que v??rios recursos de hardware suportem uma inst??ncia ??nica de sistema.<br>II.	Na virtualiza????o, um drive de disco pode ser particionado e apresentado como v??rios drives de disco para um sistema computacional.<br>III.	Na virtualiza????o, v??rios drives de disco podem ser concatenados e apresentados como um ??nico drive de disco para um sistema computacional.<br><br> ?? correto apenas o que se afirma em:",
      answers: {
        a: "I, apenas",
        b: "III, apenas",
        c: "I e II, apenas",
        d: "II e III, apenas",
        e: "I, II e III."
      },
      correctAnswer: "e"
    },
    {
      question: "<b>3??:</b> Desenvolver um projeto de redes de computadores ?? uma atividade complexa, pois envolve componentes com caracter??sticas distintas, como os observados nos elementos f??sicos, al??m de uma gama para o seu funcionamento l??gico.Por essa raz??o, ?? necess??ria a aplica????o de uma metodologia que permita a um projeto atender aos requisitos determinados.<br><br> Sabendo que a abordagem Top-Down ?? uma das metodologias adotadas para constru????o de projetos, assinale a alternativa correta. <br><br>",
      answers: {
        a: "A metodologia Top-Down consiste de tr??s fases: projeto de rede l??gica, projeto de rede f??sica e documenta????o da rede.",
        b: "A metodologia Top-Down restringe as altera????es de projeto ao longo da execu????o, pois cada fase da metodologia ?? bem definida",
        c: "A metodologia Top-Down consiste em realizar uma estrutura anal??tica de projeto(EAP) definindo os projetos f??sico e l??gico antes de sua execu????o",
        d: "A metodologia Top-Down considera para sua an??lise de requisitos as pol??ticas e normas em uso no cliente, sendo as restri????es or??ament??rias e de pessoal tratadas em outras esferas de planejamento corporativo.",
        e: "A metodologia Top-Down inspira-se no modelo RM-OSI, em que h?? um foco nas metas do neg??cio do cliente, analisando os aplicativos, as sess??es e o transporte de dados para que sejam selecionados os equipamentos e a m??dia utilizada nas camadas mais baixas"
      },
      correctAnswer: "e"
    },
    {
      question: "<b>4??:</b> O protocolo IPv6 foi desenvolvido para substituir o IPv4, tendo sua implementa????o ocasionado v??rias mudan??as importantes, como a capacidade de endere??amento expandida, o cabe??alho aprimorado de 40 bytes e a rotula????o de fluxo e prioridade.<br><br>Considerando essas informa????es, avalie as afirma????es a seguir, relativas ?? descri????o dos campos do cabe??alho IPv6. <br><br>I.	Em ???endere??o de origem??? e ???endere??o de destino??? cada campo possui 64 bits, tendo sido expandidos os 32 bits usados no IPv4.<br>II.	Em se tratando do cabe??alho IPv6, insere-se o valor 32 no campo ???vers??o???, de 4 bits que ?? usado para identificar a vers??o do protocolo IP.<br>III.	O campo ???prox??mo cabe??alho??? identifica o protocolo ao qual os dados presentes no datagrama ser??o entregues, por exemplo. TCP ou UDP.<br>IV.	No IPv6, o campo ???classe de tr??fego???, de 8 bits, ?? semelhante ao campo ???tipo de servi??o??? do IPv4, ambos utilizados para diferenciar os tipos de pacotes IP.<br>V.	O valor do campo ???limite de saltos??? ?? decrementado em um para cada roteador que repassa o pacote; caso a contagem do limite de salto chegue a zero, o pacote ser?? descartado.<br><br>?? correto apenas o que se afirma em:",
      answers: {
        a: "II e IV.",
        b: "I, II e III.",
        c: "I, III e V.",
        d: "III, IV e V",
        e: "I, II, IV e V."
      },
      correctAnswer: "d"
    },
    {
      question: "<b>5??:</b> Em uma rede local de uma institui????o banc??ria, a foi implantado um sistema gerenciador de banco de dados(SGBD), tendo o administrador efetuado um comando GRANT para a realiza????o das configura????es de acesso ao SGBD na rede.<br><br>Com o objetivo de realizar autentica????o por aplica????es para acesso ao banco de dados, de forma segura, devem ser enviados ao servidor:<br><br>",
      answers: {
        a: "O IP do servidor e a senha.",
        b: "A senha e o endere??o MAC.",
        c: "O IP do servidor e o endere??o MAC.",
        d: "O IP do servidor, nome f??sico do banco e a senha.",
        e: "O IP do cliente, o nome f??sico do banco, a senha e o endere??o MAC."
      },
      correctAnswer: "d"
    },
    {
      question: "<b>6??:</b> A principal alternativa segura para acesso remoto consiste nas redes privadas virtuais, ou VPN(Virtual Private Network). Uma VPN permite que usu??rios geograficamente remotos troquem dados por meio de uma rede existente ??? mais comumente a internet ??? de forma segura. A t??cnica b??sica fornece um caminho seguro de transmiss??o, conhecido como um t??nel que pode conectar dois sistemas ou duas redes. Duas t??cnicas populares de implementa????o de VPNs s??o a que utiliza o IPSec(Internet Protocol Security) e a que utiliza o SSL(Secure Sockets Layer).<br><br>Em rela????o ??s t??cnicas de VPNs IPSec e VPNs SSL, avalie as asser????es a seguir e a rela????o proposta entre elas.<br><br>I.	Na defini????o de uma VPN ponto a ponto, onde se exige alto volume de transa????es e baixa lat??ncia, ?? mais indicado o uso do IPSec do que o uso do SSL.<br><strong>PORQUE</strong><br> II.   Tanto o IPSec como o SSL normalmente usam a t??cnica de sequenciamento de pacotes para detectar ataques de replay(repeti????o de mensagens), sendo o IPSec mais eficiente que o SSL nesse caso.<br><br> A respeito dessas asser????es, assinale a op????o correta.",
      answers: {
        a: "As asser????es I e II s??o proposi????es verdadeiras, e a II ?? uma justificativa correta da I.",
        b: "As asser????es I e II s??o proposi????es verdadeiras, mas a II n??o ?? uma justificativa correta da I.",
        c: "A asser????o I ?? uma proposi????o verdadeira, e a II ?? uma proposi????o falsa.",
        d: "A asser????o I ?? uma proposi????o falsa, e a II ?? uma proposi????o verdadeira.",
        e: "As asser????es I e II s??o proposi????es falsas."
      },
      correctAnswer: "a"
    },
    {
      question: "<b>7??:</b> Um servi??o de diret??rio, em uma descri????o simplificada, constitui uma base de dados que armazena e organiza informa????es de um grupo de usu??rios e permite aos administradores gerenciar o acesso destes aos sistemas e recursos computacionais.<br><br>A partir dessa informa????o, ?? correto afirmar que a autentica????o no servi??o do diret??rio: <br><br>",
      answers: {
        a: "Impede o compartilhamento de privil??gios em diferentes bases de dados",
        b: "Fornece acesso e privil??gio de superusu??rio a todos os servi??os disponibilizados.",
        c: "Elimina a necessidade de aplica????o de criptografias e de uso de protocolos de autentica????o.",
        d: "Valida a identifica????o do usu??rio junto ?? base de dados, por??m n??o lida com fatores de limita????o de acesso, ou com a????es a que esse usu??rio esteja submetido.",
        e: "Consiste em  verificar a identidade de um usu??rio, um dispositivo ou uma entidade que deseja acessar dados, recursos ou aplica????es, dispon??veis em diferentes servidores."
      },
      correctAnswer: "e"
    },
    {
      question: "<b>8??:</b> A diretoria de uma empresa identificou os seguintes problemas, que t??m afetado os seus neg??cios:<br><br>A partir dessa informa????o, ?? correto afirmar que a autentica????o no servi??o do diret??rio: <br><br> ???	falta de m??tricas para controlar seus produtos;<br> ???	processos escassos ou inexistentes;<br> ???	falta de foco em seus neg??cios;<br> ???	descontrole dos processos.<br><br>Nessa situa????o, o guia de boas pr??ticas indicado para otimizar o investimento em tecnologia da informa????o, de forma a melhorar o retorno sobre o investimento e fornecer m??tricas para a avalia????o dos resultados dessa empresa ?? o:<br><br> ",
      answers: {
        a: "ITIL.",
        b: "COBIT.",
        c: "CMMI",
        d: "MPDS-BR.",
        e: "PMBOK."
      },
      correctAnswer: "b"
    },
    {
      question: "<b>9??:</b> A fun????o da auditoria de sistemas ?? promover adequa????o, revis??o, avalia????o e recomenda????es para o aprimoramento dos controles internos em qualquer um dos sistemas de informa????o da empresa, bem como avaliar a utiliza????o dos recursos humanos, materiais e tecnol??gicos envolvidos no processamento desses sistemas.<br><br>Com base nessas informa????es, avalie as afirma????es a seguir.<br><br>I.	A auditoria de sistemas permite detectar, de forma autom??tica, o uso dos recursos e dos fluxos de informa????o em uma empresa, embora n??o identifique qual informa????o ?? cr??tica para o cumprimento da miss??o e objetivos empresariais.<br>II.	As ferramentas de auditoria classificadas como generalistas apresentam softwares com a capacidade de processar, analisar e simular amostras e apontar poss??veis duplicidades.<br>III.	As ferramentas de auditoria classificadas como de utilidade geral apresentam softwares pr??prios para a execu????o de fun????es muito comuns de processamento, como sortear arquivos, concatenar, sumarizar e gerar relat??rios.<br><br>?? correto o que se afirma em: <br><br>",
      answers: {
        a: "I, apenas.",
        b: "III, apenas.",
        c: "I e II, apenas.",
        d: "II e III, apenas.",
        e: "I, II e III."
      },
      correctAnswer: "d"
    },
    {
      question: "<b>10??:</b> O instituto de Engenheiros Eletricistas e Eletr??nicos(IEEE) padronizou as redes locais e metropolitanas com o nome IEEE 802. Entre os mais conhecidos padr??es de redes locais, citam-se o Ethernet 802.3, que padroniza propriedades f??sicas para as redes cabeadas, e o padr??o 802.11, que define redes sem fio.<br><br>Considerando a diferen??a entre padr??es de rede, assinale a op????o correta:",
      answers: {
        a: "Redes sem fio oferecem um caminho com menor probabilidade de interfer??ncia ou perda de dados quando comparadas ??s redes cabeadas.",
        b: "O m??todo de acesso para o padr??o 802.3 ?? o CSMA/CD, ao passo que, para o padr??o 802.11, o m??todo de acesso ?? o CSMA/CA.",
        c: "Os padr??es 802.11a, 802.11b e 802.11g operam na mesma faixa de frequ??ncia e, assim, podem comunicar-se entre si.",
        d: "Em redes sem fio, a qualidade de servi??o n??o ?? comprometida pela associa????o ou desassocia????o de esta????es m??veis.",
        e: "Os padr??es 802.3 e 802.11 n??o podem coexistir na mesma rede local."
      },
      correctAnswer: "b"
    },
  ];

  // Kick things off
  buildQuiz();

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
