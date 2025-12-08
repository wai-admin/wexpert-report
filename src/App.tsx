import { BrowserRouter } from "react-router-dom";
import GlobalRoutes from "@/routes/GlobalRoutes";
import { BridgeProvider, QueryProvider } from "@/provider";

function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <BridgeProvider>
          <GlobalRoutes />
        </BridgeProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}

export default App;
