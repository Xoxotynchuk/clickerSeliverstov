import { BrowserRouter, Route, Routes } from "react-router-dom";

import Clicker from "./screens/clicker";
import ClickerTasks from "./screens/clickerTasks";
import ClickerFriends from "./screens/clickerFriends";
import ClickerAccount from "./screens/clickerAccount";

const Container = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Clicker />} />
          <Route path="/tasks" element={<ClickerTasks />} />
          <Route path="/friends" element={<ClickerFriends />} />
          <Route path="/account" element={<ClickerAccount />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Container;
