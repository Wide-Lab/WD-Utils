# Widelab Utils

A **Widelab Utils** é uma coleção abrangente de funções utilitárias desenvolvida para simplificar e agilizar o desenvolvimento de projetos. Esta biblioteca inclui uma variedade de funcionalidades como formatadores, manipuladores de dados, cálculos matemáticos e validações, todas otimizadas para uso eficiente e reutilização em vários projetos.

## Funcionalidades

- **Formatadores**: Funções para formatação de texto, números, datas e outros tipos de dados, como CPF, CNPJ, CEP, moedas e horários.
- **Manipuladores de dados**: Ferramentas para transformar, filtrar, agrupar e manipular strings, arrays e objetos de maneira eficiente.
- **Cálculos**: Algoritmos para operações matemáticas comuns, como interpolação, arredondamento e verificação de números pares ou ímpares.
- **Validações**: Ferramentas para validação de dados, como e-mails, CPFs, CNPJs, datas e URLs.
- **Cores**: Utilitários para manipulação de cores, como conversão entre formatos, geração de paletas e cálculo de contraste.
- **Arquivos**: Funções para lidar com extensões de arquivos e tipos MIME.
- **Strings**: Métodos para remoção de acentos, conversão de caracteres especiais, capitalização e manipulação de substrings.
- **Datas**: Funções para formatação, conversão e manipulação de datas e horários.

## Instalação

Para instalar a biblioteca, execute o seguinte comando:

```bash
npm install widelab-utils
```

## Uso

Aqui está um exemplo de como utilizar a biblioteca em seu projeto:

```typescript
import {
  WDFormatters,
  WDValidators,
  WDNumbers,
  WDColors,
  WDStrings,
  WDDates,
} from 'widelab-utils';

// Exemplo de formatação de CPF
const formattedCPF = WDFormatters.formatCPF('12345678900');
// Resultado: 123.456.789-00

// Exemplo de validação de e-mail
const isValidEmail = WDValidators.validateEmail('example@domain.com');
// Resultado: true

// Exemplo de cálculo de número par
const isEven = WDNumbers.isEven(4);
// Resultado: true

// Exemplo de manipulação de cores
const hexToRgb = WDColors.hexToRgb('#FF5733');
// Resultado: [255, 87, 51]

// Exemplo de remoção de acentos
const noAccents = WDStrings.accentsRemove('Olá, mundo!');
// Resultado: Ola, mundo!

// Exemplo de formatação de data
const formattedDate = WDDates.toString(new Date(2026, 03, 09));
// Resultado: 2026-02-08

console.log(
  formattedCPF,
  isValidEmail,
  isEven,
  hexToRgb,
  noAccents,
  formattedDate,
);
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença ISC. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

Feito com ❤️ por Widelab
