import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import {
  CreateOrUpdateSetting,
  GetAllSettings,
} from '../../wailsjs/go/backend/Backend';
import { PageLoader } from '../components/page-loader';
import { Setting } from '../types';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../utils/notifications';

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
        showSuccessNotification(response);
        getAllSettings();
      })
      .catch((error) => {
        showErrorNotification(error);
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
      {loading ? <PageLoader /> : children}
    </SettingsContext.Provider>
  );
}
