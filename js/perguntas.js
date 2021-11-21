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
      question: "<b>1º:</b> Durante o projeto da rede de uma empresa, muitas vezes é necessário limitar o dominio de broadcast, dividindo a rede em diversas LANs(Local Area Networks). Uma forma flexível de se realizar esse particionamento é por meio do uso de VLANs(virtual LANs). Nesse caso, diversas redes lógicas são criadas em um mesmo switch físico, o qual segrega o tráfego entre elas. <br><br>No que se refere às VLANs, avalie as informações a seguir. <br><br> I.	O padrão IEEE 802.1Q especifica como pode ser estabelecido o trunking, isto é, a ligação ponto a ponto entre os dois switches que compartilham mais de uma VLAN.<br>II.	A interligação entre duas VLANs pode ser realizada sem a necessidade de um equipamento da camada de rede, uma vez que elas compartilham o mesmo switch.<br>III.	É possível criar um VLAN em função dos endereços MAC de seus membros, ou seja, um equipamento fará parte da VLAN independentemente da porta do switch onde ele seja conectado.<br>IV.	Equipamentos ligados em uma mesma VLAN, em switches diferentes que estejam ligados entre si, fazem parte de diferentes domínios de colisão.<br><br> É correto apenas o que se afirma em:",
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
      question: "<b>2º:</b> A virtualização, tecnologia que provê uma abstração dos recursos físicos e lógicos, permite que instâncias de um sistema operacional sejam executadas em hardware virtual, suportadas por um hipervisor que gerencia o acesso aos recursos do hardware físico. <br><br>Considerando que, para a elaboração e implantação de projetos lógicos e físicos, a virtualização é considerada na manutenção, administração, segurança e gerenciamento de serviços de redes de computadores em um datacenter, avalie as informações a seguir.<br><br>I.	A virtualização faz com que um único recurso de hardware suporte várias instâncias simultâneas de sistemas, ou que vários recursos de hardware suportem uma instância única de sistema.<br>II.	Na virtualização, um drive de disco pode ser particionado e apresentado como vários drives de disco para um sistema computacional.<br>III.	Na virtualização, vários drives de disco podem ser concatenados e apresentados como um único drive de disco para um sistema computacional.<br><br> É correto apenas o que se afirma em:",
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
      question: "<b>3º:</b> Desenvolver um projeto de redes de computadores é uma atividade complexa, pois envolve componentes com características distintas, como os observados nos elementos físicos, além de uma gama para o seu funcionamento lógico.Por essa razão, é necessária a aplicação de uma metodologia que permita a um projeto atender aos requisitos determinados.<br><br> Sabendo que a abordagem Top-Down é uma das metodologias adotadas para construção de projetos, assinale a alternativa correta. <br><br>",
      answers: {
        a: "A metodologia Top-Down consiste de três fases: projeto de rede lógica, projeto de rede física e documentação da rede.",
        b: "A metodologia Top-Down restringe as alterações de projeto ao longo da execução, pois cada fase da metodologia é bem definida",
        c: "A metodologia Top-Down consiste em realizar uma estrutura analítica de projeto(EAP) definindo os projetos físico e lógico antes de sua execução",
        d: "A metodologia Top-Down considera para sua análise de requisitos as políticas e normas em uso no cliente, sendo as restrições orçamentárias e de pessoal tratadas em outras esferas de planejamento corporativo.",
        e: "A metodologia Top-Down inspira-se no modelo RM-OSI, em que há um foco nas metas do negócio do cliente, analisando os aplicativos, as sessões e o transporte de dados para que sejam selecionados os equipamentos e a mídia utilizada nas camadas mais baixas"
      },
      correctAnswer: "e"
    },
    {
      question: "<b>4º:</b> O protocolo IPv6 foi desenvolvido para substituir o IPv4, tendo sua implementação ocasionado várias mudanças importantes, como a capacidade de endereçamento expandida, o cabeçalho aprimorado de 40 bytes e a rotulação de fluxo e prioridade.<br><br>Considerando essas informações, avalie as afirmações a seguir, relativas à descrição dos campos do cabeçalho IPv6. <br><br>I.	Em “endereço de origem” e “endereço de destino” cada campo possui 64 bits, tendo sido expandidos os 32 bits usados no IPv4.<br>II.	Em se tratando do cabeçalho IPv6, insere-se o valor 32 no campo “versão”, de 4 bits que é usado para identificar a versão do protocolo IP.<br>III.	O campo “proxímo cabeçalho” identifica o protocolo ao qual os dados presentes no datagrama serão entregues, por exemplo. TCP ou UDP.<br>IV.	No IPv6, o campo “classe de tráfego”, de 8 bits, é semelhante ao campo “tipo de serviço” do IPv4, ambos utilizados para diferenciar os tipos de pacotes IP.<br>V.	O valor do campo “limite de saltos” é decrementado em um para cada roteador que repassa o pacote; caso a contagem do limite de salto chegue a zero, o pacote será descartado.<br><br>É correto apenas o que se afirma em:",
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
      question: "<b>5º:</b> Em uma rede local de uma instituição bancária, a foi implantado um sistema gerenciador de banco de dados(SGBD), tendo o administrador efetuado um comando GRANT para a realização das configurações de acesso ao SGBD na rede.<br><br>Com o objetivo de realizar autenticação por aplicações para acesso ao banco de dados, de forma segura, devem ser enviados ao servidor:<br><br>",
      answers: {
        a: "O IP do servidor e a senha.",
        b: "A senha e o endereço MAC.",
        c: "O IP do servidor e o endereço MAC.",
        d: "O IP do servidor, nome físico do banco e a senha.",
        e: "O IP do cliente, o nome físico do banco, a senha e o endereço MAC."
      },
      correctAnswer: "d"
    },
    {
      question: "<b>6º:</b> A principal alternativa segura para acesso remoto consiste nas redes privadas virtuais, ou VPN(Virtual Private Network). Uma VPN permite que usuários geograficamente remotos troquem dados por meio de uma rede existente – mais comumente a internet – de forma segura. A técnica básica fornece um caminho seguro de transmissão, conhecido como um túnel que pode conectar dois sistemas ou duas redes. Duas técnicas populares de implementação de VPNs são a que utiliza o IPSec(Internet Protocol Security) e a que utiliza o SSL(Secure Sockets Layer).<br><br>Em relação às técnicas de VPNs IPSec e VPNs SSL, avalie as asserções a seguir e a relação proposta entre elas.<br><br>I.	Na definição de uma VPN ponto a ponto, onde se exige alto volume de transações e baixa latência, é mais indicado o uso do IPSec do que o uso do SSL.<br><strong>PORQUE</strong><br> II.   Tanto o IPSec como o SSL normalmente usam a técnica de sequenciamento de pacotes para detectar ataques de replay(repetição de mensagens), sendo o IPSec mais eficiente que o SSL nesse caso.<br><br> A respeito dessas asserções, assinale a opção correta.",
      answers: {
        a: "As asserções I e II são proposições verdadeiras, e a II é uma justificativa correta da I.",
        b: "As asserções I e II são proposições verdadeiras, mas a II não é uma justificativa correta da I.",
        c: "A asserção I é uma proposição verdadeira, e a II é uma proposição falsa.",
        d: "A asserção I é uma proposição falsa, e a II é uma proposição verdadeira.",
        e: "As asserções I e II são proposições falsas."
      },
      correctAnswer: "a"
    },
    {
      question: "<b>7º:</b> Um serviço de diretório, em uma descrição simplificada, constitui uma base de dados que armazena e organiza informações de um grupo de usuários e permite aos administradores gerenciar o acesso destes aos sistemas e recursos computacionais.<br><br>A partir dessa informação, é correto afirmar que a autenticação no serviço do diretório: <br><br>",
      answers: {
        a: "Impede o compartilhamento de privilégios em diferentes bases de dados",
        b: "Fornece acesso e privilégio de superusuário a todos os serviços disponibilizados.",
        c: "Elimina a necessidade de aplicação de criptografias e de uso de protocolos de autenticação.",
        d: "Valida a identificação do usuário junto à base de dados, porém não lida com fatores de limitação de acesso, ou com ações a que esse usuário esteja submetido.",
        e: "Consiste em  verificar a identidade de um usuário, um dispositivo ou uma entidade que deseja acessar dados, recursos ou aplicações, disponíveis em diferentes servidores."
      },
      correctAnswer: "e"
    },
    {
      question: "<b>8º:</b> A diretoria de uma empresa identificou os seguintes problemas, que têm afetado os seus negócios:<br><br>A partir dessa informação, é correto afirmar que a autenticação no serviço do diretório: <br><br> •	falta de métricas para controlar seus produtos;<br> •	processos escassos ou inexistentes;<br> •	falta de foco em seus negócios;<br> •	descontrole dos processos.<br><br>Nessa situação, o guia de boas práticas indicado para otimizar o investimento em tecnologia da informação, de forma a melhorar o retorno sobre o investimento e fornecer métricas para a avaliação dos resultados dessa empresa é o:<br><br> ",
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
      question: "<b>9º:</b> A função da auditoria de sistemas é promover adequação, revisão, avaliação e recomendações para o aprimoramento dos controles internos em qualquer um dos sistemas de informação da empresa, bem como avaliar a utilização dos recursos humanos, materiais e tecnológicos envolvidos no processamento desses sistemas.<br><br>Com base nessas informações, avalie as afirmações a seguir.<br><br>I.	A auditoria de sistemas permite detectar, de forma automática, o uso dos recursos e dos fluxos de informação em uma empresa, embora não identifique qual informação é crítica para o cumprimento da missão e objetivos empresariais.<br>II.	As ferramentas de auditoria classificadas como generalistas apresentam softwares com a capacidade de processar, analisar e simular amostras e apontar possíveis duplicidades.<br>III.	As ferramentas de auditoria classificadas como de utilidade geral apresentam softwares próprios para a execução de funções muito comuns de processamento, como sortear arquivos, concatenar, sumarizar e gerar relatórios.<br><br>É correto o que se afirma em: <br><br>",
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
      question: "<b>10º:</b> O instituto de Engenheiros Eletricistas e Eletrônicos(IEEE) padronizou as redes locais e metropolitanas com o nome IEEE 802. Entre os mais conhecidos padrões de redes locais, citam-se o Ethernet 802.3, que padroniza propriedades físicas para as redes cabeadas, e o padrão 802.11, que define redes sem fio.<br><br>Considerando a diferença entre padrões de rede, assinale a opção correta:",
      answers: {
        a: "Redes sem fio oferecem um caminho com menor probabilidade de interferência ou perda de dados quando comparadas às redes cabeadas.",
        b: "O método de acesso para o padrão 802.3 é o CSMA/CD, ao passo que, para o padrão 802.11, o método de acesso é o CSMA/CA.",
        c: "Os padrões 802.11a, 802.11b e 802.11g operam na mesma faixa de frequência e, assim, podem comunicar-se entre si.",
        d: "Em redes sem fio, a qualidade de serviço não é comprometida pela associação ou desassociação de estações móveis.",
        e: "Os padrões 802.3 e 802.11 não podem coexistir na mesma rede local."
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
