import { HashRouter, Route, Routes } from "react-router-dom";

import Clicker from "./screens/clicker";
import ClickerTasks from "./screens/clickerTasks";
import ClickerFriends from "./screens/clickerFriends";
import ClickerAccount from "./screens/clickerAccount";

const Container = () => {

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Clicker />} />
          <Route path="/tasks" element={<ClickerTasks />} />
          <Route path="/friends" element={<ClickerFriends />} />
          <Route path="/account" element={<ClickerAccount />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default Container;
