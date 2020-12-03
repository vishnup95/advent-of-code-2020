async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split(/\r?\n/);
}

// Right 3, down 1
airportJourney = (data) => {
  let forestMap = data.map((el) => el.split(""));
  let xPos = 0;
  yPos = 0;
  numberOfTrees = 0;
  while (yPos !== forestMap.length - 1) {
    xPos = xPos + 3;
    yPos = yPos + 1;
    if (xPos >= forestMap[0].length) xPos = xPos - forestMap[0].length; // repeated structure...
    if (forestMap[yPos][xPos] === "#") numberOfTrees++;
  }
  console.log("Number of trees hit =>", numberOfTrees);
};

airportJourney2 = (data) => {
  let forestMap = data.map((el) => el.split(""));

  numberOfTreesArr = [];
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  for (let i = 0; i < slopes.length; i++) {
    let numberOfTrees = 0;
    let xPos = 0;
    yPos = 0;
    while (yPos !== forestMap.length - 1) {
      xPos = xPos + slopes[i][0];
      yPos = yPos + slopes[i][1];
      if (xPos >= forestMap[0].length) xPos = xPos - forestMap[0].length; // repeated structure...
      if (forestMap[yPos][xPos] === "#") numberOfTrees++;
    }
    numberOfTreesArr.push(numberOfTrees);
  }
  console.log(
    "Product of the number of trees => ",
    numberOfTreesArr.reduce((acc, curr) => acc * curr)
  );
};

readInputData().then((data) => {
  airportJourney(data);
  airportJourney2(data);
});
