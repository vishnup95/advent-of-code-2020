async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split("\n"); // manipulating the input...
}

const playTheElfGame = (numbers) => {
  while (numbers.length !== 2020) {
    let lastSpokenNumber = numbers[numbers.length - 1];
    let indexOfLastSpokenNumber = numbers.lastIndexOf(lastSpokenNumber, -2);
    if (indexOfLastSpokenNumber === -1) numbers.push(0);
    else numbers.push(numbers.length - (indexOfLastSpokenNumber + 1));
    //numbers.push(1)
  }
  console.log(numbers)
};

readInputData().then((data) => {
  const startingData = data[0].split(",").map((ele) => parseInt(ele, 10));
  playTheElfGame(startingData);
});
