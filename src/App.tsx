import { BrowserRouter } from "react-router-dom";
import GlobalRoutes from "@/routes/GlobalRoutes";
import { GlobalProvider, QueryProvider } from "@/provider";

function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <GlobalProvider>
          <GlobalRoutes />
        </GlobalProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}

export default App;
