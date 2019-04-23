import { Animated } from "react-native";
import styled from "styled-components";

const TabTouchable = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TabWrapper = styled(Animated.View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-horizontal: 10;
  padding-vertical: 10;
  border-radius: 30;
  background-color: ${({ isActive, activeBgColor }) =>
    isActive ? activeBgColor : "transparent"};
`;
// height: 45;

const Label = styled(Animated.Text)`
  margin-left: 5;
  font-size: 15;
  color: ${({ color }) => color};
`;

export { TabTouchable, TabWrapper, Label };
