async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split(/\r?\n/);
}

//Part One

verifyPwds = (pwds) => {
  let count = 0;
  pwds.forEach((pwd) => {
    const indPwd = pwd.split(" ");
    const minNumber = parseInt(indPwd[0].split("-")[0], 10);
    const maxNumber = parseInt(indPwd[0].split("-")[1], 10);
    const reqPwdParam = indPwd[1].split("")[0];
    if (
      minNumber <= indPwd[2].split(reqPwdParam).length - 1 &&
      indPwd[2].split(reqPwdParam).length - 1 <= maxNumber
    ) {
      count++;
    }
  });
  console.log("The number of valid PWDs (part 1) => ", count);
};

// Part Two

reverifyPwds = (pwds) => {
  let count = 0;
  pwds.forEach((pwd) => {
    const indPwd = pwd.split(" ");
    const positionOne = parseInt(indPwd[0].split("-")[0], 10);
    const positionTwo = parseInt(indPwd[0].split("-")[1], 10);
    const reqPwdParam = indPwd[1].split("")[0];
    const splitPwd = indPwd[2].split("");
    // Thanks to stackoverflow..

    if (
      !(splitPwd[positionOne - 1] === reqPwdParam) !==
      !(splitPwd[positionTwo - 1] === reqPwdParam)
    ) {
      count++;
    }
  });
  console.log("The number of valid PWDs(part 2) => ", count);
};

//Read Data...

readInputData().then((pwdData) => {
  verifyPwds(pwdData);
  reverifyPwds(pwdData);
});
