import "./App.css";
import "./components/FormulaInput";
import FormulaInput from "./components/FormulaInput";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <FormulaInput />
      </div>
    </QueryClientProvider>
  );
}

export default App;
