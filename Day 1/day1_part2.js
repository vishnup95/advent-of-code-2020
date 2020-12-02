async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split(/\r?\n/);
}

readInputData().then((data) => {
  //into numbers
  expenseReportNumbers = data.map((ele) => parseInt(ele, 10));
  // Creating a copy.
  const copy = expenseReportNumbers.slice();
  // loops everywhere!
  for (let i = 0; i < expenseReportNumbers.length; i++) {
    const firstEle = expenseReportNumbers[0];
    expenseReportNumbers.splice(0, 1);
    while (expenseReportNumbers.length) {
      const secondSum = firstEle + expenseReportNumbers[0];
      expenseReportNumbers.splice(0, 1);
      expenseReportNumbers.forEach((ele) => {
        if (ele + secondSum === 2020)
          console.log(
            "The product of the three numbers is =>",
            firstEle * (secondSum - firstEle) * ele
          );
      });
    }
    expenseReportNumbers = [...copy];
    expenseReportNumbers.splice(0, i);
  }
});
