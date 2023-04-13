import math
import finnhub
import configparser
config = configparser.ConfigParser()
config.read('config.ini', encoding='utf-8')


def market_news(category="forex"):
    """
    This parameter can be 1 of the following values general, forex, crypto, merger.
    """
    finnhub_client = finnhub.Client(
        api_key=config["FINNHUB"]["KEY"])
    return finnhub_client.general_news(category, min_id=0)


def kelly(b, p, q):
    """
    https://wiki.mbalib.com/wiki/%E5%87%AF%E5%88%A9%E5%85%AC%E5%BC%8F
    凯利公式是一条可应用在投资资金和赌注的公式。
    应用于多次的随机赌博游戏，资金的期望增长率最高，
    且永远不会导致完全损失所有资金的后果。它假设赌博可无限次进行，而且没有下注上下限。
    这条公式是克劳德·艾尔伍德·香农在贝尔实验室的同事物理学家约翰·拉里·凯利在1956年提出的。
    凯利的方法参考了香农关于长途电话线的嘈音的工作。凯利说明香农的信息论可应用于此：
    赌徒不必要获得完全的资讯。香农的另一位同事Edward O. Thorp应用这条公式在廿一点和股票市场上。
    1738年丹尼·伯努利曾提出等价的观点，可是伯努利的文章直到1954年才首次译成英语。
    不过对于只投资一次的人来说，应选择算术平均最高的投资组合。
    """

    """
    例如：若一个游戏有40%（p=0.40）机会胜出，赔率为2:1（b=2），这个赌客便应每次投注(2 × 0.40 -0.60)/2 = 10%的资金。

    再举个最简单的例子：硬币的正反面，正面胜，反面输，胜率50%，赔率1.5:1。

    代入凯利公式，b赔率是1.5，p和q都是0.5，则f=(bp - q) ÷ b = (1.5 * 50% - 50%) ÷ 1.5 = 16.6%。

    f^*=16.6%是你下注最有利的比例，每次拿出16.6%进行下注，才能使你的收益最大化。 这是在你期望值为正的前提下，即（bp-q）>0，在抛硬币的案例里，期望值=0.25（赢面）是正的。
    """
    return round((b*p-q)/b, 6)


def mixed_simple_interest(k, years, months, days, i):
    """
    https://wiki.mbalib.com/wiki/%E5%8D%95%E5%88%A9 
    单利指借款的成本或放贷的收益，是计算利息的一种方法，单利的计算取决于所借款项或供款的金额本金，资余借用时间的长及市场一利率水平等因素
    按照单利计算的方法，只要本金在贷款期限中获得利息，不管时间多长，所生利息均不加人本全重复计算利息。这里所说的"本金”是指货给别人以收取利息的原本全额，“利息”是指借款人付给贷款人超过本金部分的金额
    期限不是整数年的情况，比如储户的存款期限为 3 年，7 个月另 12 天，这时的收益的计算方法仍然按照上面的公式，但是要把月和天数换算成年数。在经济数学领域的日期换算中遵照如下约定：1 年有 360 天，1 个月有 30 天。
    Para:
        k: 本金
        years: 年份
        months: 月份
        days: 天数
        i: 年利率
    Return:
        interest: 利息
        total: 总计返还
    """
    interest = k*(years+months/12+days/360)*i
    total = k+interest
    return round(interest, 2), round(total, 2)


def mixed_compound_interest(k, years, months, days, i):
    """
    复利就是复合利息，它是指每年的收益还可以产生收益，具体是将整个借贷期限分割为若干段，前一段按本金计算出的利息要加入到本金中，形成增大了的本金，作为下一段计算利息的本金基数，直到每一段的利息都计算出来，加总之后，就得出整个借贷期内的利息，简单来说就是俗称的利滚利。
    Para:
        k: 本金
        years: 年份
        months: 月份
        days: 天数
        i: 年利率
    Return:
        interest: 利息
        total: 总计返还
    """
    total = k*(1+i)**years*(1+i*30*months*days/360)
    interest = total -k 
    return round(interest,2), round(total,2)


