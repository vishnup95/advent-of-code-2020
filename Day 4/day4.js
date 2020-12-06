async function readInputData() {
  const res = await fetch("passports.txt");
  const text = await res.text();
  return text.split("\n\n"); // manipulating the input...
}

const fields = {
  req: ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"],
  opt: ["cid"],
};

const detailedFieldInfo = {
  req: [
    {
      field: "byr",
      length: 4,
      min: 1920,
      max: 2002,
      checkValueValidity: function (value) {
        if (value.length === 4 && value >= this.min && value <= this.max)
          return true;
        return false;
      },
    },
    {
      field: "iyr",
      length: 4,
      min: 2010,
      max: 2020,
      checkValueValidity: function (value) {
        if (value.length === 4 && value >= this.min && value <= this.max)
          return true;
        return false;
      },
    },
    {
      field: "eyr",
      length: 4,
      min: 2020,
      max: 2030,
      checkValueValidity: function (value) {
        if (value.length === 4 && value >= this.min && value <= this.max)
          return true;
        return false;
      },
    },
    {
      field: "hgt",
      checkValueValidity: function (value) {
        const unit = value.slice(-2);
        const num = value.replace(/\D/g, "");
        if (unit === "cm") {
          if (parseInt(num) >= 150 && parseInt(num) <= 193) {
            return true;
          }
          return false;
        }
        if (unit === "in") {
          if (parseInt(num) >= 59 && parseInt(num) <= 76) return true;
          return false;
        }
        return false;
      },
    },
    {
      field: "hcl",
      length: 7,
      regexCheck: new RegExp(/^\#[a-z0-9]+$/i),
      checkValueValidity: function (value) {
        if (this.regexCheck.test(value) && value.length === 7) return true;
        return false;
      },
    },
    {
      field: "ecl",
      supportedValues: ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"],
      checkValueValidity: function (value) {
        if (this.supportedValues.includes(value)) return true;
        return false;
      },
    },
    {
      field: "pid",
      length: 9,
      regexCheck: new RegExp(/^\d{9}$/), // Fucked up with thiss.
      checkValueValidity: function (value) {
        if (this.regexCheck.test(value)) return true;
        return false;
      },
    },
    {
      field: "cid",
      checkValueValidity: function (value) {
        return true;
      },
    },
  ],
};

let count = 0;
let detailedCount = 0;

checkValidity = (ele) => {
  const valid = fields.req.every((field) => {
    if (ele.indexOf(field) === -1) return false;
    return true;
  });
  if (valid) count++;
};

checkPassportFields = (passport) => {
  const checkPass = passport.map((ele) => ele.split(":")[0]);
  checkValidity(checkPass);
};

const checkPassportValidity = (data) => {
  data.forEach((pass) => {
    //Thanks to SO...
    let passDetails = pass.split(/\s+/);
    checkPassportFields(passDetails);
  });
  console.log("Part One count", count);
};

// Part 2 code,

// Not reusing this function for now
checkFieldValidity = (ele) => {
  const valid = fields.req.every((field) => {
    if (ele.indexOf(field) === -1) return false;
    return true;
  });
  return valid;
};

checkPassportFieldsDetailed = (passport) => {
  const checkPass = passport.map((ele) => ele.split(":")[0]);
  const fieldsValidPass = checkFieldValidity(checkPass);
  if (fieldsValidPass) {
    let validPassport = true;
    passport.forEach((validPwdFields) => {
      const [field, value] = validPwdFields.split(":");
      const objectOfInterest = detailedFieldInfo.req.filter(
        (ele) => ele.field === field
      );
      if (objectOfInterest[0]?.checkValueValidity(value)) {
        // console.log([field, value]);
      } else {
        validPassport = false;
      }
    });
    if (validPassport) {
      detailedCount++;
    }
  }
};

const checkPassportValidityDetailed = (data) => {
  data.forEach((pass) => {
    //Thanks to SO...
    let passDetails = pass.split(/\s+/);
    checkPassportFieldsDetailed(passDetails);
  });
  console.log("Second part valid pass", detailedCount);
};

readInputData().then((data) => {
  //Part 1
  checkPassportValidity(data);
  //part 2
  checkPassportValidityDetailed(data);
});
