import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lviopmklljfechxxampy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2aW9wbWtsbGpmZWNoeHhhbXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzNTUwODMsImV4cCI6MjAzNDkzMTA4M30.GTm5Ef3j975qiVBtHpwc0fmb41ogySUwvRk9N01zbJg';
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

    static getBook = async (tableType, bookName) => {      
      const { data: getData, error: getError } = await supabase
        .from(tableType)
        .select('title, id')
        .eq('title', bookName);

        console.log(getData);
      
      if (getError) {
        console.error('Error retrieving data:', getError);
        return;
      } 
      return getData;
      };      
      
      static getTotalRatings = async (tableType, bookId) => {      
        const { data: getData, error: getError } = await supabase
          .from(tableType)
          .select('rating')
          .eq('bookId', bookId);
  
          console.log(getData);
        
        if (getError) {
          console.error('Error retrieving data:', getError);
          return;
        } 

        console.log("here are the ratings: " , getData);

        const totalRating = getData.reduce((sum, rating) => sum + rating.rating, 0);
        return totalRating;
        };        
        
      static getComments = async (tableType, bookId) => {      
        const { data: getData, error: getError } = await supabase
          .from(tableType)
          .select('commentText')
          .eq('bookId', bookId);
  
          console.log(getData);
        
        if (getError) {
          console.error('Error retrieving data:', getError);
          return;
        } 
        return getData;
        };              

      // static get = async (tableType) => {      
      //   const { data: getData, error: getError } = await supabase
      //     .from(tableType)
      //     .select();
        
      //   if (getError) {
      //     console.error('Error inserting data:', getError);
      //     return;
      //   } 
      //   return getData;
      //   };          
      
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