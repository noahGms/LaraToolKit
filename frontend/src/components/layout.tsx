import {
  ActionIcon,
  AppShell,
  Flex,
  Header,
  useMantineColorScheme,
  useMantineTheme,
  Text,
} from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { ReactNode, useState } from 'react';
import { SettingsDrawer } from './settings-drawer';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [settingsDrawerOpened, setSettingsDrawerOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background:
            colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      header={
        <Header height={{ base: 70 }} p="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <Flex miw={'100%'} justify={'space-between'}>
              <div>
                <Text size={'xl'} fw={'bold'}>
                  LaraToolKit
                </Text>
              </div>
              <div>
                <ActionIcon onClick={() => setSettingsDrawerOpened(true)}>
                  <IconSettings />
                </ActionIcon>
              </div>
            </Flex>
          </div>
        </Header>
      }
    >
      <SettingsDrawer
        opened={settingsDrawerOpened}
        onClose={() => setSettingsDrawerOpened(false)}
      />

      <div style={{ height: '100vh', overflowX: 'scroll' }}>{children}</div>
    </AppShell>
  );
};
