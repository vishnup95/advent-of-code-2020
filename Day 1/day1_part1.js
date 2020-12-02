let expenseReportNumbers = [];

async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split(/\r?\n/);
}

readInputData().then((data) => {
  //Convert to numbers..
  expenseReportNumbers = data.map((ele) => parseInt(ele, 10));
  // the logic..
  while (expenseReportNumbers.length) {
    const ele = expenseReportNumbers[0];
    expenseReportNumbers.splice(0, 1);
    expenseReportNumbers.forEach((newEle) => {
      const sum = ele + newEle;
      if (sum === 2020)
        console.log("Product of 2 numbers whose sum is 2020 ->", ele * newEle);
    });
  }
});
