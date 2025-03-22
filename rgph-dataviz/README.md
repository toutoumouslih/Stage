# RGPH-DataViz

Plateforme interactive de visualisation des données démographiques du Recensement Général de la Population et de l'Habitat (RGPH).

## Technologies

- Backend: Django
- Frontend: React
- Base de données: PostgreSQL
- Visualisation: Leaflet (cartes) & D3.js (graphiques)

## Fonctionnalités

- Visualisation interactive des données démographiques
- Cartes choroplèthes interactives
- Graphiques dynamiques
- Analyse statistique des données de population
- Interface utilisateur intuitive et responsive

## Installation

### Prérequis

- Python 3.8+
- Node.js 14+
- PostgreSQL

### Configuration du Backend

```bash
# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
.\venv\Scripts\activate  # Windows

# Installer les dépendances
pip install -r requirements.txt

# Configurer la base de données
python manage.py migrate
```

### Configuration du Frontend

```bash
cd frontend
npm install
npm start
```
