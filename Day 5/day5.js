async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split(/\r?\n/);
}

let rowStart = 0;
let rowEnd = 127;
let colStart = 0;
let colEnd = 7;
let seatValues = [];
let seatValue = 0;

calculateSeatPos = (boardingInfos) => {
  boardingInfos.forEach((boardingInfo) => {
    const rowData = boardingInfo.slice(0, 7);
    [...rowData].forEach((fOrB) => {
      if (fOrB === "F") {
        rowEnd = (rowEnd + rowStart - 1) / 2;
      } else if (fOrB === "B") {
        rowStart = (rowStart + rowEnd + 1) / 2;
      }
    });
    const colData = boardingInfo.slice(-3);
    [...colData].forEach((rOrL) => {
      if (rOrL === "R") {
        colStart = (colStart + colEnd + 1) / 2;
      } else if (rOrL === "L") {
        colEnd = (colStart + colEnd - 1) / 2;
      }
    });
    seatValue = rowStart * 8 + colStart;
    seatValues.push(seatValue);
    rowStart = 0;
    rowEnd = 127;
    colStart = 0;
    colEnd = 7;
  });
};

findMissingNumber = (sortedSeatIds) => {
  let startValue = sortedSeatIds[0];
  // sortedSeatIds.forEach(ids => {
  //   if(ids === startValue) startValue++;
  //   else console.log(ids)
  // })
  for (let i = 0; i < sortedSeatIds.length; i++) {
    if (sortedSeatIds[i] === startValue) startValue++;
    else {
      console.log("Missing Value:", startValue);
      break;
    }
  }
};

readInputData().then((data) => {
  calculateSeatPos(data);
  console.log("The max seat value is...", Math.max(...seatValues));

  //Second part 682
  const sortedArray = seatValues.sort((a, b) => a - b);
  findMissingNumber(sortedArray);
});
