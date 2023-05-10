import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { backend } from '../../wailsjs/go/models';
import Setting = backend.Setting;
import {
  CreateOrUpdateSetting,
  GetAllSettings,
} from '../../wailsjs/go/backend/Backend';

export type SettingsContextType = {
  settings: Setting[];
  loading: boolean;
  getAllSettings: (withLoading: boolean) => void;
  setSetting: (key: string, value: string) => void;
};

export const SettingsContext = createContext<SettingsContextType>(
  {} as SettingsContextType
);

interface Props {
  children: ReactNode;
}

export function SettingsProvider({ children }: Props) {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllSettings(true);
  }, []);

  function getAllSettings(withLoading: boolean = false) {
    setLoading(withLoading);

    GetAllSettings().then((settings) => {
      setSettings(settings);
      setLoading(false);
    });
  }

  function setSetting(key: string, value: string) {
    CreateOrUpdateSetting(key, value)
      .then((response) => {
        console.log('setSetting response: ', response);
        getAllSettings();
      })
      .catch((error) => {
        console.log('setSetting error: ', error);
      });
  }

  const memoizedValue = useMemo(
    () => ({
      settings,
      loading,
      getAllSettings,
      setSetting,
    }),
    [settings, loading]
  );

  return (
    <SettingsContext.Provider value={memoizedValue as SettingsContextType}>
      {children}
    </SettingsContext.Provider>
  );
}
