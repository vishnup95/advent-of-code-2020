async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split("\n"); // manipulating the input...
}

function createBinaryString(nMask) {
  // nMask must be between -2147483648 and 2147483647
  for (
    var nFlag = 0, nShifted = nMask, sMask = "";
    nFlag < 32;
    nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1
  );
  const paddedBinary = sMask.toString().padStart(36, "0");
  return paddedBinary;
}

dockingPrgm = (initializationData) => {
  let mask;
  let valueArr = [];
  for (let data of initializationData) {
    if (data.includes("mask = ")) {
      mask = data.split("= ")[1];
      //console.log(mask);
    } else {
      const regexForPos = /(?<=\[)(.*?)(?=\])/;

      let mtch = data.match(regexForPos);
      //mtch[0] is needed..
      let value = data.split("= ");
      // value[1]is needed..

      let binaryValue = createBinaryString(value[1]);
      for (let i = 0; i < mask.length; i++) {
        if (mask[i] !== "X") {
          binaryValue =
            binaryValue.substring(0, i) +
            mask[i] +
            binaryValue.substring(i + 1);
        }
      }
      valueArr[mtch[0]] = parseInt(binaryValue, 2);
    }
  }
  console.log(
    "Sum of the Values...",
    valueArr.reduce((acc, int) => acc + int)
  );
};

const dockingVersion2 = (initializationData) => {
  let mask;
  let sum = 0;
  let valueArr = [];
  for (let data of initializationData) {
    if (data.includes("mask = ")) {
      mask = data.split("= ")[1];
      //console.log(mask);
    } else {
      const regexForPos = /(?<=\[)(.*?)(?=\])/;

      let mtch = data.match(regexForPos);
      //mtch[0] is needed..
      let value = data.split("= ");
      // value[1]is needed..

      let binaryValue = createBinaryString(mtch[0]);
      //console.log("binValue", binaryValue);
      for (let i = 0; i < mask.length; i++) {
        if (mask[i] === "X") {
          binaryValue =
            binaryValue.substring(0, i) +
            mask[i] +
            binaryValue.substring(i + 1);
        }
        if (mask[i] === "1") {
          binaryValue =
            binaryValue.substring(0, i) +
            mask[i] +
            binaryValue.substring(i + 1);
        }
      }
      let numberOfFloating = binaryValue.split("X").length - 1;
      let copyOfBin = binaryValue;
      for (let subset of orderedMultiSubsets(
        new Set([0, 1]),
        numberOfFloating
      )) {
        // console.log(subset);
        subset.forEach((element) => {
          for (let i = 0; i < binaryValue.length; i++) {
            if (binaryValue[i] === "X") {
              binaryValue =
                binaryValue.substring(0, i) +
                element.toString() +
                binaryValue.substring(i + 1);
              break;
            }
          }
        });
        //console.log(parseInt(binaryValue, 2));
        let newMemAddr = parseInt(binaryValue, 2);
        if (valueArr[newMemAddr] === undefined) {
          sum += Number(value[1]);
        } else {
          sum -= valueArr[newMemAddr];
          sum += Number(value[1]);
        }
        valueArr[newMemAddr] = Number(value[1]);
        binaryValue = copyOfBin;
      }
    }
  }
  console.log("Sum for Part 2", sum);
};

readInputData().then((data) => {
  dockingPrgm(data);
  dockingVersion2(data);
});

function orderedMultiSubsets(set, n) {
  if (!Number.isInteger(n) || n < 0) return (function* () {})();
  let subset = new Array(n),
    iterator = set.values();
  return (function* backtrack(index) {
    if (index === n) {
      yield subset.slice();
    } else {
      for (let i = 0; i < set.size; ++i) {
        subset[index] = iterator.next().value; /* Get first item */
        set.delete(subset[index]); /* Remove it */
        set.add(subset[index]); /* Insert it at the end */
        yield* backtrack(index + 1);
      }
    }
  })(0);
}
//   for(let subset of orderedMultiSubsets(new Set([0,1]), 2)) {
//     console.log(subset);
//   }
