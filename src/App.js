import AddNewUser from "./components/AddNewUser";
import DashBoard from "./components/DashBoard";
import EditUser from "./components/EditUser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App container mx-auto pt-16 w-11/12">
      <Router>
        <header>
          <h1 className="font-bold text-4xl">Dashboard</h1>
        </header>
        <Routes>
          <Route path="/" exact element={<DashBoard />} />
          <Route path="/AddNewUser" element={<AddNewUser />} />
          <Route path="/EditUser/:id" element={<EditUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
