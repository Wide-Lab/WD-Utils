# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 2.1.0 (2026-03-24)


### Features

* Add dateToDateTime function and corresponding tests for date formatting ([d50a26b](https://github.com/Wide-Lab/WD-Utils/commit/d50a26bf9eae6cd5638e058f8b4854a80f1bba8d))
* add getFileNameExtension and extensionToUTI functions with tests ([be0862a](https://github.com/Wide-Lab/WD-Utils/commit/be0862a8f1c5c01de0971ad7a4dd2dbafccd0d00))
* add husky pre-commit hook and update package dependencies ([f0f51a4](https://github.com/Wide-Lab/WD-Utils/commit/f0f51a436e9da9beac53a50e15dba60def3f01b8))
* add interpolate function with tests and update README ([9cb4e64](https://github.com/Wide-Lab/WD-Utils/commit/9cb4e645c7b442874aa8b22d5fb9d7d2c56a72a5))
* Added ESLint and Prettier ([d2af8d7](https://github.com/Wide-Lab/WD-Utils/commit/d2af8d711225bb6c22f2c674fa485237ef7236ea))
* Added function to display human-readable memory values ([4e58a41](https://github.com/Wide-Lab/WD-Utils/commit/4e58a4146c4f44a881196f8ee12c1551611e7530))
* Added function to truncate a number with decimal places ([2bc24d8](https://github.com/Wide-Lab/WD-Utils/commit/2bc24d87182486c8235641a9d3e397598b9f9885))
* **CHANGELOG:** incluído arquivo de  changelog ([70b75e1](https://github.com/Wide-Lab/WD-Utils/commit/70b75e12c5415008fa5eaeca0be7dcb5aa4a40e9))
* Exported color compare function ([894c30a](https://github.com/Wide-Lab/WD-Utils/commit/894c30ad4c59b195beb66adc5c083580a1e6b5f4))
* Implement getLastDayNumberOfMonth function and update tests for date utilities ([bcea1d9](https://github.com/Wide-Lab/WD-Utils/commit/bcea1d9e9b00394005ecd18c86411bc713a8f40a))
* Incluído conversão de Date para DD/MM/YYYY ([4408b1b](https://github.com/Wide-Lab/WD-Utils/commit/4408b1bd91b335e59fb4d9936e74fcf0c4274b79))
* Incluído função para formatar data do C#/.NET ([26096d0](https://github.com/Wide-Lab/WD-Utils/commit/26096d0d82f9c857bffd4a7d45c8be1c2c96ad93))
* incluído mais testes de numberClamp e ajuste na função que converte decimal para hexadecimal ([cf35ff8](https://github.com/Wide-Lab/WD-Utils/commit/cf35ff8e6e6b336d43de3f4a85763716b36fcbef))
* Melhorado função getBlob e incluído testes para ela ([9f2d6f6](https://github.com/Wide-Lab/WD-Utils/commit/9f2d6f6e283f334fe1315e1a1430eee28b42a7f8))
* traduzir comentários e documentação para português ([dc3012c](https://github.com/Wide-Lab/WD-Utils/commit/dc3012cb5f0ce371ffad555ff27b29e851be500c))
* update package version to 1.0.9; add MIME type mapping functions with tests ([7e5fe4a](https://github.com/Wide-Lab/WD-Utils/commit/7e5fe4a498171492befc45a1195009b2b17df2f2))


### Bug Fixes

* **Dates:** ajuste nas funções de datas ([5afe4d0](https://github.com/Wide-Lab/WD-Utils/commit/5afe4d067f439f1cb737ead9403b87c908404b13))
* **Dates:** limitado data para converter apartir de string e criado testes ([a608e5b](https://github.com/Wide-Lab/WD-Utils/commit/a608e5b8693ee921fcd73348834339b60d3ec142))
* **README:** corrigido documentação ([12bff14](https://github.com/Wide-Lab/WD-Utils/commit/12bff1423c0ce2344e3683f3dd2be5291042f7a2))
* Rename formatTime to dateToTime; add dateToJS function with tests ([fca6d0b](https://github.com/Wide-Lab/WD-Utils/commit/fca6d0b50f64fa0ec1127a3d8d63aa16b3b74071))
* update documentation for getBestActiveColor and improve extractFormattedName ([9a96249](https://github.com/Wide-Lab/WD-Utils/commit/9a962498f6d448fee0b25ba4598582d4db5f647c))
* update extractFormattedName to return correct initials and format ([7f83161](https://github.com/Wide-Lab/WD-Utils/commit/7f83161d9bed562d42f59604a72add81c464ef40))
* update package version to 1.0.10; import Files module and export it ([07eeb4b](https://github.com/Wide-Lab/WD-Utils/commit/07eeb4b331639d3fffef13cdd137d41d8eda47d5))
* updated ucwords function to handle dots and hyphens; added comprehensive tests ([6335987](https://github.com/Wide-Lab/WD-Utils/commit/63359872f2bcbcdf14f8f66c41df4191baa8eaef))
* **WDStrings:** corrigido formatação de nomes pessoais ([fb59d2e](https://github.com/Wide-Lab/WD-Utils/commit/fb59d2ed23d1c392aec03e04a4f1aaa53c669d61))

## [2.0.0] – Refatoração da API de Datas

### 🚨 Breaking Changes

#### Renomeação e unificação de funções principais

- `formatDate` **foi substituída por** `toString`
- `stringToDate` **foi substituída por** `toDate`

Essas mudanças exigem atualização direta nos imports e chamadas.

```ts
// Antes
formatDate(date, 'BR');
stringToDate('2024-02-29');

// Depois
toString(date, 'BR');
toDate('2024-02-29');
```

## [2.0.0] – Atualização do `index.ts`

### 🚨 Breaking Changes

#### Remoção dos exports diretos sem prefixo `WD`

Os exports agrupados **sem prefixo** foram removidos do `index.ts`.

##### ❌ Removido

```ts
export { Colors, Dates, Formatters, Numbers, Strings, Validators };
```

### ⚠️ Aviso Importante — Funções de Datas Depreciadas

A partir da versão **2.0.0**, **não utilize mais** as seguintes funções de datas, que estão **marcadas como `@deprecated`** e poderão ser **removidas em versões futuras**:

- `getTodayBR`
- `getNowTime`
- `formatDate`
- `dateUSAtoBR`
- `dateToBR`
- `dateBRToJS`

---

### ✅ APIs recomendadas (substituição)

Utilize as novas funções padronizadas, baseadas em `Date`:

- `toDate` → conversão de string para `Date`
- `toString` → conversão de `Date` para string
- `toTime` → formatação de horário

---

### 🔁 Exemplos de migração

```ts
// ❌ Antes
getTodayBR();
getNowTime();
formatDate(date, 'BR');
dateUSAtoBR('12/31/2023');
dateToBR('2023-12-31');
dateBRToJS('31/12/2023');

// ✅ Depois
toString(new Date(), 'BR');
toTime(new Date(), true);
toString(date, 'BR');
toString(toDate('12/31/2023', 'USA'), 'BR');
toString(toDate('2023-12-31'), 'BR');
toString(toDate('31/12/2023', 'BR'));
```
