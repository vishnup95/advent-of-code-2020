async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split("\n"); // manipulating the input...
}

checkIfValueExists = (indices, i) => {
  return indices.includes(i);
};

runBootCode = (data) => {
  let run = true;
  let i = 0;
  let acc = 0;
  let indexes = [0];
  while (run) {
    let splitBootCodeOperation = data[i].split(" ");
    let operationCode = splitBootCodeOperation[0];
    let operationArgument = splitBootCodeOperation[1];

    if (operationCode === "nop") {
      i++;
    } else if (operationCode === "acc") {
      const argumentSign = operationArgument[0];
      const argumentValue = operationArgument.slice(
        1,
        operationArgument.length
      );
      if (argumentSign === "+") {
        acc += Number(argumentValue);
      } else if (argumentSign === "-") {
        acc -= Number(argumentValue);
      }
      i++;
    } else if (operationCode === "jmp") {
      const argumentSign = operationArgument[0];
      const argumentValue = operationArgument.slice(
        1,
        operationArgument.length
      );
      if (argumentSign === "+") {
        i += Number(argumentValue);
      } else if (argumentSign === "-") {
        i -= Number(argumentValue);
      }
    }
    if (checkIfValueExists(indexes, i)) {
      //console.log(acc);
      run = false;
      return false;
    } else {
      indexes.push(i);
    }

    if (i >= data.length) {
      console.log("Acc Value for partt 2", acc);
      run = false;
      return acc;
    }
  }
};

readInputData().then((data) => {
  let copyOfData = [...data];
  let nopOrJmpIndices = [];
  console.log("orginal", copyOfData);
  // let's find the indices..?
  data.forEach((ele, idx) => {
    if (idx !== 0 && (ele.includes("nop") || ele.includes("jmp"))) {
      nopOrJmpIndices.push(idx);
    }
  });
  nopOrJmpIndices.forEach((value) => {
    const bootCode = data[value].split(" ");
    const operation = bootCode[0];
    if (operation === "jmp") {
      data[value] = `nop ${bootCode[1]}`;
    } else if (operation === "nop") {
      data[value] = `jmp ${bootCode[1]}`;
    }
    // data is changed as needed..
    let rtnValue = runBootCode(data);
    data = [...copyOfData];
  });
});
