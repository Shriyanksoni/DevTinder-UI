import NavBar from "./NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/login" element={<div>Login Page</div>}></Route>
    </Routes>
    </BrowserRouter>
      <NavBar/>
      <h1 className="text-3xl font-bold underline">hello world</h1>
    </>
  );
}

export default App;
