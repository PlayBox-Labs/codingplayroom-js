import { useEffect, useState } from "react";
// import UserActions from "./db/userActions";
import UserActions from "./db/userActions2";

interface User {
  id: number;
  username: string;
  role: string;
  created_at: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const userActions: UserActions = new UserActions();

  const fetchUsers = async () => {
    const users: User[] | undefined = await userActions.getUsers();

    if (!users) {
      console.log("No users found");
      return;
    }

    setUsers(users);
  };

  useEffect(() => {
    // userActions.insertUser('dom_user', 'king', 'sdas');
    userActions.getUsers();
    // deleteUser('username', 'dominic_user');
    // updateUser("dom_user", "role", "legit");

    fetchUsers();
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.username}>
          {user.id}, {user.username}, {user.role}, {user.created_at}
        </li>
      ))}
    </ul>
  );
}

export default App;
