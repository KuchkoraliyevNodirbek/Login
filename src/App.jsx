import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import { Layout } from "./layout/layout";
import { Catgory } from "./pages/catgory";
import { Product } from "./pages/product";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Catgory />} />
          <Route path="product" element={<Product />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
