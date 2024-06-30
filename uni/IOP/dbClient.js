import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const supabaseUrl = 'https://fzgofmsfaukfmtrjrazi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6Z29mbXNmYXVrZm10cmpyYXppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3NDU4ODIsImV4cCI6MjAzMDMyMTg4Mn0.x5fvj1RdLDYS5vDF9ZVBrZqVyGSu-L1rB1DMYCyobBA';
const supabase = createClient(supabaseUrl, supabaseKey);

class dbClient{

  static loginData = null;

    static signIn = async (email, password) => {
        this.loginData = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        });

        const { data: signInData, error: signInError } = this.loginData;
        const { user } = signInData;
      
        if (signInError) {
          console.error('Error signing in:', signInError);
          return false;
        }
        console.log('Successful log in for:', user.email);
        return true;
      };    

    static get = async (tableType) => {      
      const { data: getData, error: getError } = await supabase
        .from(tableType)
        .select();
      
      if (getError) {
        console.error('Error inserting data:', getError);
        return;
      } 
      return getData;
      };       
      
    static insert = async (tableType, data) => {  
      
      console.log("I am inserting data: ", JSON.parse(data));
      console.log("I am inserting into table: ", tableType);
      const { data: getData, error: getError, ...rest} = await supabase
        .from(tableType)
        .insert(JSON.parse(data));
      
      if (getError) {
        console.error('Error inserting data:', getError);
        console.log('Here is my input: ', data);
        return;
      } 

      console.log(`Successfully inserted data into ${tableType}`);
      console.log(getData);
      console.log(rest);
      // console.log(returnType);
      };     
      
    static update = async(tableType, data) => {
      console.log("I am inserting data: ", JSON.parse(data));
      console.log("I am inserting into table: ", tableType);
      const {data:getData, error:getError} = await supabase
        .from(tableType)
        .update(JSON.parse(data))
        .match({ id: `${JSON.parse(data).id}` });
      
      if (getError) {
        console.log('Error updating data:', getError);
        console.log('Here is my input: ', data);
        return `Error updating data: ${getError}`;
      } 
      console.log(`Successfully updated data into ${tableType}`);
      return `Successfully updated data into ${tableType}`;
    }
}

export default dbClient;