import axios, { AxiosResponse } from "axios";

//async returns a promise, without then() on the get-  it might return a promise(pending) because it will not have bene resolved yet
async function axiosGet(url: string): Promise<any> {

    try{
        const response: AxiosResponse = await axios.get(url);
        return response.data;
    } catch (error){
        console.log('error:', error);
    }
}

//async function immediately returns a promise when called
//because the Promise returned from async function might not have resolved yet, 
//due to the the await axios.get() not finishing yet.
//the then() is a call back function that is called when the promise is resolved
axiosGet('http://localhost:8080/test').then(data => console.log(data));

// async function axiosGet() : Promise<any>{

//     let response: AxiosResponse = await axios.get('localhost:8080/test');
//     return response.data;

// }
