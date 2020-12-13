console.time("xmas");
async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split("\n"); // manipulating the input...
}

findEncryptionWeakness = (xmasData) => {
  //[1,2,3,4,5]
  let sum = 0;
  let i = 0;

  while (xmasData.length) {
    let ele = xmasData[i];
    sum += parseInt(ele, 10);
    if (sum < 1492208709) {
      i++;
    } else if (sum > 1492208709) {
      xmasData.shift();
      i = 0;
      sum = 0;
    } else if (sum === 1492208709) {
      //console.log(xmasData.splice(0, i + 1));
      let encryptionWeakness = xmasData.splice(0,i+1);
      const minValue = Math.min(...encryptionWeakness)
      const maxValue = Math.max(...encryptionWeakness)
      console.log("The encryption weakness", minValue + maxValue)
      break;
    }
  }
};

readInputData().then((data) => {
  let copyOfArray = [...data];
  // We can splice to get
  let preambleLength = 25;
  let restOfArray = data.slice(preambleLength);
  for (let ele = 0; ele < restOfArray.length; ele++) {
    let preamble = data.splice(ele, preambleLength);
    for (let i = 0; i < preamble.length; i++) {
      for (let j = 0; j < preamble.length; j++) {
        if (i !== j) {
          let sum = parseInt(preamble[i], 10) + parseInt(preamble[j], 10);
          if (sum === parseInt(restOfArray[ele], 10)) {
            restOfArray[ele] = 0;
            break;
          }
        }
      }
      if (restOfArray[ele] === 0) break;
    }
    data = [...copyOfArray];
  }
  console.log(
    "The number not the sum of preamble is =>",
    restOfArray.filter((ele) => ele !== 0)[0]
  );
  // Part 2
  const invalidNumber = restOfArray.filter((ele) => ele !== 0);
  const newLimit = data.indexOf(invalidNumber[0]);
  const newData = data.splice(0, newLimit);
  findEncryptionWeakness(newData);
  console.timeEnd("xmas");
});
