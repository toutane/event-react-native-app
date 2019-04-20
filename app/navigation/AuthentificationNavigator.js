import { createStackNavigator, createAppContainer } from "react-navigation";

import SignInView from "../components/authentification/SignInView";
import SignUpView from "../components/authentification/SignUpView";

const AuthStack = createStackNavigator({
  SignIn: SignInView,
  SignUp: SignUpView
});

export default createAppContainer(AuthStack);
