import Router from './router';
import { SettingsProvider } from './contexts/settings';
import { ThemeProvider } from './contexts/theme';
import { Notifications } from '@mantine/notifications';
import { Layout } from './components/layout';

function App() {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <Layout>
          <Notifications />
          <Router />
        </Layout>
      </ThemeProvider>
    </SettingsProvider>
  );
}

export default App;
