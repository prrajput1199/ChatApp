// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ThemeSettings from "./components/settings";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ChatContextProvider } from "./contexts/ChatContext";
import { ChatAllContextProvider } from "./contexts/ChatAllcontext";

function App() {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <ChatAllContextProvider>
          <ThemeProvider>
            <ThemeSettings>
              {" "}
              <Router />{" "}
            </ThemeSettings>
          </ThemeProvider>
        </ChatAllContextProvider>
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

export default App;
