import "./App.css";
import Charts from "./components/Charts/Charts";
import Form from "./components/Form/Form";
import List from "./components/List/List";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const location = window.location.pathname;
  console.log("location", location);
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container mx-auto text-center max-w-6xl">
          <h1 className="text-4xl text-white mb-10 py-8 bg-black">
            Mood Based Expense Tracker
          </h1>
          <div className="grid">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Form />} />
              <Route path="/history" element={<List />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
