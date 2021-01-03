console.time("conway")
async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split("\n").filter((ele) => ele !== "");
}

//
conwayCalc = (cubesArr, cntr) => {
  // console.log(cubesArr);
  let phase = 1;
  while (phase !== 7) {
    let count = 0;
    let cubesArrCopy = JSON.parse(JSON.stringify(cubesArr));
    for (let z = cntr - phase; z <= cntr + phase; z++) {
      for (let y = 1; y < cubesArr[z].length - 1; y++) {
        for (let x = 1; x < cubesArr[z][0].length - 1; x++) {
          let neighbourSpheres = rtnNeighbours(cubesArr, z, y, x);
          let activeSpheres = neighbourSpheres.filter((ele) => ele === "#");
          if (cubesArr[z][y][x] === "#") {
            if (activeSpheres.length === 2 || activeSpheres.length === 3) {
              cubesArrCopy[z][y][x] = "#";
              count++;
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
    console.log(`The number of active cubes in phase ${phase}`, count);
    console.log("========");
    phase++;
  }
  console.log(cubesArr);
  console.log("========== PART 2 BELOW ========");
};

/*
   Part2 calculations below. 
*/

conwayCalcPart2 = (cubesArr, cntr) => {
  // console.log(cubesArr);
  let phase = 1;
  while (phase !== 7) {
    let count = 0;
    let cubesArrCopy = JSON.parse(JSON.stringify(cubesArr));
    for (let w = cntr - phase; w <= cntr + phase; w++) {
      for (let z = 1; z < cubesArr[w].length - 1; z++) {
        for (let y = 1; y < cubesArr[z].length - 1; y++) {
          for (let x = 1; x < cubesArr[z][0].length - 1; x++) {
            let neighbourSpheres = testNeighbours(cubesArr, w, z, y, x);
            let activeSpheres = neighbourSpheres.filter((ele) => ele === "#");
            if (cubesArr[w][z][y][x] === "#") {
              if (activeSpheres.length === 2 || activeSpheres.length === 3) {
                cubesArrCopy[w][z][y][x] = "#";
                count++;
              } else {
                cubesArrCopy[w][z][y][x] = ".";
              }
            }
            if (cubesArr[w][z][y][x] === ".") {
              if (activeSpheres.length === 3) {
                cubesArrCopy[w][z][y][x] = "#";
                count++;
              }
            }
          }
        }
      }
    }
    cubesArr = cubesArrCopy;
    console.log(`The number of active cubes in phase ${phase}`, count);
    console.log("========");
    phase++;
  }
  console.log(cubesArr);
  console.timeEnd("conway")
};

/*
  General  
*/
readInputData().then((data) => {
  let zArr = [];
  let wArr = [];
  let zArrTemp = [];
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

  conwayCalc(zArr, Math.floor(yTemp.length / 2));

  // Part 2 from here....

  for (let index = 0; index <= yTemp.length - 1; index++) {
    zArrTemp.push(zTemp);
  }

  for (let index = 0; index < zArr.length - 1; index++) {
    if (index === Math.floor(zArr.length / 2)) {
      wArr.push(zArr);
    }
    wArr.push(zArrTemp);
  }
  conwayCalcPart2(wArr, Math.floor(wArr.length / 2));
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

function testNeighbours(cubes, wPos, zPos, yPos, xPos) {
  let neighbours = [];
  for (let w = -1; w <= 1; w++) {
    for (let z = -1; z <= 1; z++) {
      for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
          if (z === 0 && y === 0 && x === 0 && w === 0) {
            //console.log("Not needed", z, y, x);
          } else {
            //console.log(z, y, x);
            neighbours.push(cubes[wPos + w][zPos + z][yPos + y][xPos + x]);
          }
        }
      }
    }
  }
  return neighbours;
  //console.log(neighbours);
}
