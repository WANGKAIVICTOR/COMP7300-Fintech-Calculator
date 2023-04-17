from flask import Flask, request, abort, jsonify, Response
from werkzeug.exceptions import HTTPException
import logging
import json
import functions
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import func
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
logger.info("Initialized database.")
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
    b = db.Column(db.Float)
    p = db.Column(db.Float)
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


class Purchasing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    initial_amount = db.Column(db.Float)
    annual_inflation_rate = db.Column(db.Float)
    time = db.Column(db.Float)
    result = db.Column(db.Float)

class Count(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))

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
        logger.info("Inserted one kelly entity.")

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
        logger.info("Inserted one mixed_simple_interest entity.")


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
        logger.info("Inserted one mixed_compound_interest entity.")


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
        logger.info("Inserted one loans_equal_principal_and_interest entity.")


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
        logger.info("Inserted one loan_principal_equal entity.")
        

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

@app.route('/purchasing_power', methods=['GET'])
def purchasing_power():
    try:
        initial_amount = request.args.get("initial_amount")
        annual_inflation_rate = request.args.get("annual_inflation_rate")
        time = request.args.get("time")
        value = functions.purchasing_power(initial_amount, annual_inflation_rate, time)

        # insert to db
        session = connection()
        session.add(Purchasing(name='purchasing_power', initial_amount=initial_amount,
                    annual_inflation_rate=annual_inflation_rate, time=time,result=value))
        session.commit()
        session.close()
        logger.info("Inserted one purchasing_power entity.")
        

        # freeze json response without sorting
        return Response(json.dumps({
            "Tag": "mixed compound interest formula",
            "initial_amount": initial_amount,
            "annual_inflation_rate": annual_inflation_rate,
            "time": time,
            "value": value,
        }), mimetype='application/json')
    except Exception as e:
        logger.error(e)
        abort(500)

@app.route('/data_explore', methods=['GET'])
def data_explore():
    """
    Explore the issues people concerned
    return:
        data: dict data
    """
    try:
        session = connection()
        loan = session.query(Loan.name, func.count(Loan.name)).group_by(Loan.name).all()
        kelly = session.query(Kelly.name, func.count(Kelly.name)).group_by(Kelly.name).all()
        purchasing = session.query(Purchasing.name, func.count(Purchasing.name)).group_by(Purchasing.name).all()
        deposit = session.query(Deposit.name, func.count(Deposit.name)).group_by(Deposit.name).all()
        count = session.query(Count.name, func.count(Count.name)).group_by(Count.name).all()
        result = {}
        result = dict(loan+kelly+purchasing+deposit+count)
        session.close()
        logger.info("Counted the frequency of each methods")

        return Response(json.dumps(result), mimetype='application/json')
    except Exception as e:
        logger.error(e)
        abort(500)

@app.route('/gdp_growth_rate', methods=['GET'])
def gdp_growth_rate():
    try:
        current_year_gdp = float(request.args.get("current_year_gdp"))
        last_year_gdp = float(request.args.get("last_year_gdp"))
        gdp_growth_rate = functions.gdp_growth_rate(current_year_gdp, last_year_gdp)

        # insert to db
        session = connection()
        session.add(Count(name='gdp_growth_rate'))
        session.commit()
        session.close()
        logger.info("Inserted one gdp_growth_rate entity.")
        
        # freeze json response without sorting
        return Response(json.dumps({
            "Tag": "mixed compound interest formula",
            "current_year_gdp": current_year_gdp,
            "last_year_gdp": last_year_gdp,
            "gdp_growth_rate": gdp_growth_rate,
        }), mimetype='application/json')
    except Exception as e:
        logger.error(e)
        abort(500)

@app.route('/doubling_time', methods=['GET'])
def doubling_time():
    try:
        r = float(request.args.get("r"))
        t = functions.doubling_time(r)

        # insert to db
        session = connection()
        session.add(Count(name='doubling_time'))
        session.commit()
        session.close()
        logger.info("Inserted one purchasing_power entity.")

        # freeze json response without sorting
        return Response(json.dumps({
            "Tag": "mixed compound interest formula",
            "rate": r,
            "time": t,
        }), mimetype='application/json')
    except Exception as e:
        logger.error(e)
        abort(500)

@app.route('/markup_percentage', methods=['GET'])
def markup_percentage():
    try:
        price = float(request.args.get("price"))
        cost = float(request.args.get("cost"))
        markup_percentage = functions.markup_percentage(price, cost)

        # insert to db
        session = connection()
        session.add(Count(name='doubling_time'))
        session.commit()
        session.close()
        logger.info("Inserted one doubling_time entity.")

        # freeze json response without sorting
        return Response(json.dumps({
            "Tag": "mixed compound interest formula",
            "price": price,
            "cost": cost,
            "markup_percentage":markup_percentage
        }), mimetype='application/json')
    except Exception as e:
        logger.error(e)
        abort(500)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
