import UserActions from "./userActions";
import AdminActions from "./adminActions";

class Runner {
  run() {
    const adminActions: AdminActions = new AdminActions();
    const userActions: UserActions = new UserActions();

    // adminActions.signUpUser('dom_pau@live.co.uk', 'password').then((data) => console.log(data));

    userActions.getJwt("dchp2@outlook.com", "password").then((data) => {
    //   userActions.get().then((data) => console.log(data));
    //   userActions.insert("David", "footballer");
        // userActions.remove('username', 'Ferenkeh');
        // userActions.update('dom_user', 'role', 'king');

        console.log(data);
        // userActions.insert({name: 'spaghetti bolognese', ingredients: 'asdasd', prep_steps: '1. Cut 2. Cook 3. Serve', difficulty: 'easy', add_time: '2021-09-01T00:00:00.000Z'});
        // userActions.get().then((data) => console.log(data));
        // console.log(data)
    });
  }
}

const runner: Runner = new Runner();
runner.run();
