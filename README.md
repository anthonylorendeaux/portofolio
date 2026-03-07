# Portfolio - Nuxt 4 Application

🌍 **Site en ligne** : [https://anthony-lorendeaux.com](https://anthony-lorendeaux.com)

Application full-stack développée avec **Nuxt 4**, utilisant **pnpm** comme gestionnaire de paquets.
Ce projet utilise Docker pour la production.

Consultez la [documentation Nuxt](https://nuxt.com/docs/getting-started/introduction) pour en savoir plus.

## 🚀 Prérequis

- [Node.js](https://nodejs.org/) (v20 ou supérieur recommandé)
- [pnpm](https://pnpm.io/)
- Docker (pour le déploiement)

## 🛠️ Installation & Développement

Installez les dépendances avec pnpm :

```bash
pnpm install
```

Lancez le serveur de développement (HMR activé) sur http://localhost:3000 :

```bash
pnpm run dev
```

## 📦 Production
Compilez l'application pour la production (génère le dossier .output) :

```bash
pnpm run build
```
Pour prévisualiser le build de production localement :

```bash
pnpm run preview
# Ou lancer directement le serveur de prod :
node .output/server/index.mjs
```
## 🐳 Docker (Déploiement)
Le projet est conteneurisé avec une image multi-stage optimisée (base Node Alpine).

Construire l'image

```bash
docker build -t mon-portfolio .
```
Lancer le conteneur

```bash
# Lance le site sur http://localhost:3000
docker run --rm -p 3000:80 --name portfolio mon-Portfolio
```
## 🏗️ Architecture Technique
- Framework : Nuxt 4
- Runtime : Node.js (Dev & Prod via Nitro Preset)
- UI Library : Nuxt UI
- Content : Nuxt Content (v2/v3)
- Base de données : SQLite