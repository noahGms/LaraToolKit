import Router from './router';
import { SettingsProvider } from './contexts/settings';
import { ThemeProvider } from './contexts/theme';
import { Layout } from './components/layout';

function App() {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <Layout>
          <Router />
        </Layout>
      </ThemeProvider>
    </SettingsProvider>
  );
}

export default App;
