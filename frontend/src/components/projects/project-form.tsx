import { useEffect, useState } from 'react';
import { backend } from '../../../wailsjs/go/models';
import CreateAndUpdateProject = backend.CreateAndUpdateProject;
import Project = backend.Project;
import {
  TextInput,
  Box,
  Button,
  ActionIcon,
  Tooltip,
  Drawer,
  Flex,
  Alert,
} from '@mantine/core';
import { IconAlertCircle, IconFolder } from '@tabler/icons-react';
import {
  CreateProject,
  OpenFolderDialog,
  UpdateProject,
} from '../../../wailsjs/go/backend/Backend';
import { useForm } from '@mantine/form';

interface Props {
  opened: boolean;
  project?: Project;
  onClose: () => void;
  refresh: () => void;
}

const projectInitialState: CreateAndUpdateProject = {
  name: '',
  path: '',
};

export const ProjectForm = ({ opened, project, onClose, refresh }: Props) => {
  const form = useForm<CreateAndUpdateProject>({
    initialValues: { ...projectInitialState },

    validate: {
      name: (value) => (value.trim().length > 0 ? null : 'Name is required'),
      path: (value) => (value.trim().length > 0 ? null : 'Path is required'),
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      form.setValues(project);
    }
  }, [project]);

  const close = () => {
    setError(null);
    form.reset();
    onClose();
  };

  const handleSubmit = (values: CreateAndUpdateProject) => {
    setError(null);
    setLoading(true);

    if (project) {
      UpdateProject(project.id, values)
        .then((response) => {
          close();
          refresh();
        })
        .catch((error: any) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      CreateProject(values)
        .then((response) => {
          close();
          refresh();
        })
        .catch((error: any) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const openFolderDialog = () => {
    setError(null);
    OpenFolderDialog()
      .then((path: string) => {
        form.setFieldValue('path', path);
      })
      .catch((error: any) => {
        setError(error);
      });
  };

  const title = project ? 'Edit project' : 'Add new project';

  return (
    <>
      <Drawer
        position={'right'}
        opened={opened}
        onClose={close}
        padding="xl"
        size={'md'}
        title={title}
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          {error && (
            <Alert
              title={error}
              color="red"
              icon={<IconAlertCircle size={24} />}
              mb={20}
              children={undefined}
            />
          )}

          <Box mt={20}>
            <TextInput
              placeholder="Project name"
              label="Name"
              required
              {...form.getInputProps('name')}
            />
          </Box>

          <Box mt={20}>
            <TextInput
              rightSection={
                <Tooltip label={'Open folder dialog'} position={'bottom'}>
                  <ActionIcon onClick={openFolderDialog}>
                    <IconFolder size={24} />
                  </ActionIcon>
                </Tooltip>
              }
              placeholder="/path/to/project"
              label="Path"
              required
              {...form.getInputProps('path')}
            />
          </Box>

          <Flex justify={'end'} mt={20}>
            <Button
              disabled={!form.isValid()}
              loading={loading}
              color="blue"
              type="submit"
            >
              Save
            </Button>
          </Flex>
        </form>
      </Drawer>
    </>
  );
};
