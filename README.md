## HorairÉTS

HorairÉTS est un générateur de combinaisons d'horaire pour les étudiants de [l'École de technologie supérieure](https://www.etsmtl.ca/). L'application officiel est hébergé sur [https://horairets.emmanuelcoulombe.dev/](https://horairets.emmanuelcoulombe.dev/). Cette application est séparée en deux projets différents, soit l'interface utilisateur et le backend. Pour en savoir plus sur le backend de HorairÉTS, vous pouvez le retrouver [ici](https://github.com/imrashb/horaire-ets).

![horairets](public/logo.png)

### Pour commencer

#### Cloner le code

```
git clone https://github.com/imrashb/horairets-ui.git
```


#### Installer les dépendences avec yarn
Installe le package manager **yarn** pour évitement les conflits avec **npm**
```
npm install -g yarn
```

Installe les dépendances avec yarn
```
yarn install
```

#### Démarrer l'application

Démarre l'application localement
```
yarn dev
```

Démarre l'application localement et sur votre réseau (utile pour tester sur mobile)
```
yarn host
```

Démarre l'application localement en mode production
```
yarn build
yarn preview
```

### Scripts

| Script        | Description                        |
| ------------- | ---------------------------------- |
| yarn dev      | Démarre l'application.              |
| yarn build    | Fait un build de l'application |
| yarn preview  | Démarre la prévisualisation de Vite              |
| yarn lint     | Affiche les erreurs de eslint      |
| yarn lint:fix | Règle les erreurs de eslint              |
| yarn format   | Démarre prettier pour tous les fichiers       |
| yarn test     | Roule les tests                       |


### Technologies utilisés
| Technologie de développement        | Description                        |
| ------------- | ---------------------------------- |
| [React](https://fr.reactjs.org/) | Librairie d'interface utilisateur |
| [styledcomponents](https://styled-components.com/)    | Librairie de CSS-in-JS |
| [Redux](https://redux.js.org/)    | Maintient l'état global de l'application |
| [Redux Toolkit + RTK Query](https://redux-toolkit.js.org/)  | Assiste Redux et faciliter les appels d'API asynchrones |
| [Material UI](https://mui.com/)     | Librairie de composants React  |
| [react-i18next](https://react.i18next.com/) | Affichage du texte de l'application |
| [React Router](https://reactrouter.com/en/main)   | Routage dans l'application  |

| Outils de développement        | Description                        |
| ------------- | ---------------------------------- |
| [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)    | Pour debug l'application React |
|[Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)   | Pour debug l'état de Redux |
| [Vite](https://vitejs.dev/)    | Pour accélérer le développement avec du HMR et un temps de build plus rapide|
| [Netlify](https://app.netlify.com/)    | Pour hébérger les fichiers statiques de l'application créés par Vite lors du build|

### Remarques
- Le boilerplate utilisé pour ce projet est [ViterJS](https://github.com/emre-cil/viterjs-template).