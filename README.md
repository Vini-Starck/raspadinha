# Pizza Scratch 🍕

## Sobre

Pizza Scratch é um site interativo de raspadinha digital, criado para promover promoções especiais em pizzarias. Os usuários podem “raspar” a área designada para revelar descontos exclusivos e vantagens para sua próxima pizza. O objetivo é engajar clientes de forma divertida, incentivando o consumo e fidelização.

---

## Funcionalidades

- **Raspadinha digital:** Área interativa para raspar com o mouse ou toque, revelando cupons.
- **Design responsivo:** Layout adaptável para celulares, tablets e desktops.
- **Componentização:** Uso de React para estrutura modular, facilitando manutenção e escalabilidade.
- **Footer e Header personalizados:** Informações claras, com identidade visual consistente.

---

## Tecnologias Utilizadas

- React + TypeScript
- Tailwind CSS para estilização rápida e responsiva
- React Icons para ícones (opcional)
- Vite (opcional, para bundling e dev server)
- Componente personalizado `ScratchCard` para a funcionalidade da raspadinha

---

## Estrutura do Projeto

/src

/components

Header.tsx

Footer.tsx

ScratchCard.tsx

App.tsx

---

## Como Rodar Localmente

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/pizza-scratch.git
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Rode o projeto em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

4. Abra o navegador em http://localhost:3000 (ou porta configurada)

---

## Personalização

- Ajuste a porcentagem de desconto modificando o texto no componente principal.
- Altere as cores no arquivo Tailwind ou inline para melhor adequar à identidade da pizzaria.
- Implemente integração com backend para cupons reais, notificações e estatísticas.

## Autor

**[Vinícius Starck](https://starck-portifolio.web.app/)**
