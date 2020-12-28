async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split("\n"); // manipulating the input...
}


// Thanks to reddit for knowledge about MAP. i love JS


const play = (numbers, times = 2020) => {
  //const numbers = ip.split(',').map(n => +n);
  const memory = new Map();
  numbers.forEach((n, i) => memory.set(n, i + 1));
  let current = 0;
  for (let turn = numbers.length + 1; turn < times; turn++) {
    if (memory.has(current)) {
      const lt = memory.get(current);
      memory.set(current, turn);
      current = turn - lt;
    } else {
      memory.set(current, turn);
      current = 0;
    }
  }
  console.log(current);
};
readInputData().then((data) => {
  const startingData = data[0].split(",").map((ele) => parseInt(ele, 10));
 // change to 2020 for part1
  play(startingData, 30000000);
});
