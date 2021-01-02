async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split("\n").filter((ele) => ele !== "");
}

//
conwayCalc = (cubesArr, cntr) => {
  console.log(cubesArr);
  let phase = 1;
  while (phase !== 7) {
    let count = 0;
    let cubesArrCopy = JSON.parse(JSON.stringify(cubesArr));
    for (let z = cntr - phase; z <= cntr + phase; z++) {
      for (let y = 1; y < cubesArr[z].length - 1; y++) {
        for (let x = 1; x < cubesArr[z][0].length - 1; x++) {
          let neighbourSpheres = rtnNeighbours(cubesArr, z, y, x);
          let activeSpheres = neighbourSpheres.filter((ele) => ele === "#");
          let inActiveSpheres = neighbourSpheres.filter((ele) => ele === ".");
          if (cubesArr[z][y][x] === "#") {
            if (activeSpheres.length === 2 || activeSpheres.length === 3) {
              cubesArrCopy[z][y][x] = "#";
              count++
            } else {
              cubesArrCopy[z][y][x] = ".";
            }
          }
          if (cubesArr[z][y][x] === ".") {
            if (activeSpheres.length === 3) {
              cubesArrCopy[z][y][x] = "#";
              count++;
            }
          }
        }
      }
    }
    cubesArr = cubesArrCopy;
    //console.log(cubesArr);
    console.log(count);
    console.log("========");
    phase++;
  }
  console.log(cubesArr);
};

readInputData().then((data) => {
  let zArr = [];
  const xTemp = new Array(data.length * 3).fill(".");
  data = data.map((ele) => {
    return [...xTemp, ...ele, ...xTemp];
  });
  //console.log(data)
  const yTemp = new Array(data[0].length).fill(".");
  for (let index = 0; index < yTemp.length; index++) {
    if (index < yTemp.length / 2) {
      data.unshift(yTemp);
    } else {
      data.push(yTemp);
    }
  }
  const zTemp = new Array(data.length).fill(yTemp);

  for (let index = 0; index < yTemp.length - 1; index++) {
    if (index === Math.floor(yTemp.length / 2)) {
      zArr.push(data);
    }
    zArr.push(zTemp);
  }
  //console.log("yTemp Length", yTemp.length);
  conwayCalc(zArr, Math.floor(yTemp.length / 2));
});

function rtnNeighbours(cubes, zPos, yPos, xPos) {
  let neighbours = [];
  for (let z = -1; z <= 1; z++) {
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        if (z === 0 && y === 0 && x === 0) {
          //console.log("Not needed", z, y, x);
        } else {
          //console.log(z, y, x);
          neighbours.push(cubes[zPos + z][yPos + y][xPos + x]);
        }
      }
    }
  }

  return neighbours;
}
