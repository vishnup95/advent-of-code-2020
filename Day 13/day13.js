//const fs = require('fs');

async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split("\n"); // manipulating the input...
}

findTheBus = (t, b) => {
  let timeStamp = 0;
  let bus = 0;
  for (let i = t; i <= t + 100; i++) {
    for (let index = 0; index < b.length; index++) {
      const element = b[index];
      if (i % element === 0) {
        timeStamp = i;
        bus = element;
        break;
      }
    }
    if (timeStamp && bus) break;
  }
  console.log((timeStamp - t) * bus);
};

const modInverse = (a, b) => {
  a %= b;
  for (let x = 1; x < b; x++) {
    if ((a * x) % b == 1) {
      return x;
    }
  }
};

findLowestTimeStamp = ( times, filteredBuses) => {
  //console.log(times);
  //Chinese Remainder Algo method
  // really needed help on this one. But had a lot of fun :)
  let N = filteredBuses.reduce((acc, prev) => {
    return Number(acc) * Number(prev);
  });
  let sum = BigInt(0n);
  for (let i = 0; i < times.length; i++) {
    let remind = i === 0 ? 0 : Number(filteredBuses[i] - Number(times[i]));
    let ni = N / Number(filteredBuses[i]);
    let inverse = modInverse(ni, Number(filteredBuses[i]));
    sum +=
      BigInt(Number(remind)) * BigInt(Number(ni)) * BigInt(Number(inverse));
  }
  console.log(BigInt(sum) % BigInt(Number(N)));
};

readInputData().then((data) => {
  let timeStamp = Number(data[0]);
  let buses = data[1].split(",");
  filteredBuses = buses.filter((bus) => bus !== "x");
  findTheBus(timeStamp, filteredBuses);
  /// Part 2
  let tOfBusses = [];
  buses.forEach((bus, idx) => {
    if (bus !== "x") {
      tOfBusses.push(idx);
    }
  });
  //console.log(tOfBusses);
  findLowestTimeStamp(tOfBusses, filteredBuses);
});
