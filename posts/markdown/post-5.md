# Docker para Desenvolvedores

**Docker** revolucionou a forma como desenvolvemos e deployamos aplicações.

## O que é Docker?

Docker é uma plataforma que permite empacotar aplicações em **containers**, garantindo que rodem da mesma forma em qualquer ambiente.

## Conceitos Básicos

### Imagem
Blueprint do container

### Container
Instância em execução da imagem

### Dockerfile
Receita para criar a imagem

## Exemplo Prático

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Comandos Essenciais
```bash
# Construir imagem
docker build -t minha-app .

# Rodar container
docker run -p 3000:3000 minha-app

# Listar containers
docker ps

# Parar container
docker stop <container-id>
```

## Docker Compose

Para orquestrar múltiplos containers:
```yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: senha
```

## Vantagens

- Ambiente consistente
- Isolamento
- Portabilidade
- Escalabilidade

## Conclusão

Docker é **essencial** para DevOps moderno. Invista tempo aprendendo!