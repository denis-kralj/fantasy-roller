# fantasy-roller

Fantasy roller allows you to define and roll actions for your Tabletop games (e.g. DnD).

## Project setup

### Mandatory Tools

- [PNPM](https://pnpm.io/installation)
- [Node.js 22](https://nodejs.org/en)

### Recommended Tools

- [VSCode](https://code.visualstudio.com/)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Working on the project

```sh
# install dependencies
pnpm install

# run the hot-reload dev server
pnpm dev

# type-check, compile and minify for prod
pnpm /build:.*/

# run tests in watch mode
pnpm test

# get test coverage report
pnpm coverage
```

### Pretty and Lint

If you install the recommended plugins in VS Code, all of the linting and formatting will be done automatically for you on file save. Otherwise, you need to run the below commands:

```sh
# lint with ESLint
pnpm lint

# format with Prettier
pnpm format
```
