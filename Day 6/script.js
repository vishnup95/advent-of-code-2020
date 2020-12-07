console.time("yes");
async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split("\n\n"); // manipulating the input...
}

let numberOfYes = 0;
let uniqueYes = 0;

getNumbersOfYes = (answers) => {
  answers.forEach((answer) => {
    const splitUpAnswer = answer.split("").filter((ele) => ele !== "\n");

    const uniqueAnswers = [...new Set(splitUpAnswer)];
    numberOfYes = numberOfYes + uniqueAnswers.length;
  });
  console.log("Part 1 Yeses..", numberOfYes);
  console.timeEnd("yes");
};

getUniqueAnswers = (answers) => {
  answers.forEach((answer) => {
    const splitUpAnswer = answer.split("\n");
    if (splitUpAnswer.length < 2) {
      uniqueYes = uniqueYes + splitUpAnswer[0].length;
    } else {
      const firstSetOfAnswers = [...splitUpAnswer[0]];
      splitUpAnswer.shift();
      firstSetOfAnswers.forEach((cmnEle) => {
        let commonOrNot = true;
        splitUpAnswer.forEach((ele) => {
          if (ele.indexOf(cmnEle) === -1) {
            commonOrNot = false;
          }
        });
        if (commonOrNot) {
          uniqueYes++;
        }
      });
    }
  });
  console.log("Unique Yeses", uniqueYes);
};

readInputData().then((data) => {
  getNumbersOfYes(data);
  getUniqueAnswers(data);
});
