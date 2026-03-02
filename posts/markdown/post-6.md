# React Hooks: Guia Completo

React Hooks mudaram completamente a forma como escrevemos componentes.

## O que são Hooks?

Hooks são funções que permitem usar **state** e outros recursos do React em componentes funcionais.

## useState

Gerencia estado local:
```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Contador: {count}
    </button>
  );
}
```

## useEffect

Executa efeitos colaterais:
```javascript
import { useEffect } from 'react';

function Profile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]); // Executa quando userId muda
  
  return <div>{user?.name}</div>;
}
```

## Custom Hooks

Crie seus próprios hooks:
```javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading };
}

// Uso
function App() {
  const { data, loading } = useFetch('/api/posts');
  
  if (loading) return <p>Carregando...</p>;
  return <div>{data.title}</div>;
}
```

## Regras dos Hooks

1. Só chame no **top level**
2. Só chame em **componentes React**
3. Use `eslint-plugin-react-hooks`

## Hooks Avançados

- **useContext** - Compartilhar dados
- **useReducer** - Estado complexo
- **useMemo** - Otimizar cálculos
- **useCallback** - Memoizar funções
- **useRef** - Acessar DOM

## Conclusão

Hooks tornam o código React mais limpo, reutilizável e fácil de testar!