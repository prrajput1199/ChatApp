// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ThemeSettings from "./components/settings";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ChatContextProvider } from "./contexts/ChatContext";

function App() {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <ThemeProvider>
          <ThemeSettings>
            {" "}
            <Router />{" "}
          </ThemeSettings>
        </ThemeProvider>
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

export default App;
