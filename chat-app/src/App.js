// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ThemeSettings from "./components/settings";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <ThemeSettings>
          {" "}
          <Router />{" "}
        </ThemeSettings>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
