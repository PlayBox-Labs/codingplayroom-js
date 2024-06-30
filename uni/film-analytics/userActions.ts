import { AuthTokenResponsePassword, PostgrestResponse, PostgrestSingleResponse } from "@supabase/supabase-js";
import supabase from "./supabase";

interface User {
  id: number;
  username: string;
}

interface UserReviews {
  rating: string;
  review: string;
}

class UserActions {

  // accessToken: string|undefined;

  async getJwt(email: string, password: string) {
    const { data }: AuthTokenResponsePassword = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (!data || data.session?.access_token === undefined) {
      console.log("No users found");
      console.log(data);
      return;
    }
  
    // this.accessToken = data.session?.access_token;

    return data;
  }


  async insert(user: User) {
    const { error }: PostgrestSingleResponse<null> = await supabase
      .from("users")
      .insert(user);

    if(error) {
      console.log("Error inserting user");
      console.log(error);
    }
  }

  async get() {
    const { data, error }: PostgrestResponse<UserReviews> = await supabase
      .from("user_reviews")
      .select();

    if (!data) {
      console.log("No user reviews found");
      console.log(error);
      return;
    }

    return data;
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
