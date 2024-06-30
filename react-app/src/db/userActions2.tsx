import dbActionInterface from "./dbActionInterface";

class UserActions2 extends dbActionInterface {
  async insertUser(entity:string, username: string, role: string) {
    await super.insert('user', "Domininc", "king");
  }

  async getUsers() {
    const data = await super.get("users");
    return data;
  }

  async removeUser(username: string, value: string) {
    await super.remove(username, value);
  }

  async updateUser(username: string, field: string, value: string) {
    //field value is a computed property name, or else field would be interpreted as a string
    await super.update(username, field, value);
  }
}

export default UserActions2;
