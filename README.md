# TaskDemo

Cette application mobile est un petit gestionnaire de tâches écrit avec **React Native** et **TypeScript**. Elle utilise la bibliothèque **React Navigation** pour passer d'un écran à l'autre (liste et détail d'une tâche).

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

## Structure principale

- `App.tsx` : configuration de la navigation
- `src/screens/TaskListScreen.tsx` : affichage et gestion de la liste de tâches
- `src/screens/TaskDetailScreen.tsx` : affichage du détail d'une tâche
- `__tests__/` : tests Jest

Ce dépôt se veut simple et peut servir de base pour des expérimentations autour de React Native.
