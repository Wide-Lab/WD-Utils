# Widelab Utils

A **Widelab Utils** é uma coleção abrangente de funções utilitárias desenvolvida para simplificar e agilizar o desenvolvimento de projetos. Esta biblioteca inclui uma variedade de funcionalidades como formatadores, manipuladores de dados, cálculos matemáticos e validações, todas otimizadas para uso eficiente e reutilização em vários projetos.

## Funcionalidades

- **Formatadores**: Conjuntos de funções para formatação de texto, números e datas.
- **Manipuladores de dados**: Funções para transformar, filtrar e agrupar dados de maneira eficiente.
- **Cálculos**: Algoritmos para operações matemáticas comuns e complexas.
- **Validações**: Ferramentas para verificação e validação de dados de entrada.

## Instalação

Para instalar a biblioteca, execute o seguinte comando:

```bash
npm install widelab-utils
```

## Uso

Aqui está um exemplo de como utilizar a biblioteca em seu projeto:

```typescript
import { Formatters, Validators, Numbers } from "widelab-utils";

// Exemplo de formatação de CPF
const formattedDate = Formatters.formatCPF("12345678900");
// Resultado: 123.456.789-00

// Exemplo de validação de entrada
const isValid = Validators.validateEmail("example@domain.com");
// Resultado: true

// Exemplo de cálculo de par
const sum = Numbers.isEven(4);
// Resultado: true

console.log(formattedDate, isValid, sum);
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença ISC. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

Feito com ❤️ por Widelab
