# Changelog

Todas as mudanças relevantes deste pacote serão documentadas neste arquivo.

O formato segue o padrão **Keep a Changelog**  
e este projeto adota **Semantic Versioning**.

---

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
