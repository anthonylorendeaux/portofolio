# Portfolio - Nuxt 4 & Bun Application

Application full-stack développée avec **Nuxt 4**, optimisée pour tourner nativement sur **Bun**.
Ce projet utilise Docker pour la production et profite de la rapidité de Bun pour le développement et le build.

Consultez la [documentation Nuxt](https://nuxt.com/docs/getting-started/introduction) pour en savoir plus.

## 🚀 Prérequis

- [Bun](https://bun.sh/) (v1.0.0 ou supérieur)
- Docker (pour le déploiement)

## 🛠️ Installation & Développement

Installez les dépendances ultra-rapidement avec Bun :

```bash
bun install

Lancez le serveur de développement (HMR activé) sur http://localhost:3000 :

```bash
bun run Dev
# Ou pour forcer le runtime Bun natif (encore plus rapide) :
bun --bun run dev
```

## 📦 Production
Compilez l'application pour la production (génère le dossier .output) :

```bash
bun run build
```
Pour prévisualiser le build de production localement :

```bash
bun run preview
# Ou lancer directement le serveur de prod :
bun .output/server/index.mjs
```
## 🐳 Docker (Déploiement)
Le projet est conteneurisé avec une image multi-stage optimisée (base Alpine).

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
- Runtime : Bun (Dev & Prod via Nitro Preset)
- UI Library : Nuxt UI
- Content : Nuxt Content (v2/v3)
- Base de données : SQLite (via bun:sqlite natif en prod)