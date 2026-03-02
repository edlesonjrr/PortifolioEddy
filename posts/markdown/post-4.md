# APIs RESTful com Node.js e Express

Aprenda a criar **APIs profissionais** usando Node.js e Express do zero.

## O que é uma API REST?

REST (Representational State Transfer) é um estilo arquitetural para criar APIs que usam HTTP.

## Setup Inicial
```bash
mkdir minha-api
cd minha-api
npm init -y
npm install express
```

## Estrutura Básica
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});
```

## Principais Métodos HTTP

- **GET** - Buscar dados
- **POST** - Criar dados
- **PUT** - Atualizar dados
- **DELETE** - Deletar dados

## Boas Práticas

1. Use versionamento (`/api/v1/users`)
2. Retorne códigos HTTP apropriados
3. Implemente autenticação (JWT)
4. Valide inputs
5. Trate erros adequadamente

## Autenticação JWT
```javascript
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { userId: user.id },
  'SECRET_KEY',
  { expiresIn: '24h' }
);
```

## Conclusão

Com Node.js e Express, você pode criar APIs escaláveis e profissionais!