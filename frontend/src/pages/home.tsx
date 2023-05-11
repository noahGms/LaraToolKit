import { useEffect, useState } from 'react';
import { GetAllProjects } from '../../wailsjs/go/backend/Backend';
import { PageLoader } from '../components/page-loader';
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Text,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { ProjectForm } from '../components/projects/project-form';
import { Project } from '../types';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState<boolean>(true);
  const [projectFormOpened, setProjectFormOpened] = useState<boolean>(false);

  const openProjectForm = () => {
    setProjectFormOpened(true);
  };

  const closeProjectForm = () => {
    setProjectFormOpened(false);
  };

  function getProjects() {
    setProjectsLoading(true);

    GetAllProjects().then((projects) => {
      setProjects(projects);
      setProjectsLoading(false);
    });
  }

  useEffect(() => {
    getProjects();
  }, []);

  if (projectsLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <Container>
        <Flex miw={'100%'} justify={'space-between'}>
          <div>
            <Text size={'xl'}>Projects</Text>
          </div>
          <div>
            <Button onClick={openProjectForm}>Add new project</Button>
          </div>
        </Flex>
        <Box mt={20}>
          {!projects.length ? (
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="No project found"
            >
              You {"don't"} have any project yet. Click on the button above to
              create one.
            </Alert>
          ) : (
            <>
              <Grid>
                {projects.map((project: Project) => (
                  <Grid.Col sm={12} md={6} lg={4} key={project.id}>
                    <Card h={'100%'} shadow="sm" p="lg" radius="md" withBorder>
                      <Text size="md" color="dimmed">
                        <Text>{project.name}</Text>
                      </Text>

                      <Text size="sm">
                        <Text>{project.path}</Text>
                      </Text>

                      <Button variant="light" color="blue" mt="md">
                        Open
                      </Button>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </>
          )}
        </Box>
      </Container>

      <ProjectForm
        opened={projectFormOpened}
        onClose={closeProjectForm}
        refresh={getProjects}
      />
    </div>
  );
}
