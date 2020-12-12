async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split("\n"); // manipulating the input...
}



readInputData().then((data) => {
  newBagObject = data.map((str) => {
    const bagSplits = str.split(" bags contain ");
    console.log(bagSplits)
    return obj;
  });
  console.log(newBagObject);
  calulateBagsHavingShinyGold(newBagObject);
});
