import { MantineProvider, Text } from '@mantine/core';
import Router from './router';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router />
    </MantineProvider>
  );
}

export default App;
