import {
  Drawer,
  SegmentedControl,
  Center,
  Text,
  useMantineColorScheme,
  ColorScheme,
} from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export type Props = {
  opened: boolean;
  onClose: () => void;
};

export const SettingsDrawer = ({ opened, onClose }: Props) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const handleThemeChange = (value: string) => {
    toggleColorScheme(value as ColorScheme);
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={
        <Text size={'md'} fw={'bold'}>
          Settings
        </Text>
      }
      padding="xl"
      size="xl"
    >
      <div>
        <SegmentedControl
          w={'100%'}
          value={colorScheme}
          onChange={handleThemeChange}
          data={[
            {
              value: 'light',
              label: (
                <Center>
                  <IconSun />
                </Center>
              ),
            },
            {
              value: 'dark',
              label: (
                <Center>
                  <IconMoon />
                </Center>
              ),
            },
          ]}
        />
      </div>
    </Drawer>
  );
};
