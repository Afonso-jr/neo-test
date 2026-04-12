# 🧾 Neo Crédito — Teste Técnico Frontend

Este projeto foi desenvolvido como parte do teste técnico para a vaga de Desenvolvedor Frontend, com foco no módulo de **Assinatura Eletrônica**.

O objetivo é simular um sistema interno utilizado por times operacionais para acompanhar e validar propostas de crédito.

---

## 🚀 Tecnologias utilizadas

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **React Hooks**
* Mock de API local (simulação de backend)

---

## 📦 Como rodar o projeto

```bash
# instalar dependências
npm install

# rodar o projeto
npm run dev
```

Acesse em:

```
http://localhost:3000
```

---

## 🧩 Funcionalidades implementadas

### 📊 Painel do CORBAN

* Listagem de propostas de assinatura
* Status visual (Aguardando, Assinado, Recusado, Expirado)
* Busca por nome ou número da proposta
* Loading com skeleton (UX melhorada)
* Feedback de lista vazia
* Navegação ao clicar na proposta

---

### 📄 Dossiê de Assinatura

* Visualização dos dados do assinante:
  * Nome
  * Status atualizado
  * CPF
  * IP
  * Data de assinatura
* Exibição de localização via mapa ( Google Maps )
* Visualização de:
  * Selfie
  * Documento
* Zoom nas imagens (simulação de análise antifraude)
* Score de similaridade facial (mockado)

---

## 🧠 Decisões técnicas

### 🔹 Estrutura com Next.js App Router

Escolhido para melhor organização de rotas e escalabilidade do projeto.

---

### 🔹 Separação por camadas

O projeto foi dividido em:

* `components` → UI reutilizável
* `services` → simulação de API
* `mocks` → dados mockados
* `types` → tipagem TypeScript

Essa abordagem facilita manutenção e evolução.

---

### 🔹 Simulação de API

Foi criada uma camada de serviço (`api.ts`) com delay artificial (2s) para simular comportamente de espera em chamadas reais.

---

### 🔹 Experiência do usuário (UX)

* Skeleton loading para evitar layout shift
* Feedback visual para estados vazios
* Hover e interações clicáveis
* Navegação fluida entre telas
* Aprovação e reprovação de propostas com modais de confirmação
* Campo de motivo para reprovação com registro no console

---

## 🔧 Melhorias futuras

* Implementação de WebSocket para atualização em tempo real
* Paginação e ordenação dos dados da tabela
* Otimizar as requisições com paginação no backend (lazy loading), evitando o carregamento de grandes volumes de dados (ex: 100 registros)
* Integração com API real
* Validação mais robusta no fluxo de decisão
* Melhoria mobile ( Transformação de tabela em cards )

---

## 🔐 Variáveis de ambiente

O projeto utiliza variáveis de ambiente via `.env.local`.

Para executar corretamente, crie um arquivo chamado .env.local na raiz do projeto e adicione as seguintes variáveis:

```
NEXT_PUBLIC_API_TOKEN=neo_token_2026_secret
```
---

## 🧪 Testes

Para rodar os testes, utilize:

```bash
npm run test

---

## 👨‍💻 Autor

Desenvolvido por **Afonso Canalle**

---

## 📌 Considerações finais

O foco deste projeto foi criar uma experiência próxima de um sistema real, priorizando clareza de fluxo, organização de código e boas práticas de desenvolvimento frontend.
