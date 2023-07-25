import {
    Container,
    Text,
    ActionIcon,
    Group,
    Flex,
    Divider,
    Navbar,
    TextInput,
    Alert,
    NavLink,
    Tooltip,
} from "@mantine/core"
import { IconAlertCircle, IconArrowLeft, IconEdit, IconRefresh, IconTrash } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { GetProject, GetProjectCommands, SyncProjectCommands } from "../../wailsjs/go/backend/Backend"
import { PageLoader } from "../components/page-loader"
import { CommandDetails } from "../components/projects/command-details"
import { showNotification } from "@mantine/notifications";
import {useNavigate, useParams} from "react-router-dom";
import {Command, Commands, Project} from "../types";

const ProjectDetails = () => {
    const params = useParams()
    const navigate = useNavigate()
    const { id } = params
    const [projectLoading, setProjectLoading] = useState<boolean>(true)
    const [project, setProject] = useState<Project | null>(null)
    const [commandsLoading, setCommandsLoading] = useState<boolean>(true)
    const [commands, setCommands] = useState<Commands | null>(null)
    const [commandSelected, setCommandSelected] = useState<Command | null>(null)

    const [filteredCommands, setFilteredCommands] = useState<Command[] | null>(null)
    const [search, setSearch] = useState<string>("")

    const syncCommands = () => {
        SyncProjectCommands(Number(id as string))
          .then((response) => {
              showNotification({
                  title: 'Success',
                  message: response,
                  color: 'green',
              })
              getCommands()
          })
          .catch((error) => {
              showNotification({
                  title: 'Error',
                  message: error,
                  color: 'red',
              })
          })
    }

    const getProject = () => {
        if (typeof id === "string") {
            setProjectLoading(true)

            GetProject(parseInt(id))
              .then((response: Project) => {
                  setProject(response)
              })
              .catch((error: any) => {
                  navigate(-1)

                  showNotification({
                      title: 'Error',
                      message: error,
                      color: 'red',
                  })
              })
              .finally(() => {
                  setProjectLoading(false)
              })
        }
    }

    const getCommands = () => {
        setCommandsLoading(true)

        GetProjectCommands(Number(id as string))
          .then((response) => {
              setCommands(response)
              setFilteredCommands(response.commands)
          })
          .catch((error) => {
              showNotification({
                  title: 'Error',
                  message: error,
                  color: 'red',
              })
          })
          .finally(() => {
              setCommandsLoading(false)
          })
    }

    const searchCommand = (event: any) => {
        setSearch(event.target.value)

        if (event.target.value === "") {
            setFilteredCommands(commands?.commands ?? null)
        }

        if (commands) {
            const filtered = commands.commands.filter((command) => {
                return command.name.toLowerCase().includes(event.target.value.toLowerCase())
            })

            setFilteredCommands(filtered)
        }
    }

    useEffect(() => {
        getProject()
        getCommands()
    }, [])

    if (projectLoading || commandsLoading) {
        return <PageLoader />
    }

    return (
      <div>
          <Container fluid>
              <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                  <Group position={"apart"}>
                      <Flex>
                          <ActionIcon onClick={() => navigate(-1)}>
                              <IconArrowLeft size={20} />
                          </ActionIcon>
                          <Text ml={10} size={"xl"}>
                              {project?.name}
                          </Text>
                      </Flex>
                      <Flex>
                          <Tooltip label={"Sync commands"} position={"bottom"}>
                              <ActionIcon onClick={syncCommands} size={"sm"}>
                                  <IconRefresh />
                              </ActionIcon>
                          </Tooltip>
                          <Divider ml={10} mr={10} size="sm" orientation="vertical" />
                          <Tooltip label={"Edit project"} position={"bottom"}>
                              <ActionIcon size={"sm"}>
                                  <IconEdit />
                              </ActionIcon>
                          </Tooltip>
                          <Tooltip label={"Delete project"} position={"bottom"}>
                              <ActionIcon size={"sm"} color={"red"}>
                                  <IconTrash />
                              </ActionIcon>
                          </Tooltip>
                      </Flex>
                  </Group>

                  <Divider mt={10} mb={10} size={"sm"} />

                  <TextInput
                    placeholder="Search command"
                    mb={10}
                    value={search}
                    onChange={searchCommand}
                  />

                  {!commands ? (
                    <Alert icon={<IconAlertCircle size={16} />} title="No commands found!">
                        Sync project to see commands
                    </Alert>
                  ) : (
                    <div style={{ overflowX: "auto" }}>
                        {filteredCommands?.length === 0 && (
                          <Alert icon={<IconAlertCircle size={16} />} title="No commands found!">
                              Try to change search query
                          </Alert>
                        )}

                        {filteredCommands?.map((command, index) => (
                          <NavLink
                            key={index}
                            label={command.name}
                            onClick={() => { setCommandSelected(null); setCommandSelected(command) }}
                            active={commandSelected === command}
                          />
                        ))}
                    </div>
                  )}
              </Navbar>

              {!commandSelected || !project ? (
                <Alert>
                    Select a command to see details
                </Alert>
              ) : (
                <>
                    <CommandDetails
                      command={commandSelected}
                      project={project}
                    />
                </>
              )}
          </Container>
      </div>
    )
}

export default ProjectDetails