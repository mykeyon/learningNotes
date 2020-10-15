let hello = "string";

class helloworld{
  name: string = "hello world"

}

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

enum Enum{
  A,
  B,
  C = 'C',
  D = 'D',
  E = 8,
  F,
}

console.log(Enum.A);
console.log(Enum[0]);
