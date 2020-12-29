async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split("\n").filter((ele) => ele !== "");
}

scanningErrorRate = (nearByTickets, permissibleValues, yourT, fieldValues) => {
  let product = 1;
  let twoDArr = [];
  let fieldPossiblity = [];
  let copyOfNearby = [...nearByTickets];
  for (let index = 0; index < nearByTickets.length; index++) {
    const ele = nearByTickets[index].split(",").map((ele) => +ele);
    for (let j = 0; j < ele.length; j++) {
      if (!permissibleValues.includes(ele[j])) {
        // We can calculate error scanning rate from here. I destroyed it

        copyOfNearby = copyOfNearby.filter(
          (ele) => ele !== nearByTickets[index]
        );
      }
    }
  }
  //console.log(copyOfNearby);

  for (let index = 0; index < copyOfNearby.length; index++) {
    const element = copyOfNearby[index];
    let tickets = element.split(",").map((ele) => +ele);
    twoDArr.push(tickets);
  }

  for (let j = 0; j < twoDArr[0].length; j++) {
    let values = [];
    for (let i = 0; i < twoDArr.length; i++) {
      values.push(twoDArr[i][j]);
    }

    let possibles = [];
    for (const [key, value] of Object.entries(fieldValues)) {
      const check = values.every((ele) => value.includes(ele));
      if (check) {
        possibles.push(key);
      }
    }
    fieldPossiblity.push(possibles);
  }

  let orderedTickets = [];
  let l = 1;
  while (l !== 20) {
    const indexOfNext = fieldPossiblity.indexOf(
      fieldPossiblity.find((ele) => ele.length === l)
    );
    orderedTickets[indexOfNext] =
      l === 1
        ? fieldPossiblity[indexOfNext][0]
        : fieldPossiblity[indexOfNext].filter(
            (ele) => orderedTickets.indexOf(ele) === -1
          )[0];
    l++;
  }
  console.log(orderedTickets)
  yourT = yourT.map((ele) => +ele);
  orderedTickets.forEach((ticketField, index) => {
    if (ticketField.includes("departure")) {
      product *= yourT[index];
    }
  });
  document.querySelector(".solution").innerHTML = `Part 2 answer is ${product}`;
};

readInputData().then((data) => {
  let yourTicket;
  let nearByTickets = [];
  let valueRange = [];
  let objRanges = [];
  let fieldsObj = {};
  nearByTickets = data.slice(data.indexOf("nearby tickets:") + 1);
  yourTicket = data[data.indexOf("your ticket:") + 1];

  for (let index = 0; index < data.indexOf("your ticket:"); index++) {
    const element = data[index];
    const keyValue = element.split(": ");
    let valueRanges = keyValue[1].split(" or ");
    objRanges = [];
    valueRanges.forEach((ele) => {
      let range = ele.split("-");
      for (let i = Number(range[0]); i <= Number(range[1]); i++) {
        objRanges.push(i);
        if (valueRange.indexOf(i) === -1) {
          valueRange.push(i);
        }
      }
    });
    fieldsObj[keyValue[0]] = objRanges;
  }
  yourTicket = yourTicket.split(",");
  scanningErrorRate(nearByTickets, valueRange, yourTicket, fieldsObj);
});
