import { useContext } from 'react';
import { SettingsContext, SettingsContextType } from '../contexts/settings';

export default function useSettings(): SettingsContextType {
  return useContext(SettingsContext);
}
