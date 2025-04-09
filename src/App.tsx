import React, { useEffect } from "react";

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
    <div style={{ padding: 20 }}>
      <h2>Loan application</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required />
        <br />
        <input type="number" name="amount" placeholder="Amount" required />
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default App;
