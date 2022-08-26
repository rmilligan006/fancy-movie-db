import { Container } from "@mui/system";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import MainNav from "./components/MainNav";
import Trending from "./Pages/Trending/Trending";
import Movies from "./Pages/Movies/Movies";
import Search from "./Pages/Search/Search";
import Series from "./Pages/Series/Series";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} exact>
              {" "}
            </Route>
            <Route path="/movies" element={<Movies />}>
              {" "}
            </Route>
            <Route path="/series" element={<Series />}>
              {" "}
            </Route>
            <Route path="/search" element={<Search />}>
              {" "}
            </Route>
          </Routes>
        </Container>
      </div>
      <MainNav />
    </BrowserRouter>
  );
}

export default App;
