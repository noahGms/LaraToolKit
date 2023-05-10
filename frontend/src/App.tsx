import Router from './router';
import { SettingsProvider } from './contexts/settings';
import { ThemeProvider } from './contexts/theme';

function App() {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </SettingsProvider>
  );
}

export default App;
