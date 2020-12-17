async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  const splits = text.split("\n"); // manipulating the input...
  return splits.map((ele) => [...ele]);
}

isSeatVacant = (i, j, seats) => {
  let adjacentSeats = [
    seats[i][j - 1],
    seats[i - 1][j - 1],
    seats[i - 1][j],
    seats[i - 1][j + 1],
    seats[i][j + 1],
    seats[i + 1][j + 1],
    seats[i + 1][j],
    seats[i + 1][j - 1],
  ];
  const filledSeats = adjacentSeats.filter((ele) => ele === "#");
  if (seats[i][j] === "L") {
    return filledSeats.length === 0 ? true : false;
  } else if (seats[i][j] === "#") {
    return filledSeats.length < 4 ? true : false;
  }
  return false;
};

processSeats = (seatArr) => {
  let previousOccupiedSeats = 0;
  let occupiedSeats = 0;
  // let orginalSeatMapping = JSON.parse(JSON.stringify(seatArr));
  let modifiedArr = seatArr.map((ele) => {
    ele.push("L");
    ele.unshift("L");
    return ele;
  });
  let newArr = new Array(modifiedArr[0].length).fill("L");
  modifiedArr.push(newArr);
  modifiedArr.unshift(newArr);
  let i = 0;

  do {
    let modifiedArrCopy = JSON.parse(JSON.stringify(modifiedArr));
    previousOccupiedSeats = occupiedSeats;
    occupiedSeats = 0;
    for (let i = 1; i < modifiedArr.length - 1; i++) {
      for (let j = 1; j < modifiedArr[i].length - 1; j++) {
        const seat = modifiedArr[i][j];
        if (seat === "L") {
          const isVacant = isSeatVacant(i, j, modifiedArr);
          if (isVacant) {
            modifiedArrCopy[i][j] = "#";
            occupiedSeats++;
          }
        } else if (seat === "#") {
          const isVacant = isSeatVacant(i, j, modifiedArr);
          if (isVacant) {
            modifiedArrCopy[i][j] = "#";
            occupiedSeats++;
          } else {
            modifiedArrCopy[i][j] = "L";
          }
        }
      }
    }
    modifiedArr = [...modifiedArrCopy];
    i++;
  } while (previousOccupiedSeats !== occupiedSeats);
  console.log(occupiedSeats);
};
/*
  Part Two without destroying part one
*/

isSeatVacantLong = (i, j, seats) => {
  let adjacentSeats = [];

  // is there a logic I am missing?
  //Refactor for fucks sake :D

  for (let x = j - 1; x >= 0; x--) {
    if (seats[i][x] === "#" || seats[i][x] === "L") {
      adjacentSeats.push(seats[i][x]);
      break;
    }
  }

  for (let y = i - 1; y >= 0; y--) {
    for (let x = j - 1; x >= 0; x--) {
      if (seats[y][x] === "#" || seats[y][x] === "L") {
        adjacentSeats.push(seats[y][x]);
        break;
      }
      y--;
      continue;
    }
    if (adjacentSeats.length === 2) break;
  }

  for (let y = i - 1; y >= 0; y--) {
    if (seats[y][j] === "#" || seats[y][j] === "L") {
      adjacentSeats.push(seats[y][j]);
      break;
    }
  }

  for (let y = i - 1; y >= 0; y--) {
    for (let x = j + 1; x <= seats[0].length; x++) {
      if (seats[y][x] === "#" || seats[y][x] === "L") {
        adjacentSeats.push(seats[y][x]);
        break;
      }
      y--;
      continue;
    }
    if (adjacentSeats.length === 4) break;
  }

  for (let x = j + 1; x <= seats[0].length; x++) {
    if (seats[i][x] === "#" || seats[i][x] === "L") {
      adjacentSeats.push(seats[i][x]);
      break;
    }
  }

  for (let y = i + 1; y <= seats.length; y++) {
    for (let x = j + 1; x <= seats[0].length; x++) {
      if (seats[y][x] === "#" || seats[y][x] === "L") {
        adjacentSeats.push(seats[y][x]);
        break;
      }
      y++;
      continue;
    }
    if (adjacentSeats.length === 6) break;
  }

  for (let y = i + 1; y <= seats.length; y++) {
    if (seats[y][j] === "#" || seats[y][j] === "L") {
      adjacentSeats.push(seats[y][j]);
      break;
    }
  }

  for (let y = i + 1; y <= seats.length; y++) {
    for (let x = j - 1; x >= 0; x--) {
      if (seats[y][x] === "#" || seats[y][x] === "L") {
        adjacentSeats.push(seats[y][x]);
        break;
      }
      y++;
      continue;
    }
    if (adjacentSeats.length === 8) break;
  }

  //console.log(adjacentSeats);
  const filledSeats = adjacentSeats.filter((ele) => ele === "#");
  if (seats[i][j] === "L") {
    return filledSeats.length === 0 ? true : false;
  } else if (seats[i][j] === "#") {
    return filledSeats.length < 5 ? true : false;
  }
  return false;
};

processSeats2 = (seatArr) => {
  let previousOccupiedSeats = 0;
  let occupiedSeats = 0;
  // let orginalSeatMapping = JSON.parse(JSON.stringify(seatArr));
  let modifiedArr = seatArr.map((ele) => {
    ele.push("L");
    ele.unshift("L");
    return ele;
  });
  let newArr = new Array(modifiedArr[0].length).fill("L");
  modifiedArr.push(newArr);
  modifiedArr.unshift(newArr);


  do {
    let modifiedArrCopy = JSON.parse(JSON.stringify(modifiedArr));
    previousOccupiedSeats = occupiedSeats;
    occupiedSeats = 0;
    for (let i = 1; i < modifiedArr.length - 1; i++) {
      for (let j = 1; j < modifiedArr[i].length - 1; j++) {
        const seat = modifiedArr[i][j];
        if (seat === "L") {
          const isVacant = isSeatVacantLong(i, j, modifiedArr);
          if (isVacant) {
            modifiedArrCopy[i][j] = "#";
            occupiedSeats++;
          }
        } else if (seat === "#") {
          const isVacant = isSeatVacantLong(i, j, modifiedArr);
          if (isVacant) {
            modifiedArrCopy[i][j] = "#";
            occupiedSeats++;
          } else {
            modifiedArrCopy[i][j] = "L";
          }
        }
      }
    }
    modifiedArr = [...modifiedArrCopy];

  } while (previousOccupiedSeats !== occupiedSeats);
  console.log(occupiedSeats);
};

readInputData().then((data) => {
  // This is broken. If you want part1. Uncomment 1st and comment 2nd. sorry. :()
  //processSeats(data);
  processSeats2(data);
});
