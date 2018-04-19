from flask import Flask, render_template, request, redirect, url_for


app = Flask(__name__, static_url_path='/static')


# -------------- INDEX --------------
@app.route('/')
def index():

    return render_template('index.html')


# -------------- GAME --------------
@app.route('/game', methods=['POST'])
def game():
    x = int(request.form['x'])
    y = int(request.form['y'])

    return render_template('game.html', x=x, y=y)


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True,
    )
