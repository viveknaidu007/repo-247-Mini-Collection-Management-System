# repo-247-Mini-Collection-Management-System
my doc

## Setup Instructions

    Backend:
       we can Install Elasticsearch locally (docker run -p 9200:9200 elasticsearch:8.0.0).
        cd backend
        npm install
        Create .env with the provided content.
        npm run dev
    Frontend:
        cd frontend
        npm install
        Create .env with the provided content.
        npm run dev
    Usage:
        Register and login via /login.
        Add customers, process payments, and upload Excel files from the dashboard.
        Real-time updates will appear via WebSocket

## hence this was a symplified version , have to update UI and styling and some code structure etc if needed furthur

## in production we can run frontned with dist folder , for backend we can run with docker
