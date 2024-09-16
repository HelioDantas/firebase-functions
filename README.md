# Firebase Functions - Listagem e Criação de Registros no Firestore

Este projeto implementa uma API utilizando **Firebase Functions** e **Firestore**. O objetivo principal é criar e listar registros em uma coleção do Firestore, com suporte para execução em ambiente de emulador.

## Arquitetura do Projeto

O projeto é baseado em uma arquitetura **Serverless** fornecida pelo **Firebase Functions**, com **Firestore** como banco de dados NoSQL.

### Componentes Principais

- **Firebase Functions**: Utilizamos funções HTTP para criar e listar registros. Cada função é acessível via uma URL gerada automaticamente pelo Firebase.
  - `createRecord`: Esta função recebe uma requisição POST com dados em JSON e cria um novo registro na coleção `records` do Firestore.
  - `listRecords`: Esta função responde a requisições GET, retornando todos os registros presentes na coleção `records`.
- **Firestore**: Usado para armazenar os registros de forma escalável e eficiente.
- **Emulador do Firebase**: A configuração local do Firebase permite que você desenvolva e teste o projeto sem depender de uma conexão com o Firebase em produção.

### Fluxo de Criação e Listagem de Registros

1. **Criação de Registro**: A função `createRecord` recebe dados via POST e insere um novo documento na coleção `records` do Firestore.
2. **Listagem de Registros**: A função `listRecords` consulta todos os documentos da coleção `records` e retorna uma lista em formato JSON.

### Design de Arquitetura

A arquitetura é baseada no padrão **Serverless**, o que permite escalabilidade automática e facilidade de manutenção. O uso de funções HTTP facilita a integração com outras aplicações e serviços. A persistência dos dados no Firestore é eficiente para um ambiente NoSQL, permitindo consultas rápidas e flexíveis.

A organização do projeto segue uma estrutura de boas práticas:

- **`functions/src/index.ts`**: Contém as definições das funções `createRecord` e `listRecords`.
- **Uso do Emulador**: Configuração local para o desenvolvimento sem custos de operação ou necessidade de uma conexão com a internet.

---

## Instalação e Configuração

### Pré-requisitos

1. **Node.js** (versão 18 ou superior)
2. **Firebase CLI** instalado globalmente. Para instalar, execute:
   ```bash
   npm install -g firebase-tools
   ´´´
3. Clone o repositorio
```bash
git clone <url-do-repositorio>
cd <nome-do-repositorio>
```
4. Instale e build o projeto
```bash
cd  functions
npm install
npm run build
```
5. Volte para a raiz e rode o emulador
```bash
cd ..
## Estou rodando o projeto como default
firebase emulators:start --project default
```
6. Faça a requisição http, você pode usar a extensaão REST Client do VsCode.
Abra o arquivo api.http e envie a chamada
