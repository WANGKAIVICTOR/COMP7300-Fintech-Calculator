from flask import Flask, request, abort, jsonify, Response
from werkzeug.exceptions import HTTPException
import logging
import json
import functions
from flask_cors import CORS

# Enable logging
logging.basicConfig(
    format="[%(levelname)s][%(asctime)s][%(filename)s:%(lineno)d] - %(message)s", level=logging.INFO, datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return 'Welcome to Our Calculator!'


@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response


@app.route('/market-news', methods=['GET'])
def market_news():
    try:
        category = request.args.get("category")
        value = functions.market_news(
            category
        )
        # freeze json response without sorting
        return Response(json.dumps(value), mimetype='application/json')
    except Exception as e:
        logger.error(e)
        abort(500)


@app.route('/kelly', methods=['GET'])
def kelly():
    try:
        b = float(request.args.get("b"))
        p = float(request.args.get("p"))
        q = float(request.args.get("q"))
        value = functions.kelly(
            b, p, q
        )
        # freeze json response without sorting
        return Response(json.dumps({
            "Tag": "Kelly formula",
            "Odds": b,
            "Chance of victory": p,
            "Chance of losing": q,
            "betSize": f"{value}",
        }), mimetype='application/json')
    except Exception as e:
        logger.error(e)
        abort(500)

@app.route('/simple', methods=['GET'])
def mixed_simple_interest():
    try:
        k = float(request.args.get("k"))
        y = float(request.args.get("y"))
        m = float(request.args.get("m"))
        d = float(request.args.get("d"))
        i = float(request.args.get("i"))
        interest, total = functions.mixed_simple_interest(k, y, m, d, i)
        # freeze json response without sorting
        return Response(json.dumps({
            "Tag": "mixed simple interest formula",
            "principal": k,
            "Years": y,
            "Months": m,
            "Days": d,
            "Year interest rate": i,
            "Interest": interest,
            "Total":total,
        }), mimetype='application/json')
    except Exception as e:
        logger.error(e)
        abort(500)

@app.route('/compound', methods=['GET'])
def mixed_compound_interest():
    try:
        k = float(request.args.get("k"))
        y = float(request.args.get("y"))
        m = float(request.args.get("m"))
        d = float(request.args.get("d"))
        i = float(request.args.get("i"))
        interest, total = functions.mixed_compound_interest(k, y, m, d, i)
        # freeze json response without sorting
        return Response(json.dumps({
            "Tag": "mixed compound interest formula",
            "principal": k,
            "Years": y,
            "Months": m,
            "Days": d,
            "Year interest rate": i,
            "Interest": interest,
            "Total":total,
        }), mimetype='application/json')
    except Exception as e:
        logger.error(e)
        abort(500)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
