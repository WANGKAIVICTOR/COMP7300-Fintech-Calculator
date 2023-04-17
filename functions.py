import finnhub
import math
import configparser
config = configparser.ConfigParser()
config.read('config.ini', encoding='utf-8')


def market_news(category="forex"):
    """
    This parameter can be 1 of the following values general, forex, crypto, merger.
    """
    finnhub_client = finnhub.Client(
        api_key=config["FINNHUB"]["KEY"])
    return finnhub_client.general_news(category, min_id=0)[:10]


def kelly(b, p, q):
    """
    https://wiki.mbalib.com/wiki/%E5%87%AF%E5%88%A9%E5%85%AC%E5%BC%8F
    The Kelly formula is a formula that can be applied to investment funds and bets.
    Applied to multiple random gambling games, the expected growth rate of funds is the highest,
    And will never result in a complete loss of all funds. It assumes an infinite number of bets, with no upper or lower limits.
    The formula was proposed in 1956 by physicist John Larry Kelly, a colleague of Claude Ellwood Shannon at Bell LABS.
    Kelly's approach draws on Shannon's work on the rustle of long-distance telephone lines. Kelly shows that Shannon's information theory can be applied here:
    Gamblers do not need complete information. Another of Shannon's colleagues, Edward O. Thorp, applied this formula to the blackjack and stock markets.
    An equivalent idea was proposed by Danny Bernoulli in 1738, but Bernoulli's work was not first translated into English until 1954.
    But for a one-time investor, choose the portfolio with the highest arithmetic average.
    """

    """
    For example, if a game has a 40% (p=0.40) chance of winning and the odds are 2:1 (b=2), the gambler should bet (2 × 0.40-0.60)/2 = 10% of the money each time.

    Let's take the simplest example: heads win, tails lose, 50 percent, 1.5:1.

    Plug into Kelly's formula, b's odds are 1.5, p and q are both 0.5, then f=(bp-q) ÷ b =(1.5 * 50%-50%) ÷ 1.5 = 16.6%.

    f^*=16.6% is the most favorable percentage you can bet, and 16.6% is the percentage you can bet each time to maximize your returns. And that's assuming you have a positive expected value, which is bp-q. 0. In the coin toss case, the expected value =0.25 is positive.
    """
    return round((b*p-q)/b, 6)


def mixed_simple_interest(k, y, m, d, i):
    """
    https://wiki.mbalib.com/wiki/%E5%8D%95%E5%88%A9 
    Simple interest refers to the cost of borrowing money or the return on lending money. Simple interest is a method of calculating interest. The calculation of simple interest depends on factors such as the principal amount of the loan or contribution, the length of time the balance is borrowed and the level of market interest rate
    Under the simple interest method, as long as the principal earns interest over the life of the loan, no matter how long it is, the interest accrues without any human interest. "Principal" here refers to the original full amount of the goods given to another person for interest, and "interest" refers to the amount the borrower pays the lender in excess of the principal amount
    If the term is not a round number of years, for example, the depositor has a term of 3 years, 7 months and 12 days, then the return will be calculated according to the above formula, but the months and days will be converted into adult numbers. The date conversion in the field of economics and mathematics follows the following convention: there are 360 days in a year and 30 days in a month.
    Para:
        k: principal
        y: years
        m: months
        d: days
        i: Annual interest rate
    Return:
        interest: interest
        total: Total return
    """
    interest = k*(y+m/12+d/360)*i
    total = k+interest
    return round(interest, 2), round(total, 2)


def mixed_compound_interest(k, y, m, d, i):
    """
    Compound interest is compound interest, which means that annual income can also generate income. Specifically, the whole loan term is divided into several sections, and the interest calculated according to the principal of the previous section should be added into the principal to form the increased principal, which will serve as the principal base for the calculation of interest of the next section until the interest of each section is calculated. After the sum, the interest of the whole loan period can be obtained. Simply put, it is commonly known as compound interest.
    Para:
        k: principal
        y: years
        m: months
        d: days
        i: Annual interest rate
    Return:
        interest: interest
        total: Total return
    """
    total = k*(1+i)**y*(1+i*30*m*d/360)
    interest = total - k
    return round(interest, 2), round(total, 2)


def loan_principal_equal(k, y, t, i):
    """
    Equivalent principal
    Daily interest rate = annual interest rate ÷360= monthly interest rate ÷30
    Para:
        k: principal
        y: years
        t: Staging quantity
        i: Annual interest rate
    Return:
        each_time: Amount of each repayment
        total: Total payment
        interest: interest
    """
    rate = i/(t/y)
    Monthly_principal = k/t
    interest = (t+1)*k*rate/2
    total = k+interest
    each_time = []
    for i in range(int(t)):
        each_time.append(
            round(Monthly_principal+(k-i*Monthly_principal)*rate, 2))
    return each_time, round(interest, 2), round(total, 2)


def loans_equal_principal_and_interest(k, y, t, i):
    """
    Equal principal and interest
    Daily interest rate = annual interest rate ÷360= monthly interest rate ÷30
    Para:
        k: principal
        y: years
        t: Staging quantity
        i: Annual interest rate
    Return:
        each_time: Amount of each repayment
        total: Total payment
        interest: interest
    """
    rate = i/(t/y)
    each_time = k*(rate*(1+rate)**t)/((1+rate)**t-1)
    total = each_time*t
    interest = total - k
    return round(each_time, 2), round(interest, 2), round(total, 2)


def purchasing_power(initial_amount, annual_inflation_rate, time):
    """
    Calculate the purchasing power
    Para:
        initial_amount: principal
        annual_inflation_rate
        time: years
    return:
        a: after x years, the money value
    """
    a = float(initial_amount) * \
        ((100 / (100 + int(annual_inflation_rate))) ** int(time))
    return round(a, 2)

def gdp_growth_rate(current_year_gdp, last_year_gdp):
    """
    Calculate the gdp growth rate
    Para:
        current_year_gdp
        last_year_gdp
    Return:
        rate
    """
    gdp_growth_rate = ((current_year_gdp - last_year_gdp) / last_year_gdp) * 100
    return gdp_growth_rate

def doubling_time(r):
    """
    Calculate the time it takes to make principle double
    Para:
        r:rate
    return:
        time
    """
    t = math.log(2) / math.log(1 + (r / 100))
    return t

def markup_percentage(price, cost):
    """
    Calculate the percentage markup
    Para:
        price
        cost
    return:
        rate
    """
    markup_percentage = ((price - cost) / cost) * 100
    return markup_percentage
