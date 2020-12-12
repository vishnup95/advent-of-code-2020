console.time("time");
async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split("\n"); // manipulating the input...
}

let count = 0;

calulateBagsHavingShinyGold = (bags) => {
  let searchList = ["shiny gold"];

  while (searchList.length) {
    let bagToLookFor = searchList.pop();
    for (bag of bags) {
      //console.log(bag)
      if (bag.contains.includes(bagToLookFor)) {
        bag.checked = true;
        searchList.push(bag.primaryBag.split(" bag")[0]);
      }
    }
  }
  bags.forEach((ele) => {
    if (ele.checked) count++;
  });
  console.log("Never thought this would work!... The count is", count);
  console.timeEnd("time");
};

readInputData().then((data) => {
  newBagObject = data.map((str) => {
    const bagSplits = str.split(" contain ");
    const obj = {
      primaryBag: bagSplits[0],
      contains: bagSplits[1].split(", ").join(","),
      checked: false,
    };
    return obj;
  });
  calulateBagsHavingShinyGold(newBagObject);
});
