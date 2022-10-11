import "./App.css";
import Form from "./components/Form/Form";
import List from "./components/List/List";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container mx-auto text-center max-w-6xl">
          <h1 className="text-black text-5xl mb-10 py-8 w-full">
            Mood Based Expense Tracker
          </h1>
          <div className="grid">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
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
