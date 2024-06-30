import supabase from "../../utils/supabase";

class UserActions {
  async insert(username: string, role: string) {
    const { error }: PostgrestResponse<User> = await supabase
      .from("users")
      .insert({ username: username, role: role });

    if (error) {
      console.log("Error inserting user");
      console.log(error);
      return;
    }
  }

  async get() {
    const { data }: PostgrestResponse<User> = await supabase
      .from("users")
      .select();

    if (!data) {
      console.log("No users found");
      console.log(data);
      return;
    }

    return data;
  }

  async remove(field: string, value: string) {
    const { error }: PostgrestResponse<User> = await supabase
      .from("users")
      .delete()
      .eq(field, value);

    if (error) {
      console.log("Error deleting user");
      console.log(error);
      return;
    }
  }

  async update(username: string, field: string, value: string) {
    //field value is a computed property name, or else field would be interpreted as a string
    const { error }: PostgrestResponse<User> = await supabase
      .from("users")
      .update({ [field]: value })
      .eq("id", 10);

    if (error) {
      console.log("Error updating user");
      console.log(error);
      return;
    }
  }
}

export default UserActions;
