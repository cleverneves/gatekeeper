# Gatekeeper

## Objetivo do Projeto

O `gatekeeper` é uma solução backend focada em fornecer controle de acesso sofisticado e seguro para aplicações modernas. Em um ambiente de microserviços, o projeto tem como finalidade implementar regras de autorização, autenticação e políticas de segurança centralizadas para proteger recursos e endpoints.

### Diretrizes principais

- Arquitetura baseada em **NestJS** para modularidade e escalabilidade.
- Persistência de dados com **TypeORM** e **PostgreSQL** (conforme configuração de infra).
- Configuração orientada à facilidade de implantação em contêineres via Docker.
- Código organizado para permitir evolução contínua de políticas (role-based access, ABAC, etc.).

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicações Node.js escaláveis.
- **TypeORM**: ORM para TypeScript/JavaScript com suporte a múltiplos bancos de dados.
- **PostgreSQL**: Banco de dados relacional robusto.
- **class-validator** e **class-transformer**: Para validação e transformação de dados.
- **Docker**: Para containerização e orquestração de ambientes.

## Estrutura do Repositório

- `apps/api/`: API principal, controle de rotas, módulos e integração com banco.
  - `src/users/`: Módulo de usuários, incluindo decorators para validação (ex.: match.decorator.ts).
  - `src/configs/`: Configurações, como TypeORM.
- `infra/docker/`: Configurações de orquestração e ambientes Docker (docker-compose.yml).

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Docker e Docker Compose

## Instalação e Execução

### Desenvolvimento Local

1. Clone o repositório e acesse a pasta do projeto.
2. Acesse `apps/api`:
   ```bash
   cd apps/api
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente (crie um arquivo `.env` baseado em `.env.example`, se existir):
   - Conexão com banco de dados PostgreSQL.
   - Chaves JWT para autenticação.
5. Inicie o servidor em modo desenvolvimento:
   ```bash
   npm run start:dev
   ```

### Usando Docker

1. Na raiz do projeto, acesse `infra/docker`:
   ```bash
   cd infra/docker
   ```
2. Execute o Docker Compose para subir os serviços:
   ```bash
   docker-compose up -d
   ```
   Isso iniciará a API e o banco de dados PostgreSQL em containers.

## Módulos Principais

- **Usuários (Users)**: Gerenciamento de usuários, incluindo validação de campos e autenticação.

## Contribuição

Manter o repositório atualizado com documentação técnica e detalhes de design é importante para garantir clareza à equipe de desenvolvimento e operações. Para contribuir, siga as diretrizes de commit e abra pull requests para revisões.