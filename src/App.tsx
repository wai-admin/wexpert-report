import { BrowserRouter } from "react-router-dom";
import GlobalRoutes from "@/routes/GlobalRoutes";
import GlobalProvider from "@/provider/GlobalProvider";

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <GlobalRoutes />
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
