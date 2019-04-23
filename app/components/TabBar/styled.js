import { StyleSheet } from 'react-native';

import styled from 'styled-components';

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-horizontal: 5;
  padding-top: 15;
  padding-bottom: 30;
  border-top-width: ${StyleSheet.hairlineWidth};
  border-top-color: ${({ theme }) => theme.colors.border};
`;

export { Wrapper };
