from flask import Flask, request, abort, jsonify, Response
from werkzeug.exceptions import HTTPException
import logging
import json
import functions
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import sys

# Enable logging
logging.basicConfig(
    format="[%(levelname)s][%(asctime)s][%(filename)s:%(lineno)d] - %(message)s", level=logging.INFO, datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# Define app
app = Flask(__name__)
CORS(app)

# Initialize the database
WIN = sys.platform.startswith('win')
if WIN:  # if windows
    prefix = 'sqlite:///'
else:
    prefix = 'sqlite:////'
app.config['SQLALCHEMY_DATABASE_URI'] = prefix + \
    os.path.join(app.root_path, 'data.sqlite3')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
SQLALCHEMY_ECHO = True
db = SQLAlchemy(app)

# Define table model
class Deposit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    principal = db.Column(db.Float)
    years = db.Column(db.Float)
    months = db.Column(db.Float)
    days = db.Column(db.Float)
    rate = db.Column(db.Float)
    interest = db.Column(db.Float)
    total = db.Column(db.Float)


class Kelly(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    d = db.Column(db.Float)
    b = db.Column(db.Float)
    q = db.Column(db.Float)
    value = db.Column(db.Float)


class Loan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    principal = db.Column(db.Float)
    years = db.Column(db.Float)
    staging_quantity = db.Column(db.Float)
    rate = db.Column(db.Float)
    total = db.Column(db.Float)


# Create table model
with app.app_context():
    db.create_all()

# connect to db
def connection():
    engine = create_engine(
        prefix + os.path.join(app.root_path, 'data.sqlite3'))
    DBSession = sessionmaker(bind=engine)
    session = DBSession()
    return session


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

        # insert to db
        session = connection()
        session.add(Kelly(name='kelly', b=b, p=p, q=q, value=value))
        session.commit()
        session.close()

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

        # insert to db
        session = connection()
        session.add(Deposit(name='mixed_simple_interest', principal=k,
                    years=y, months=m, days=d, rate=i, interest=interest, total=total))
        session.commit()
        session.close()

        # freeze json response without sorting
        return Response(json.dumps({
            "Tag": "mixed simple interest formula",
            "principal": k,
            "Years": y,
            "Months": m,
            "Days": d,
            "Year interest rate": i,
            "Interest": interest,
            "Total": total,
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

        # insert to db
        session = connection()
        session.add(Deposit(name='mixed_compound_interest', principal=k,
                    years=y, months=m, days=d, rate=i, interest=interest, total=total))
        session.commit()
        session.close()

        # freeze json response without sorting
        return Response(json.dumps({
            "Tag": "mixed compound interest formula",
            "principal": k,
            "Years": y,
            "Months": m,
            "Days": d,
            "Year interest rate": i,
            "Interest": interest,
            "Total": total,
        }), mimetype='application/json')
    except Exception as e:
        logger.error(e)
        abort(500)


@app.route('/same_monthly', methods=['GET'])
def loans_equal_principal_and_interest():
    try:
        k = float(request.args.get("k"))
        y = float(request.args.get("y"))
        t = float(request.args.get("t"))
        i = float(request.args.get("i"))
        each_time, interest, total = functions.loans_equal_principal_and_interest(
            k, y, t, i)

        # insert to db
        session = connection()
        session.add(Loan(name='loans_equal_principal_and_interest',
                    principal=k, years=y, staging_quantity=t, rate=i, total=total))
        session.commit()
        session.close()

        # freeze json response without sorting
        return Response(json.dumps({
            "Tag": "mixed compound interest formula",
            "loan": k,
            "Years": y,
            "Year interest rate": i,
            "each time": each_time,
            "Interest": interest,
            "Total": total,
        }), mimetype='application/json')
    except Exception as e:
        logger.error(e)
        abort(500)


@app.route('/decline_monthly', methods=['GET'])
def loan_principal_equal():
    try:
        k = float(request.args.get("k"))
        y = float(request.args.get("y"))
        t = float(request.args.get("t"))
        i = float(request.args.get("i"))
        each_time, interest, total = functions.loan_principal_equal(k, y, t, i)

        # insert to db
        session = connection()
        session.add(Loan(name='loan_principal_equal', principal=k,
                    years=y, staging_quantity=t, rate=i, total=total))
        session.commit()
        session.close()

        # freeze json response without sorting
        return Response(json.dumps({
            "Tag": "mixed compound interest formula",
            "loan": k,
            "Years": y,
            "Year interest rate": i,
            "each time": each_time,
            "Interest": interest,
            "Total": total,
        }), mimetype='application/json')
    except Exception as e:
        logger.error(e)
        abort(500)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
