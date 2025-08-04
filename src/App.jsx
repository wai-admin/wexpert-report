import { BrowserRouter } from "react-router-dom";
import GlobalRoutes from "@/routes/GlobalRoutes";

function App() {
  return (
    <BrowserRouter>
      <GlobalRoutes />
    </BrowserRouter>
  );
}

export default App;
