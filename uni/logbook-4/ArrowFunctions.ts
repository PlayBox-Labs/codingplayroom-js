const add = (a:number, b:number):number => a + b;

console.log(add(1,2));

const combineArray = (arr1: number[], arr2: number[]):number[] => [...arr1, ...arr2];

console.log(combineArray([1,2,3], [4,5,6]));




interface Trees {
    tree: Tree[];
}

interface Tree {
    name: string;
    age: number;
}

const addTree = (...tree:Tree[]): Trees => {
    return {tree: [...tree]};
}

console.log(addTree({name: 'Oak', age: 100}, {name: 'Pine', age: 50}));