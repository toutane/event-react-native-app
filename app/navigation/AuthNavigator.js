import { createStackNavigator, createAppContainer } from "react-navigation";

import SignIn from "../authentification/SignIn";
import SignUp from "../authentification/SignUp";

const AuthStack = createStackNavigator(
  {
    SignIn: SignIn,
    SignUp: SignUp
  },
  {
    initialRouteName: "SignIn"
  }
);

export default createAppContainer(AuthStack);
