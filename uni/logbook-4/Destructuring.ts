//Destructuring 1

// const user = {
//     userName: 'Bob',
//     ageOfUser: 27,
//     occupation: 'Software Engineer'
// }
    
// const { userName, ageOfUser, occupation} = user;


//Destructuring 2 - Adding remaining values to a new object. This is useful when you want to extract some values from an object and store the rest in a new object.

// const car = {
//     nameOfCar: 'Nio',
//     state: 'new',
//     ageOfCar: 2
// }
    
// const { nameOfCar, ...values} = car;

// console.log(nameOfCar);
// console.log(values)

//Destructuring 3 - Assigning default values, this does not work against a variable of a user object in JS.

// const person1 = {
//     names: 'Bob',
//     age: 27
// }

// const { names = 'Anonymous', age = 0 } = { names: 'Bob' };

// console.log(age);

//Destructuring 4

interface Persona {
    nameOfPerson?: string;
    age?: number;
}

function printPersona({nameOfPerson = 'Anon', age=0}:Persona) : void {

    console.log(`Hello my name is ${nameOfPerson} and I am ${age} years old`);
}

printPersona({nameOfPerson:'Dom'});

// const{ nameOfPerson = 'Anon', age = 0} = {nameOfPerson:'Bob', age:27};
