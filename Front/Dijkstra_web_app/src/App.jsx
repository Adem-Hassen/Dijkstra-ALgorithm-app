
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/navbar";  
import Home from "./views/home";
import Visualizer from "./views/visualizer";
import Signin from "./views/sign_in";
import Register from './views/register';
import Footer from "./components/footer";

function App() {
  return (
    <>
    
    <div style={{backgroundColor:'#f4f4f4'}}> 
    
    <NavbarComponent></NavbarComponent>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/visualizer" element={<Visualizer/>} />
      <Route exact path="/sign_in" element={<Signin/>} />
      <Route exact path="/register" element={<Register/>}></Route>
    </Routes>
    </BrowserRouter>
    
    <Footer></Footer>
    </div>
   
   </>       
  )
}

export default App