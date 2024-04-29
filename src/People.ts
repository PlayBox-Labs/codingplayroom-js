class Person{
    name: string;
    age: number;


    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }
}

//this creates an anonymous object type
let personOnTheFly: {name: string, age: number} = {
    name: 'Dominic',
    age: 27
};

const person = new Person('Dominic', 27);
console.log(person.name)
console.log(personOnTheFly.name);