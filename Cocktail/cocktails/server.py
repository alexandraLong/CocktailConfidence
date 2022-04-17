from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

howtovids = {
    "1" :{
        "id": "1",
        "title": "Tequila Sunrise",
        "video": "https://www.youtube.com/embed/_8gXKNqU9Mc",
        "ingredients": ["1 1/2 ounces of Tequila", "3/4 cup Orange juice", "3/4 ounces Grenadine", "1 Maraschino cherry"],
        "images": ["https://thumbs.dreamstime.com/b/bottle-mexican-tequila-white-background-stock-image-150427683.jpg", "https://assets.sainsburys-groceries.co.uk/gol/7736185/1/640x640.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROTiRh3FUZAb119bd88bOeZPjlZGKjLYxaJC3SwCA5rrp9PhsW0ghqAafQcgak-dmZL-c&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYd5eI92Lat-g-0L6OVMJ0jhZFUPIGNDZ0lA&usqp=CAU"]
    },
    "2": {
        "id": "2",
        "title": "Gin and Tonic",
        "video": "https://cdn.jwplayer.com/videos/aOvVQdyT-tXzwfO7V.mp4",
        "ingredients": ["2 ounces Gin", "4 ounces Tonic Water"],
        "images": ["https://www.thespruceeats.com/thmb/WsIZugwpzqLynmkB4ZqGrfcE_Og=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/gin-and-tonic-recipe-759300-hero-01-aa12e6504f944c54b8b9c589cc1d0ac6.jpg"]

    },
    "3": {
        "id": "3",
        "title": "Margarita",
        "video": "https://www.youtube.com/embed/6F6LdutFKyM",
        "ingredients": ["1 ounce Cointreau", "2 ounces Lime Juice", "3 ounces Tequila"],
        "images": [""]
    }
}

quizzes = {
    "1" : {
        "1": "1",
        "title": "Tequila Sunrise Quiz",
        "questions": ["Which of the following ingredients can be found in a Tequila Sunrise?","How much orange juice is in one Tequila Sunrise?"],
        "options": [["Mint", "Tequila", "Gin", "Orange Juice", "Lime"], ["1/4 Cup","1/2 Cup", "3/4 Cup", "1 Cup","None"]],
        "values": [["wrong","wrong", "wrong", "correct", "wrong"], ["wrong", "wrong", "correct", "wrong", "wrong"]]
    }
}


@app.route('/')
def homepage():
    return render_template('homepage.html')

@app.route('/howtovid/<id>')
def howto(id):
    global howtovids
    drink = howtovids[id]
    return render_template('howto.html', drink = drink)

@app.route('/quiz/<id>')
def quiz(id):
    global quizzes
    current_quiz = quizzes[id]
    return render_template('quiz.html', quiz = current_quiz)

@app.route('/quizzes')
def display():
    return render_template('quiz_landing.html')

@app.route('/search_results')
def search_results():

    global results
    global search
    global match
    length = len(results)
    return render_template('search.html', results=results, search=search, match=match, length=length)
@app.route('/view/search', methods=['GET','POST'])
@app.route('/search', methods=['GET','POST'])
def search():
    global movies
    global results
    global search
    global match
    match = {}
    results = {}
    json_data = request.get_json()
    search = json_data.lower()
    print(search)
    if (search == ""):
        return render_template('search.html', results=results, match=match)
    else:
        for key in movies:
            for i in range(len(movies[key]['actors'])):
                if search in (movies[key]['actors'][i]).lower():
                    results[key] = movies[key]
                    match[key] = movies[key]['actors'][i]
            if search in (movies[key]['title']).lower():
                results[key] = movies[key]
                match[key] = movies[key]['title']
            elif search in (movies[key]['year']).lower():
                results[key] = movies[key]
                match[key] = movies[key]['year']
        print(results)
        print(match)
        return render_template('search.html', results=results, match=match)

#@app.route('/add', methods=['GET','POST'])
#def addData():
 #   global movies
  #  json_data = request.get_json()
    
# ajax for people.js
if __name__ == '__main__':
    app.run(debug=True)
