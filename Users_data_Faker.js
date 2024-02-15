const { faker } = require('@faker-js/faker');
const Papa = require('papaparse');
const fs = require('fs');

function generateValidPassword() {
  const passwordOptions = {
    length: faker.number.int({ min: 8, max: 15 }), // Random length between 8 and 15
    uppercase: true,  // Include at least one uppercase letter
    numbers: true,    // Include at least one digit
    symbols: true,   // Include symbols
  };

  return faker.internet.password(passwordOptions);
}

function generateUserId() {
  // Generate a random 8-digit number
  const randomNumber = faker.number.int({ min: 10000000, max: 99999999 });
  return randomNumber.toString();
}

function createRandomUser() {
  const userId = generateUserId();
  const password = generateValidPassword();

  return {
   //userId: userId,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    //username: faker.internet.userName(),
    email: faker.internet.email(),
    password: password,
    repeatPwd: password,
    //birthdate: faker.date.past(),
    // avatar: faker.image.avatar(),
    // registeredAt: faker.date.past(),
  };
}

const USERS = Array.from({ length: 100 }, createRandomUser);

// Convert array of users to CSV format
const csv = Papa.unparse(USERS);

//console.log(csv);

// Save the CSV data to a file
fs.writeFileSync('users.csv', csv);

console.log('CSV data has been saved to users.csv');