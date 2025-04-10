import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: ${props => props.theme.mode === 'dark' ? '#333' : '#fff'};
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: ${props => props.theme.mode === 'dark' ? '#fff' : '#333'};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid ${props => props.theme.mode === 'dark' ? '#555' : '#ddd'};
  border-radius: 6px;
  font-size: 16px;
  background: ${props => props.theme.mode === 'dark' ? '#444' : '#fff'};
  color: ${props => props.theme.mode === 'dark' ? '#fff' : '#333'};

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const Button = styled.button`
  padding: 12px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #357abd;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const App: React.FC = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const theme = params.get("theme") || "light";
    document.body.className = theme;
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const amount = formData.get("amount");

    window.parent.postMessage(
      {
        event: "loanSubmitted",
        data: { name, amount },
      },
      "*"
    );
  };

  return (
    <Container>
      <Title>Loan Application</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="text" name="name" placeholder="Name" required />
        <Input type="number" name="amount" placeholder="Amount" required />
        <Button type="submit">Submit Application</Button>
      </Form>
    </Container>
  );
};

export default App;