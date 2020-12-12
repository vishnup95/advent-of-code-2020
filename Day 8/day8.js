async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split("\n"); // manipulating the input...
}

checkIfValueExists = (indices, i) => {
    return indices.includes(i)
}


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
    if(checkIfValueExists(indexes,i)) {
       console.log(acc);
       run = false;
       break;
    } else {
      indexes.push(i)
    }
  }
};

readInputData().then((data) => {
  runBootCode(data);
});
