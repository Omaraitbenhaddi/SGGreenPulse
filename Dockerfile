# Utiliser une image de base officielle Node
FROM node:20.14.0-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json (ou yarn.lock)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du code de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Utiliser une image de base légère pour servir l'application
FROM nginx:stable-alpine

# Copier les fichiers construits de l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port sur lequel le serveur va fonctionner
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
