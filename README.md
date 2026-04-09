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

Foi criada uma camada de serviço (`api.ts`) com delay artificial para simular comportamente de espera em chamadas reais.

---

### 🔹 Experiência do usuário (UX)

* Skeleton loading para evitar layout shift
* Feedback visual para estados vazios
* Hover e interações clicáveis
* Navegação fluida entre telas

---

## 🔧 Melhorias futuras

* Implementação de WebSocket para atualização em tempo real
* Paginação e ordenação da tabela
* Testes automatizados com Jest e React Testing Library
* Integração com API real
* Validação mais robusta no fluxo de decisão

---

## 🔐 Variáveis de ambiente

O projeto pode utilizar variáveis de ambiente via `.env.local`.

Exemplo:

```env
NEXT_PUBLIC_API_TOKEN=seu_token_aqui
```

---

## 👨‍💻 Autor

Desenvolvido por **Afonso Canalle**

---

## 📌 Considerações finais

O foco deste projeto foi criar uma experiência próxima de um sistema real, priorizando clareza de fluxo, organização de código e boas práticas de desenvolvimento frontend.
