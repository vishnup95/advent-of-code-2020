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
  console.log("Sum of the Values...",(valueArr.reduce((acc, int) => acc + int)));
};

readInputData().then((data) => {
  dockingPrgm(data);
});
