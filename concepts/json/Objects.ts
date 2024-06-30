import fs from "fs";

interface Person {
  name: string;
  age: number;
}

try {
  const data: string = fs.readFileSync(
    "/Users/DPU09/Documents/Projects/codingplayroom-js/people2.json",
    "utf8"
  );
  const people: Person[] = JSON.parse(data);
  console.log(people);
  console.log(people[0].name);
  console.log(typeof people[0]);
  console.log(Array.isArray(people));
} catch (err) {
  console.error("Error reading or parsing the file:", err);
}
