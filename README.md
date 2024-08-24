# One Stop Recommendation

The "One Stop Recommendation" project is a web application designed to provide recommendations across multiple categories, including Movies, Games, Songs, Books, and Food. The project integrates various recommendation systems into a single platform, offering users personalized suggestions in each category.

## Project Overview:

The application is built with a modular approach to integrate different recommendation systems. The Movie Recommendation System is implemented and deployed, with plans to extend the functionality to include Games, Songs, Books, and Food. The project uses Flask for backend services, Docker for containerization, and React for the frontend.

### Features:
- **Movie Recommendations:** Provides personalized movie recommendations based on user preferences and input.
- **Future Integrations:** Plans to integrate recommendation systems for Games, Songs, Books, and Food.

## Technologies Used:

- **Backend:** Python, Flask
- **Frontend:** React
- **Containerization:** Docker

## Workflow Overview:

1. **Backend Development:**
   - Implemented the Movie Recommendation System logic using Python.
   - Created a Flask app to handle backend logic and serve recommendations.

2. **Containerization:**
   - Dockerized the Flask app to manage dependencies and ensure a consistent development environment.

3. **Frontend Development:**
   - Developed a React frontend server to display recommendations from various categories to the user.

## Getting Started:

### Without Docker

For initializing the application without docker, updated the fetch URL in the Frontend -> src -> components -> Main -> Main.js to http://localhost:5001/recommend, since that is the port on whcih Flask app is running

1. Clone the Repository:

```
git clone https://github.com/iamutk4/One-Stop-Recommendation.git
```
2. Navigate to backend folder: `cd backend` and create a new virtual environment, activate it, and install required dependencies:

```
conda create -n osr
conda activate osr
pip install requirements.txt
```
3. Start the backend server:

```
python app.py
```
4. Navigate to frontend folder and start the frontend server:

```
npm start
```

### With Docker

If there are dependency issues, you can use the Docker image to initiate the backend server, using the following steps. In this case, you need not update the routing URL on frontend.

API interaction happens as follows:

User <---> React Frontend (port:3000) <---> Docker (port:4000) <---> Flask Backend (port:5001)

1. Start Docker and log in
2. Pull the latest image from docker hub using following command in terminal:

```
docker pull iamutk4/one-stop-recommendation:osrappv2
```
3. Run the docker image:

```
docker run -p 4000:5001 iamutk4/one-stop-recommendation:osrappv2
```
Once the image is run, Flask app will be running at port:5001 and frontend can interact with the docker image at port:4000

3. Start the frontend server by navigating to frontend folder:

```
npm start
```


