async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split("\n"); // manipulating the input...
}
// Help from reddit. Learned DP. Great problem.
function combinations(value, set, memo = {}) {
  if (memo[value]) {
    return memo[value];
  }
  if (value === 0) {
    memo[value] = 1;
    return 1;
  }
  if (value < 0) {
    memo[value] = 0;
    return 0;
  }
  if (set.indexOf(value) === -1) {
    memo[value] = 0;
    return 0;
  }
  memo[value] =
    combinations(value - 1, set, memo) +
    combinations(value - 2, set, memo) +
    combinations(value - 3, set, memo);
  return memo[value];
}

readInputData().then((data) => {
  const numberData = data.map((ele) => parseInt(ele, 10));
  const sortedData = numberData.sort((a, b) => a - b);
  const deviceRating = numberData[numberData.length - 1] + 3;
  sortedData.push(deviceRating);
  sortedData.unshift(0);
  let countOf3diff = 0;
  let countOf1diff = 0;

  for (let index = 0; index < sortedData.length - 1; index++) {
    const adapter = sortedData[index];
    const nextAdapter = sortedData[index + 1];
    if (nextAdapter - adapter === 3) countOf3diff++;
    else if (nextAdapter - adapter === 1) countOf1diff++;
  }
  console.log(countOf1diff * countOf3diff);

  console.log(combinations(deviceRating, sortedData));
});
