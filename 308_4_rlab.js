// const csvString =
//   'ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor's Assistant,26';

const csvString =
  'ID,Name,Occupation,Age,IsCool\n42,Bruce,Knight,41,true\n57,Bob,Fry Cook,19,true\n63,Blaine,Quiz Master,58,false\n98,Bill,Doctor's Assistant,26,true';
// Instead of having four different variables, create an array!
//part 1
let cells = [];
let currentCell = 0;

//part 2a
let columns = 0;
let currentRow = 0;

//part 2
let table = [];

//Ex: helper function
function resetVars() {
  cells = [];
  currentCell = 0;
}

for (let i = 0; i < csvString.length; i++) {
  //checking for new cell
  if (csvString[i] === ',') {
    // Part 2a
    if (currentRow === 0) {
      columns++;
    }

    currentCell++;
    continue;
  }
  // checking for a new row
  if (csvString[i] === '\n') {
    resetVars();
    currentRow++;
    continue;
  }

  // Part 1 code
  if (cells[currentCell]) {
    cells[currentCell] += csvString[i];
  } else {
    cells[currentCell] = csvString[i];
  }

  //Part 2
  if (table[currentRow] === undefined) {
    table[currentRow] = [];
  }

  if (table[currentRow][currentCell]) {
    table[currentRow][currentCell] += csvString[i];
  } else {
    table[currentRow][currentCell] = csvString[i];
  }

  // Part 1
  // if (
  //   (currentCell === columns && csvString[i + 1] === '\n') ||
  //   i + 1 === csvString.length
  // ) {
  //   // console.log(cell1, cell2, cell3, cell4);
  //   console.log(cells.toString());
  // }
}

console.log(table);

// Part 2: Expand Functionality - Store results in a two-dimensional array
const columnCount = table[0].length; // Dynamically get column count from the header row
console.log("Column Count:", columnCount);

// Part 3: Transform Data - Convert to objects
const headers = table[0].map(header => header.toLowerCase());
const objectsArray = table.slice(1).map(row => {
  const obj = {};
  row.forEach((value, index) => {
    obj[headers[index]] = value;
  });
  return obj;
});

console.log("Array of Objects:", objectsArray);

// Part 4: Sorting and Manipulating Data
objectsArray.pop(); // Remove the last object
objectsArray.splice(1, 0, { id: "48", name: "Barry", occupation: "Runner", age: "25" }); // Insert new object
objectsArray.push({ id: "7", name: "Bilbo", occupation: "None", age: "111" }); // Add new object

// Calculate average age
const totalAge = objectsArray.reduce((sum, obj) => sum + parseInt(obj.age), 0);
const averageAge = totalAge / objectsArray.length;
console.log("Updated Array of Objects:", objectsArray);
console.log("Average Age:", averageAge.toFixed(2));

// Part 5: Convert back to CSV format
function objectsToCSV(objects) {
  const headers = Object.keys(objects[0]);
  const csvRows = [headers.join(',')];

  objects.forEach(obj => {
    const row= headers.map(header => obj[header] || '').join(',');
    csvRows.push(row);
  });

  return csvRows.join('\n');
}

const csvOutput = objectsToCSV(objectsArray);
console.log("CSV Format:");
console.log(csvOutput);;