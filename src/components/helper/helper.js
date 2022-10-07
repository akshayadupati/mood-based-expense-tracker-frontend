import _ from "lodash";

export function getSum(transaction, type) {
  let sum = _(transaction)
    .groupBy("transactionMood")
    .map((obj, key) => {
      if (!type) return _.sumBy(obj, "transactionAmount");
      return {
        transactionMood: key,
        color: obj[0].color,
        total: _.sumBy(obj, "transactionAmount"),
      };
    })
    .value();

  return sum;
}

export function getLabels(transaction) {
  let amountSum = getSum(transaction, "transactionAmount");
  let totalAmount = _.sum(getSum(transaction));
  let percent = _(amountSum)
    .map((obj) => _.assign(obj, { percent: (100 * obj.total) / totalAmount }))
    .value();

  return percent;
}

export function chartData(transaction) {
  let bg = _.map(transaction, (a) => a.color);
  bg = _.uniq(bg);
  let dataValue = getSum(transaction);
  const config = {
    data: {
      datasets: [
        {
          data: dataValue,
          backgroundColor: bg,
          hoverOffset: 4,
          borderRadius: 25,
          borderColor: "transparent",
          spacing: 5,
        },
      ],
    },
    options: {
      cutout: 120,
      animation: {
        animateScale: true,
      },
    },
  };

  return config;
}

export function totalSum(transaction) {
  return _.sum(getSum(transaction));
}
