import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./features/boards/BoardDashboard";
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import Board from "./features/board/Board";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/board/:boardId" component={Board} />
      </Switch>
    </Router>
  );
}

export default App;
