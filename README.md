# TaskDemo

TaskDemo est une mini application de gestion de tâches écrite en **React Native** et **TypeScript**. La navigation entre l’écran de liste et l’écran de détail s’appuie sur **React Navigation**.


## Fonctionnalités

- Ajout et suppression de tâches dans `TaskListScreen`
- Consultation des informations d'une tâche via `TaskDetailScreen`
- Navigation entre les écrans grâce à *react-native-stack*
- Tests unitaires avec **Jest**

## Prérequis

- Node.js **24.1.0** (un fichier `.nvmrc` est fourni pour gérer la version)
- Yarn `1.22`
- Pour iOS : Ruby et CocoaPods (voir [`Gemfile`](Gemfile))

```bash
nvm install
nvm use
yarn check:node
```

## Installation

Installez les dépendances JavaScript :

```bash
yarn install
```

## Lancer l'application

1. Démarrer le serveur **Metro** :
   ```bash
   yarn start
   ```
2. Ouvrir une nouvelle fenêtre de terminal puis :
   - **Android** : `yarn android`
   - **iOS** : `yarn ios` (après un éventuel `bundle exec pod install` lors du premier lancement)

Une fois Metro et votre émulateur ou appareil démarrés, l'application devrait apparaître avec l'écran de liste des tâches.

## Tests

Les tests unitaires sont lancés avec :

```bash
yarn test
```

## Autres commandes utiles

- `yarn lint` : analyse statique du code
- `yarn check:node` : vérifie la version de Node.js

## Structure principale

- `App.tsx` : configuration de la navigation
- `src/screens/TaskListScreen.tsx` : affichage et gestion de la liste de tâches
- `src/screens/TaskDetailScreen.tsx` : affichage du détail d'une tâche
- `__tests__/` : tests Jest

Ce dépôt se veut simple et peut servir de base pour des expérimentations autour de React Native.
