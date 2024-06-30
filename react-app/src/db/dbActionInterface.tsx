import supabase from "../../utils/supabase";

class dbActionInterface {
  async insert(entity: string, ...args: any[]) {
    console.log(entity);
    console.log(args);

    // const { error }: PostgrestResponse<any> = await supabase
    //   .from("users")
    //   .insert({ username: username, role: role });

    // if (error) {
    //   console.log("Error inserting user");
    //   console.log(error);
    //   return;
    // }
  }

  async get(type: string) {
    const { data }: PostgrestResponse<any> = await supabase.from(type).select();

    if (!data) {
      console.log(`No ${type} found`);
      console.log(data);
      return;
    }
    console.log(data);
    return data;
  }

  async remove(...args: any[]) {
    // const { error }: PostgrestResponse<any> = await supabase
    //   .from("users")
    //   .delete()
    //   .eq(field, value);
    // if (error) {
    //   console.log("Error deleting user");
    //   console.log(error);
    //   return;
    // }
  }

  async update(...args: any[]) {
    // //field value is a computed property name, or else field would be interpreted as a string
    // const { error }: PostgrestResponse<any> = await supabase
    //   .from("users")
    //   .update({ [field]: value })
    //   .eq("id", 10);
    // if (error) {
    //   console.log("Error updating user");
    //   console.log(error);
    //   return;
    // }
  }
}

export default dbActionInterface;
