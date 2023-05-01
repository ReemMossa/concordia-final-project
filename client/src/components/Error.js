import styled from "styled-components";

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <h1>An unknown error has occurred.</h1>
      <Paragraph>
        Please try refreshing the page. If the error persists, please{" "}
        <a href="/contactus">contact us</a> and we will respond to your issue as
        soon as we are available.
      </Paragraph>
    </ErrorContainer>
  );
};

export default ErrorPage;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  margin: 0.5rem;
`;

const Paragraph = styled.p`
  margin: auto;
  width: 75%;
  font-size: 1.5rem;
`;
