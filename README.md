 # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


 ## Que es React Query

 React Query o también TanStack Query es una librería para obtener datos del servidor.

 Sus ventajas principales son que obtiene los datos de forma optimizada y rápida; además cachea las consultas, sincroniza / actualiza los datos del servidor de forma simple.

 Se puede actualizar con Fetch API o Axios.

 ### Términos en React Query

 React Query introduce una gran cantidad de conceptos nuevos; pero hay 2 que son los más importantes:

 - Queries: Se utilizan para obtener datos de un servidor o una API (GET)
 - Mutations: Se utilizan para crear / actualizar / eliminar datos en el servidor (POST, PUT, PATCH, DELETE)
