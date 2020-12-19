async function readInputData() {
  const res = await fetch("input.txt");
  const text = await res.text();
  return text.split("\n"); // manipulating the input...
}

steerShip = (directions) => {
  let horizontalValue = 0,
    verticalValue = 0;
  let currentDirection = "E";

  for (let direction of directions) {
    const cardDirection = direction[0];
    const numericValue = Number(direction.slice(1));

    switch (cardDirection) {
      case "F":
        switch (currentDirection) {
          case "E":
            horizontalValue += numericValue;
            break;
          case "W":
            horizontalValue -= numericValue;
            break;
          case "N":
            verticalValue += numericValue;
            break;
          case "S":
            verticalValue -= numericValue;
            break;
        }
        break;

      case "N":
        verticalValue += numericValue;
        break;

      case "S":
        verticalValue -= numericValue;
        break;

      case "E":
        horizontalValue += numericValue;
        break;

      case "W":
        horizontalValue -= numericValue;
        break;

      case "L":
        switch (currentDirection) {
          case "E":
            switch (numericValue) {
              case 90:
                currentDirection = "N";
                break;
              case 180:
                currentDirection = "W";
                break;
              case 270:
                currentDirection = "S";
                break;

              default:
                break;
            }
            break;
          case "N":
            switch (numericValue) {
              case 90:
                currentDirection = "W";
                break;
              case 180:
                currentDirection = "S";
                break;
              case 270:
                currentDirection = "E";
                break;

              default:
                break;
            }
            break;
          case "W":
            switch (numericValue) {
              case 90:
                currentDirection = "S";
                break;
              case 180:
                currentDirection = "E";
                break;
              case 270:
                currentDirection = "N";
                break;

              default:
                break;
            }
            break;
          case "S":
            switch (numericValue) {
              case 90:
                currentDirection = "E";
                break;
              case 180:
                currentDirection = "N";
                break;
              case 270:
                currentDirection = "W";
                break;

              default:
                break;
            }
            break;

          default:
            break;
        }
        break;

      case "R":
        switch (currentDirection) {
          case "E":
            switch (numericValue) {
              case 90:
                currentDirection = "S";
                break;
              case 180:
                currentDirection = "W";
                break;
              case 270:
                currentDirection = "N";
                break;

              default:
                break;
            }
            break;
          case "N":
            switch (numericValue) {
              case 90:
                currentDirection = "E";
                break;
              case 180:
                currentDirection = "S";
                break;
              case 270:
                currentDirection = "W";
                break;

              default:
                break;
            }
            break;
          case "W":
            switch (numericValue) {
              case 90:
                currentDirection = "N";
                break;
              case 180:
                currentDirection = "E";
                break;
              case 270:
                currentDirection = "S";
                break;

              default:
                break;
            }
            break;
          case "S":
            switch (numericValue) {
              case 90:
                currentDirection = "W";
                break;
              case 180:
                currentDirection = "N";
                break;
              case 270:
                currentDirection = "E";
                break;

              default:
                break;
            }
            break;

          default:
            break;
        }
        break;

      default:
        break;
    }
  }
  console.log(Math.abs(horizontalValue) + Math.abs(verticalValue));
};

readInputData().then((data) => {
  steerShip(data);
});
