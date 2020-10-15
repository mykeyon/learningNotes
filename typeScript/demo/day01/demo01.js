var hello = "string";
var helloworld = /** @class */ (function () {
    function helloworld() {
        this.name = "hello world";
    }
    return helloworld;
}());
// enum Direction {
//   NORTH = 2,
//   SOUTH,
//   EAST,
//   WEST
// }
// let dir: Direction = Direction.NORTH;
// enum Direction{
//   NORTH = "NORTH",
//   SOUTH = "SOUTH",
//   WAST = "WAST",
//   WEST = "WEST"
// }
// const enum Direction{
//   NORTH,
//   SOUTH,
//   WAST,
//   WEST
// }
// let dir:Direction = Direction.NORTH;
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 1] = "B";
    Enum["C"] = "C";
    Enum["D"] = "D";
    Enum[Enum["E"] = 8] = "E";
    Enum[Enum["F"] = 9] = "F";
})(Enum || (Enum = {}));
console.log(Enum.A);
console.log(Enum[0]);
