from flask import Flask, request, jsonify
import pandas as pd
import difflib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/recommend": {"origins": "http://localhost:3000"}}, support_credentials=True)

# Load the movie dataset
movies_data = pd.read_csv('movies.csv')
selected_features = ['genres', 'keywords', 'tagline', 'cast', 'director']
for feature in selected_features:
    movies_data[feature] = movies_data[feature].fillna('')

# Combine selected features
combined_features = movies_data['genres'] + ' ' + movies_data['keywords'] + ' ' + movies_data['tagline'] + ' ' + movies_data['cast'] + ' ' + movies_data['director']
vectorizer = TfidfVectorizer()
feature_vectors = vectorizer.fit_transform(combined_features)
similarity = cosine_similarity(feature_vectors)

@app.route('/recommend', methods=['POST'])
def recommend_movies():
    movie_name = request.json['movie_name']
    list_of_all_titles = movies_data['title'].tolist()
    find_close_match = difflib.get_close_matches(movie_name, list_of_all_titles)
    if not find_close_match:
        return jsonify({'error': 'Movie not found!'}), 404
    close_match = find_close_match[0]
    index_of_the_movie = movies_data[movies_data['title'] == close_match]['index'].values[0]
    similarity_score = list(enumerate(similarity[index_of_the_movie]))
    sorted_similar_movies = sorted(similarity_score, key=lambda x: x[1], reverse=True)

    recommendations = []
    for i, (index, score) in enumerate(sorted_similar_movies[1:31]):
        title_from_index = movies_data[movies_data['index'] == index]['title'].values[0]
        recommendations.append(title_from_index)

    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)