import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import useSettings from '../hooks/useSettings';

export type ThemeContextType = {
  colorScheme: ColorScheme;
};

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

export const defaultTheme = 'light';

interface Props {
  children: ReactNode;
}

export function ThemeProvider({ children }: Props) {
  const { settings, setSetting, loading: settingsLoading } = useSettings();

  const [colorScheme, setColorScheme] = useState<ColorScheme>(defaultTheme);

  useEffect(() => {
    if (!settingsLoading) {
      const settingsColorMode = settings.find((s) => s.key === 'colorMode');

      if (!settingsColorMode) {
        setSetting('colorMode', colorScheme);
      } else {
        toggleColorScheme(settingsColorMode.value as ColorScheme);
      }
    }
  }, [settingsLoading]);

  function toggleColorScheme(value?: ColorScheme) {
    value = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(value as ColorScheme);
    setSetting('colorMode', value);
  }

  const memoizedValue = useMemo(
    () => ({
      colorScheme,
    }),
    [colorScheme]
  );

  return (
    <ThemeContext.Provider value={memoizedValue as ThemeContextType}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
          }}
        >
          {children}
        </MantineProvider>
      </ColorSchemeProvider>
    </ThemeContext.Provider>
  );
}
