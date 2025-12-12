import { BrowserRouter } from "react-router-dom";
import GlobalRoutes from "@/routes/GlobalRoutes";
import { BridgeProvider, QueryProvider } from "@/provider";
import { StatusBoundary } from "@/components";

function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <BridgeProvider>
          <StatusBoundary>
            <GlobalRoutes />
          </StatusBoundary>
        </BridgeProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}

export default App;
