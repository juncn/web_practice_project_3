import { FunctionComponent } from 'react';
import styled from 'styled-components';

const User: FunctionComponent = () => {
  return (
    <Wrapper>User component</Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  /* align-items: start; */
`;

export default User;