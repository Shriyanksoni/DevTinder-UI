import Body from "./Body";
import Login from "./Login";
import NavBar from "./NavBar";
import Profile from "./Profile"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/AppStore";
import Feed from "./Feed";
function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
      <Route path="/" element={<Feed/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/Profile" element={<Profile/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
