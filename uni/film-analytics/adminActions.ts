import { PostgrestResponse } from "@supabase/supabase-js";
import supabase from "./supabase";

class AdminActions {
  async signUpUser(email: string, password: string) {
    try{
        const {data, error} = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            console.log("Error signing up user");
            console.log(error);
    
        }

        return data;

    } catch (error) {
        console.log("Unexpected error");
        return;
    }
  }
}

export default AdminActions;
