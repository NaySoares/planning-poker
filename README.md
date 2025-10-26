# Planning Poker Scrum

![screenshot](https://raw.githubusercontent.com/NaySoares/planning-poker/refs/heads/main/github/planningPokerScreen.png)

## Cartas/estimativas dos jogadores

- [x] Cada jogador precisa ter uma mão de cartas.
- [x] Cartas devem ser clicáveis para o jogador escolher sua estimativa.
- [x] Cada carta clicada deve ficar visível apenas para o jogador até a rodada ser revelada.

## Revelação das cartas
- [x] Quando todos os jogadores escolherem ou o moderador liberar, as cartas devem virar mostrando a estimativa.
- [x] Pode incluir animação de flip 3D para dar efeito visual.

## Status da rodada
- [x] Indicar quantos jogadores já estimaram.
- [x] Mostrar quem ainda não escolheu (opcional).

## Interação do moderador / central
- [ ] Controlar o início e fim da rodada.
- [ ] Permitir reiniciar para a próxima tarefa.
- [ ] Atualizar o quadro central para nova tarefa.
- [x] Cadastrar várias tarefas antes e durante as rodadas

## Feedback visual
- [x] Cartas clicadas podem ter destaque visual para o jogador.
- [x] Animação para tornar mais interativo.

## Backend / sincronização

- [ ] Precisará de WebSocket / socket.io ou outro método de sincronização para os jogadores reais.
- [ ] Cada clique de carta deve ser enviado para o servidor e transmitido aos demais clientes.

## Responsividade / mobile
- [ ] Ajustar mesa, avatares, e cartas para telas menores, garantindo que tudo seja clicável e visível. (opcional)

## Extras
- [ ] Contador de tempo da rodada (opcional)
- [ ] Histórico de estimativas
- [x] Indicação de média / consenso da estimativa
- [ ] Se houver divergência alta permitir uma reestimativa (reset da rodada), os divergentes devem concordar em não reestimar através de um botão.

## 💡 Resumo visual do fluxo ideal:
1. Moderador seleciona tarefa → quadro central é atualizado
2. Jogadores clicam em cartas (suas escolhas ficam privadas)
3. Status indica quem já escolheu
4. Moderador libera a revelação → cartas viram simultaneamente
5. Estimativas e média podem ser mostradas → próxima rodada