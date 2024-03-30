import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QuizProvider } from "./contexts/QuizContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QuizProvider>
    <App />
  </QuizProvider>
);
