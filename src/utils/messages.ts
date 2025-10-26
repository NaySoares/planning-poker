export const messagesCardsFibonacci = {
  1: "Tá na mão!",
  2: "Mamão com açúcar.",
  3: "Não é nenhum bicho de sete cabeças.",
  5: "Agora o bicho começou a pegar.",
  8: "Custa os olhos da cara!",
  13: "Número do azar... e da gambiarra!",
  21: "Descasca esse abacaxi.",
  34: "Essa é só na fé!",
  55: "Nem o café salva essa, chama o Sênior!",
  89: "Agora deu ruim geral!",
  144: "A bruxa tá solta!",
  "☕": "Hora do cafézinho!",
}

export const messagesCardsScrum = {
  1: "Tá na mão!",
  2: "Mamão com açúcar.",
  3: "Não é nenhum bicho de sete cabeças.",
  5: "Agora o bicho começou a pegar.",
  8: "Custa os olhos da cara!",
  13: "Número do azar... e da gambiarra!",
  20: "Descasca esse abacaxi.",
  40: "Essa é só na fé!",
  100: "Nem o café salva essa, chama o Sênior!",
  "☕": "Hora do cafézinho!",
}

export function getMessageCardByValue(deck: 'fibonacci' | 'scrum', value: string | number): string {
  const deckMessages = deck === 'fibonacci' ? messagesCardsFibonacci : messagesCardsScrum;
  return deckMessages[value as keyof typeof deckMessages] || "Sem mensagem disponível.";
}

export const aboutText = `
<strong>Sobre o Projeto</strong>
<p>
O Planning Poker é uma plataforma colaborativa que visa facilitar o processo de estimativa e planejamento em equipe oferecendo uma abordagem lúdica e interativa com resultados visuais e coesos para todos os participantes.
</p>
<br />
<strong>Como funciona</strong>
<p>
Crie uma sala, compartilhe o código com sua equipe, cadastre as tarefas e comece a estimar utilizando cartas digitais. Cada membro da equipe pode selecionar uma carta que representa sua estimativa, promovendo discussões construtivas e alinhamento de expectativas.
</p>
<br />
<strong>Equipe</strong>
<ul>
  <li>Elienai Soares - Desenvolvedor Backend</li>
  <li>Elienai Soares - Desenvolvedor Frontend</li>
  <li>Elienai Soares - Designer UI/UX</li>
  <li>Elienai Soares - DevOps</li>
</ul>
`

export const termsOfUseText = `
<i>Última atualização: 26 de outubro de 2025</i>
<br />
<br />
<p>
Bem-vindo ao Planning Poker!
Ao utilizar nosso aplicativo, você concorda com os termos abaixo. Leia atentamente antes de continuar.
</p>
<br />
<ul>
<li><strong>1 - Uso da Plataforma:</strong>

O aplicativo é destinado apenas para fins recreativos e de colaboração.
É proibido o uso do sistema para fins ilegais, ofensivos ou que prejudiquem outros usuários.

</li>
<li><strong>2 - Criação de Conta:</strong>

O usuário é responsável por manter suas informações atualizadas e pelo uso de sua conta.
O Planning Poker não se responsabiliza por danos causados por compartilhamento de credenciais.

</li>
<li><strong>3 - Dados e Privacidade:</strong>

As informações fornecidas são utilizadas apenas para identificação dentro das salas e não são compartilhadas com terceiros.

</li>
<li><strong>4 - Conteúdo Gerado por Usuários:</strong>

O Planning Poker não se responsabiliza por mensagens, imagens ou nomes de jogadores inseridos pelos próprios usuários.

</li>
<li><strong>5 - Modificações e Encerramento:</strong>

Podemos atualizar estes termos a qualquer momento. O uso contínuo da plataforma implica concordância com as mudanças.
</li>
</ul>
`

export const contactText = `
<strong>Fale Conosco</strong>
<br />
<p>
Tem dúvidas, sugestões ou encontrou um problema?
Entre em contato, teremos prazer em ajudar!
</p>
<br />
<strong>📧 E-mail:</strong> elienay.soares07@gmail.com
<br />
<strong>🐙 GitHub:</strong> github.com/naysoares
<br />
<strong>📱 Versão atual:</strong> 1.0.0-beta
<br />
<br />
<p>
Respondemos assim que possível. Muito obrigado por usar o Planning Poker!
</p>
`