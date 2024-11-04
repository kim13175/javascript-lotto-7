import { boardMessage } from "../constant/boardMessage.js";

export class Calculator {
    static #prizeMoney = {
        FIRST : boardMessage.FIRST,
        SECOND : boardMessage.SECOND,
        THIRD : boardMessage.THIRD,
        FOURTH : boardMessage.FOURTH,
        FIFTH : boardMessage.FIFTH,
        NONE : boardMessage.NONE
    }
    static #lottoPrize = 1000;

    static #initialLottos(){
        return Array(6).fill(0);
    }

    #calculateLottoResults(lottos, comparision){
        return lottos.map(lotto => comparision.compareWithLotto(lotto));
    }

    #countRankResult(results){
        return results.reduce((counts, result) => {
            counts[result.rank]++;
            return counts;
        }, this.constructor.#initialLottos());
    }

    #calculateWinningStatics(lottos, comparison){
        const lottoResult = this.#calculateLottoResults(lottos, comparison);
        const rankCounts = this.#countRankResult(lottoResult);

        return {
            first : {count : rankCounts[1], prize : Calculator.#prizeMoney.FIRST},
            second : {count : rankCounts[2], prize : Calculator.#prizeMoney.SECOND},
            third : {count : rankCounts[3], prize : Calculator.#prizeMoney.THIRD},
            fourth : {count : rankCounts[4], prize : Calculator.#prizeMoney.FOURTH},
            fifth : {count : rankCounts[5], prize : Calculator.#prizeMoney.FIFTH},
        };
    }

    #calculateTotalPrize(rank){
        const prizes = [
            Calculator.#prizeMoney.FIRST,
            Calculator.#prizeMoney.SECOND,
            Calculator.#prizeMoney.THIRD,
            Calculator.#prizeMoney.FOURTH,
            Calculator.#prizeMoney.FIFTH
        ];

        return rank.reduce((sum, count, rank) => sum + (prizes[rank] * count), 0);
    }

    #roundToDecimal(number, decimals) {
        const factor = Math.pow(10, decimals);
        return Math.round(number * factor) / factor;
    }

    #calculateProfitRate(rankCounts, total){
        const totalPrize = parseInt(this.#calculateTotalPrize(rankCounts));
        const totalCoast = total * Calculator.#lottoPrize;

        return this.#roundToDecimal((totalPrize / totalCoast * 100), 2);
    }

    calculateGameResults(lottos, comparison) {
        const results = this.#calculateLottoResults(lottos, comparison);
        const rankCounts = this.#countRankResult(results);
        const winningStatistics = this.#calculateWinningStatics(lottos, comparison);
        const profitRate = this.#calculateProfitRate(rankCounts);

        return {
            statistics: winningStatistics,
            profitRate: profitRate
        };
    }
}