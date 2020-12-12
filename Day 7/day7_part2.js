async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split("\n"); // manipulating the input...
}

calulateBagsHavingShinyGold = (bags) => {
  let searchList = ["shinygold"];
  let numberOfBags = [];
  let totalSum = 0;
  while (searchList.length) {
    let bagToLookFor = searchList.pop();
    let poppedNumber = numberOfBags.pop();
    for (bag of bags) {
      if (bag.primaryBag.includes(bagToLookFor)) {
        let countOfBags = 0;
        for (let i = 0; i < bag.contains.length; i++) {
          if (bag.contains[i].includes("no other bags")) break;
          const truncatedBg = bag.contains[i].replace(/[\s.]/g, "");
          const number = truncatedBg.match(/\d/g);
          let newBag = truncatedBg.split(number[0])[1].replace(/bags|bag/g, "");
          searchList.push(newBag);
          numberOfBags.push(Number(number[0]));

          countOfBags += Number(number[0]);
        }

        if (poppedNumber) {
          totalSum = totalSum + countOfBags * poppedNumber;
        } else {
          totalSum = totalSum + countOfBags;
        }
        console.log("countOfBags", countOfBags);

        console.log("totalSum", totalSum);
        console.log("+++++++++++");
      }
    }
  }
};

readInputData().then((data) => {
  newBagObject = data.map((str) => {
    const bagSplits = str.split(" contain ");
    const obj = {
      primaryBag: bagSplits[0].replace(/[\s.]/g, ""),
      contains: bagSplits[1].split(", "),
    };
    return obj;
  });
  // console.log(newBagObject);
  calulateBagsHavingShinyGold(newBagObject);
});
