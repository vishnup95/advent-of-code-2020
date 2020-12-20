async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split("\n"); // manipulating the input...
}

steerShip = (directions) => {
  let horizontalBoatValue = 0,
    verticalBoatValue = 0;
  horizontalWP = 10;
  verticalWp = 1;
  let wayPointHorizontalDirection = "E",
    wayPointVericalDirection = "N";

  for (let direction of directions) {
    const cardDirection = direction[0];
    const numericValue = Number(direction.slice(1));

    switch (cardDirection) {
      case "F":
        switch (wayPointHorizontalDirection) {
          case "E":
            horizontalBoatValue += horizontalWP * numericValue;
            break;
          case "W":
            horizontalBoatValue =
              horizontalWP * numericValue + horizontalBoatValue;
            break;
        }
        switch (wayPointVericalDirection) {
          case "N":
            verticalBoatValue += verticalWp * numericValue;
            break;
          case "S":
            verticalBoatValue = verticalWp * numericValue + verticalBoatValue;
            break;
        }
        break;

      case "N":
        verticalWp += numericValue;
        break;

      case "S":
        verticalWp -= numericValue;
        break;

      case "E":
        horizontalWP += numericValue;
        break;

      case "W":
        horizontalWP -= numericValue;
        break;

      case "R":
        switch (numericValue) {
          case 90:
            [horizontalWP, verticalWp] = [verticalWp, -horizontalWP];
            break;
          case 180:
            [horizontalWP, verticalWp] = [-horizontalWP, -verticalWp];
            break;
          case 270:
            [horizontalWP, verticalWp] = [-verticalWp, horizontalWP];
            break;

          default:
            break;
        }
        break;

      case "L":
        switch (numericValue) {
          case 90:
            [horizontalWP, verticalWp] = [-verticalWp, horizontalWP];
            break;
          case 180:
            [horizontalWP, verticalWp] = [-horizontalWP, -verticalWp];
            break;
          case 270:
            [horizontalWP, verticalWp] = [verticalWp, -horizontalWP];
            break;

          default:
            break;
        }
        break;

      default:
        break;
    }
    if (horizontalWP < 0) wayPointHorizontalDirection = "W";
    else wayPointHorizontalDirection = "E";

    if (verticalWp < 0) wayPointVericalDirection = "S";
    else wayPointVericalDirection = "N";
  }
  console.log(Math.abs(horizontalBoatValue) + Math.abs(verticalBoatValue));
};

readInputData().then((data) => {
  steerShip(data);
});
