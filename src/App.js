import Home from "./screens/Home";
import { Route, Switch } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./screens/MyOrder";

function App() {
  return (
    <div >
      {/* <h1>Hare Krishna</h1> */}
      <CartProvider>
        <Switch>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route path='/createuser'>
            <Signup></Signup>
          </Route>
          <Route path='/myOrder'>
            <MyOrder/>
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </CartProvider>
    </div>
  );
}

export default App;
