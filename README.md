# Gatekeeper

## Objetivo do Projeto

O `gatekeeper` é uma solução backend focada em fornecer controle de acesso sofisticado e seguro para aplicações modernas. Em um ambiente de microserviços, o projeto tem como finalidade implementar regras de autorização, autenticação e políticas de segurança centralizadas para proteger recursos e endpoints.

### Diretrizes principais

- Arquitetura baseada em **NestJS** para modularidade e escalabilidade.
- Persistência de dados com **TypeORM** e **PostgreSQL** (conforme configuração de infra).
- Configuração orientada à facilidade de implantação em contêineres via Docker.
- Código organizado para permitir evolução contínua de políticas (role-based access, ABAC, etc.).

### Estrutura do repositório

- `apps/api/`: API principal, controle de rotas, módulos e integração com banco.
- `infra/docker/`: configurações de orquestração e ambientes Docker.

## Como usar

1. Acesse `apps/api`
2. Instale dependências: `npm install`
3. Configure variáveis de ambiente (DB, JWT, etc.)
4. Inicie: `npm run start:dev`

## Contato

Manter o repositório atualizado com documentação técnica e detalhes de design é importante para garantir clareza à equipe de desenvolvimento e operações.