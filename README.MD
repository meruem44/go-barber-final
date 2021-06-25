**RF**
-> Requisitos funcionais : Quais as funcionalidades que teremos

**RNF**
-> Requisitos Não funcionais : São coisas que não diretamente ligada a regra de negócio da nossa aplicação, São requisitos da parte mais tecnicas

**RN**
-> Regra de negócio

- O usuário deve poder recuperar sua senha informando o seu e-mail

# Recuperação de Senha

**RF** -> Requisitos funcionais :

- O usuário deve poder recuperar sua senha informando o seu e-mail
- O usuário deve receber um e-mail com instruções de recuperação de senha
- O usuário deve poder resetar a sua senha

**RNF**

- Utilizar Mailtrap para testar envios em ambientes de dev
- Utilizar Amazon SES para envios de produção
- O envio do e-mails deve acontecer em segundo plano (Background job)

**RF**

- O link enviado por e-mail para resetar senha, deve expirar em 2h
- O usuário precisa confirmar a nova senha ao resetar sua senha

# Atualização de Senhas

**RF**

- O usuário deve poder atualizar seu perfil (nome, email e senha)

**RF**

- **RF**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado
- Para atualizar sua senha, o usuário deve informar sua senha antiga
- Para atualizar sua senha, o usuário deve confirmar sua senha

# Painel do Prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia especifico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidas

**RNF**
**RF**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar
- As notificações deve ser armazenadas no MongoDB
- As notificações do prestador deve ser enviadas em tempo real utilizando Socket.io

# Agendamento dos Serviços

**RF**

- O usuário deve poder listar todos os prestadores cadastrados
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador
- O usuário deve listar os horários disponíveis em um dia especifico de um prestador
- O usuário deve poder realizar um novo agendamento com um prestador

**RNF**

- A listagem de prestadores deve ser armazenada em cache

**RF**

- Cada agendamento deve durar 1h extamente
- Os agendamentos devem estar disponíveis entre as 8h ás 18h (Primeiro ás 8h, ultimo as 17 horas)
- O usuário não pode agendar um horário já ocupado
- O usuário não pode agendar um horário que já passou
- O usuário não pode agendar um horário com ele mesmo
