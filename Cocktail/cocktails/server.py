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

@app.route('/view/<id>')
def view(id):
    global movies

    movie = movies[id]

    return render_template('view.html',movie=movie)

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
