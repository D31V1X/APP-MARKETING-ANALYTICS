from flask import Flask, render_template, request, jsonify
import time
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    emotion = data.get('emotion')
    genre = data.get('genre')
    
    # Simulate AI processing time
    time.sleep(2)
    
    # Simulate song generation
    song_titles = [
        f"Ecos de {emotion}",
        f"{genre} para el Alma",
        f"Sinfonía {emotion}",
        f"Ritmo de {emotion}",
        f"Melodía {genre} {emotion}"
    ]
    
    response = {
        "status": "success",
        "song_title": random.choice(song_titles),
        "artist": "AI Composer",
        "cover_color": random.choice(["#FF5733", "#33FF57", "#3357FF", "#F033FF", "#33FFF5"])
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
