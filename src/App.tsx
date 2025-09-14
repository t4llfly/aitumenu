import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "@/pages/MainPage.tsx";
import Starter from "@/pages/Starter.tsx";
import Salads from "@/pages/Salads.tsx";
import Second from "@/pages/Second.tsx";
import Side from "@/pages/Side.tsx";
import Drinks from "@/pages/Drinks.tsx";
import Complex from "@/pages/Complex.tsx";
import {CartProvider} from "@/context/CartProvider.tsx";
import ShoppingCart from "@/components/ShoppingCart.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";

function App() {
  return (
      <ThemeProvider>
          <CartProvider>
              <Router>
                  <div>
                      <Routes>
                          <Route path="/" Component={MainPage}/>
                          <Route path="/salads" Component={Salads} />
                          <Route path="/starter" Component={Starter}/>
                          <Route path="/second" Component={Second}/>
                          <Route path="/side" Component={Side}/>
                          <Route path="/drinks" Component={Drinks}/>
                          <Route path="/complex" Component={Complex}/>
                      </Routes>
                      <ShoppingCart/>
                  </div>
              </Router>
          </CartProvider>
      </ThemeProvider>


  )
}

export default App
