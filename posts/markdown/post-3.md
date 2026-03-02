# Deploy Gratuito na Vercel

A **Vercel** é a melhor plataforma para hospedar sites estáticos e aplicações Next.js gratuitamente.

## Vantagens da Vercel

- Deploy automático via Git
- HTTPS grátis
- CDN global
- Domínio customizado
- Logs em tempo real

## Passo a Passo

### 1. Criar conta na Vercel

Acesse [vercel.com](https://vercel.com) e crie uma conta gratuita.

### 2. Conectar com GitHub
```bash
# No seu projeto
git init
git add .
git commit -m "primeiro commit"
git remote add origin sua-url.git
git push -u origin main
```

### 3. Importar Projeto

Na Vercel:
1. Clique em "New Project"
2. Selecione seu repositório
3. Configure as opções (se necessário)
4. Deploy!

## Configurações Avançadas

### Variáveis de Ambiente
```env
API_KEY=sua_chave_secreta
DATABASE_URL=postgres://...
```

### Redirects
```json
{
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ]
}
```

## Domínio Customizado

Você pode adicionar seu próprio domínio:
1. Settings → Domains
2. Adicione seu domínio
3. Configure DNS

## Conclusão

Com a Vercel, fazer deploy nunca foi tão fácil e rápido!