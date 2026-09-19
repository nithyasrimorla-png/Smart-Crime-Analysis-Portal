
# Smart Crime Analysis Portal

A web-based data analytics and visualization platform for exploring historical crime records from Chicago. The portal provides interactive dashboards, searchable crime records, analytical charts, and geographic visualizations to help users understand crime data patterns.

## Live Demo

- **Application:** https://smartcrimeanalysisportal.netlify.app
- **Backend API:** https://smart-crime-analysis-portal.onrender.com

## Project Overview

The Smart Crime Analysis Portal is an academic data analytics and visualization project developed to explore historical crime records using interactive visualizations and data-driven summaries.

The system processes crime data and presents it through a user-friendly web interface, allowing users to examine crime categories, district-wise distributions, arrest records, domestic crime records, and historical trends.

The project focuses on **historical data analysis and visualization**. It does not perform crime prediction or predictive policing.

## Key Features

- **Dashboard:** Displays key crime statistics, including total records, crime types, districts, and arrest counts.
- **Crime Records:** Provides searchable, filterable, and paginated crime records.
- **Crime Analytics:** Presents historical crime patterns through interactive charts and analytical summaries.
- **Crime Map:** Visualizes crime records geographically using an interactive map.
- **About:** Provides information about the project and its objectives.

## Technology Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Recharts
- Leaflet
- React Leaflet

### Backend
- Node.js
- Express.js
- PostgreSQL
- `pg` PostgreSQL client
- dotenv
- CORS

### Data Processing
- Python
- Pandas

### Database and Deployment
- Supabase — PostgreSQL database
- Render — Backend deployment
- Netlify — Frontend deployment

## Dataset

The project uses the **Chicago Crimes – 2001 to Present** dataset from the Chicago Data Portal.

The dataset contains historical crime records and fields such as crime type, description, date, location, district, arrest status, and domestic incident status.

The deployed application currently displays **273,902 crime records**.

Dataset source: [Chicago Data Portal – Crimes](https://data.cityofchicago.org/)

## System Architecture

The application follows a client-server architecture:

1. Crime data is processed using Python and Pandas.
2. Processed records are stored in a PostgreSQL database hosted on Supabase.
3. The Node.js and Express backend provides REST API endpoints to retrieve crime records and analytical data.
4. The React frontend requests data from the backend and displays it through tables, charts, statistics, and maps.

```text
Chicago Crime Dataset
        |
        v
Python / Pandas
        |
        v
Supabase PostgreSQL
        |
        v
Node.js / Express REST API
        |
        v
React + Vite Frontend
        |
        v
Dashboard | Records | Analytics | Map
```

## API Endpoints

The backend exposes the following API endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/crimes` | Retrieves crime records with supported filtering and pagination |
| GET | `/api/crimes/stats` | Retrieves summary statistics for the dashboard |
| GET | `/api/crimes/analytics` | Retrieves analytical data for charts and visualizations |

The crime records endpoint supports query parameters for pagination and filtering, including search, crime type, district, arrest status, and year.

## Project Structure

```text
Smart-Crime-Analysis-Portal/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── data/
│   ├── raw/
│   └── processed/
│
├── data-processing/
├── ml/
└── README.md
```

## Local Setup

### Prerequisites

- Node.js and npm
- Access to a PostgreSQL database
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/nithyasrimorla-png/Smart-Crime-Analysis-Portal.git
cd Smart-Crime-Analysis-Portal
```

### 2. Configure the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory and configure the database connection:

```env
PORT=5000
DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_username
DB_PASSWORD=your_database_password
```

Use your own PostgreSQL connection details. Do not commit `.env` files or expose database credentials.

Start the backend:

```bash
npm start
```

The backend runs locally on port `5000` unless another port is configured.

### 3. Configure the Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed by Vite in your terminal.

## Deployment

The application is deployed using:

- **Frontend:** Netlify
- **Backend:** Render
- **Database:** Supabase PostgreSQL

The frontend uses the `VITE_API_BASE_URL` environment variable to communicate with the backend.

For production, configure it as:

```env
VITE_API_BASE_URL=https://smart-crime-analysis-portal.onrender.com/api
```

Environment variables should be configured in the respective deployment platform settings.

## Project Scope

The portal is designed for historical crime data exploration and visualization. Its scope includes:

- Summarizing historical crime records
- Exploring crime categories and district-wise distributions
- Examining arrest and domestic crime statistics
- Visualizing crime locations and historical trends

Crime prediction, future crime-location forecasting, and automated crime prevention are outside the current implementation.

## Future Enhancements

- Additional historical data filters and visualizations
- Improved map-based exploration
- Enhanced analytical summaries
- Optional machine learning-based analysis as a future extension

## Academic Project

**Project Name:** Smart Crime Analysis Portal  
**Category:** Data Analytics & Visualization  
**Domain:** Data Science / Web Development  
**Sustainable Development Goal:** SDG 16 – Peace, Justice and Strong Institutions

## Contributors

- P. Sri Harsha
- M. Nithya Sri
- V. Anvesh Kumar

## License

This project was developed for academic purposes. Dataset usage is subject to the terms and conditions of the Chicago Data Portal.
