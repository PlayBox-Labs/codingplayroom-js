import { AuthTokenResponsePassword, PostgrestResponse, PostgrestSingleResponse } from "@supabase/supabase-js";
import supabase from "./supabase";

interface Suppliers {
  "Supplier_name": string;
  "Contact_number": string;
  "Contact_email": string;
  "Supplier_description": string;
}

interface Recipes {
  name: string;
  ingredients: string;
  prep_steps: string;
  difficulty: string;
  // add_time: string;
}

interface Ingredients {
  ingredient: string;
  quantity: number;
  expiration_date: string;
  supplier: string;
}

class UserActions {

  // accessToken: string|undefined;

  async getJwt(email: string, password: string) {
    const { data: signInData, error: signInError } : AuthTokenResponsePassword = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (signInError) {
      console.error('Error signing in:', signInError);
      return;
    }

    const { user, session } = signInData;
    console.log('Signed in user:', user);
    console.log('Session:', session);

    if (!signInData || session?.access_token === undefined) {
      console.log("No users found");
      console.log(signInData);
      return;
    }
  
    return signInData;
  }


  async insert(recipes: Recipes) {
    const result: PostgrestSingleResponse<null> = await supabase
      .from("Recipes")
      .insert(recipes);

    if(result) {
      console.log("Error inserting user");
      console.log(result);
      // console.log(data);
    }
  }

  async get() {
    const { data: insertData, error: insertError } = await supabase
      .from("Suppliers")
      .select();

      if (insertError) {
        console.error('Error inserting data:', insertError);
      } else {
        console.log('Data inserted: successful:', insertData);
      }

    return insertData;
  }

  // async remove(field: string, value: string) {
  //   const {error}: PostgrestSingleResponse<null> = await supabase
  //     .from("users")
  //     .delete()
  //     .eq(field, value);

  //   if (error) {
  //     console.log("Error deleting user");
  //     console.log(error);
  //     return;
  //   }
  //   console.log('User deleted.');
  // }

  // async update(username: string, field: string, value: string) {
  //   //field value is a computed property name, or else field would be interpreted as a string
  //   const { error }: PostgrestSingleResponse<null> = await supabase
  //     .from("users")
  //     .update({ [field]: value })
  //     .eq('username', username);

  //   if (error) {
  //     console.log("Error updating user");
  //     console.log(error);
  //     return;
  //   }
  // }
}

export default UserActions;
