# Otimização de Performance Web

A performance do seu site é **crucial** para a experiência do usuário e SEO. Vamos ver as melhores técnicas de otimização.

## Por que performance importa?

- Sites lentos perdem visitantes
- Afeta o ranking no Google
- Reduz conversões
- Prejudica a experiência mobile

## Técnicas Essenciais

### 1. Comprimir Imagens

Use ferramentas como **TinyPNG** ou **Squoosh** para reduzir o tamanho das imagens sem perder qualidade.

### 2. Lazy Loading
```html
<img src="imagem.jpg" loading="lazy" alt="Descrição">
```

### 3. Minificar CSS e JavaScript

Remova espaços em branco e comentários:
```javascript
// Antes
function soma(a, b) {
  return a + b;
}

// Depois (minificado)
function soma(a,b){return a+b}
```

## Ferramentas de Teste

- **PageSpeed Insights** - Google
- **GTmetrix** - Análise completa
- **WebPageTest** - Testes avançados

## Resultados Esperados

Após otimizar, você deve alcançar:
- Carregamento < 3 segundos
- Score >90 no PageSpeed
- First Contentful Paint < 1.8s

## Conclusão

Performance não é luxo, é **necessidade**. Invista tempo otimizando seu site!