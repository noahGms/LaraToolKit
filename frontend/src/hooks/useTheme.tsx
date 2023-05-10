import { useContext } from 'react';
import { ThemeContextType, ThemeContext } from '../contexts/theme';

export default function useTheme(): ThemeContextType {
  return useContext(ThemeContext);
}
