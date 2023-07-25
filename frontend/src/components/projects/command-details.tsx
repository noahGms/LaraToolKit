import {
  Code,
  Text,
  Box,
  Title,
  Button,
  TextInput,
  SimpleGrid,
  Checkbox,
  Flex,
  Tooltip,
  Alert,
  Grid, Container
} from "@mantine/core"
import { getOptionsWithoutCommon } from "../../lib/commands"
import { useState } from "react"
import { Prism } from "@mantine/prism"
import { IconAlertCircle } from "@tabler/icons-react"
import { RunProjectCommands } from "../../../wailsjs/go/backend/Backend"
import { showNotification } from "@mantine/notifications"
import {Command, Project} from "../../types";

export type Props = {
  command: Command
  project: Project
}

export const CommandDetails = ({ command, project }: Props) => {
  // @ts-ignore
  const commandOptions = getOptionsWithoutCommon(Object.values(command.definition.options))
    .sort((a: any) => !a.accept_value)
  const commandArguments = Object.values(command.definition.arguments)

  // generate default data from command options and arguments (needs for fix input uncontrolled value)
  const defaultOptionsData: any = {}
  commandOptions.forEach((option: any) => {
    if (option.accept_value) {
      defaultOptionsData[option.name] = ''
    }
  })

  const defaultArgumentsData: any = {}
  commandArguments.forEach((argument: any) => {
    defaultArgumentsData[argument.name] = ''
  })

  const [optionsData, setOptionsData] = useState<any>(defaultOptionsData)
  const [argumentsData, setArgumentsData] = useState<any>(defaultArgumentsData)
  const [runCommandLoading, setRunCommandLoading] = useState<boolean>(false)

  const [result, setResult] = useState<string>('')

  const getCommandPreview = () => {
    let name = command.name
    const optionsArr = Object.entries(optionsData)
    const argumentsArr = Object.entries(argumentsData)

    argumentsArr.forEach((argument: any) => {
      name += ` ${argument[1]}`
    })

    optionsArr.forEach(data => {
      const [key, value] = data

      if (value) {
        name += ` ${key}`
        if (value !== true) {
          name += `=${value}`
        }
      }
    })

    return name
  }

  const runCommand = () => {
    setRunCommandLoading(true)

    RunProjectCommands(project.id, command.name, argumentsData, optionsData)
      .then(response => {
        setResult(response)
      })
      .catch(error => {
        showNotification({
          title: 'Error',
          message: error,
          color: 'red',
        })

        setResult(error)
      })
      .finally(() => {
        setRunCommandLoading(false)
      })
  }

  const clearOptionsAndArguments = () => {
    setArgumentsData(defaultArgumentsData)
    setOptionsData(defaultOptionsData)
  }

  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={6}>
          <Box mb={30}>
            <Title order={1}>{command.name}</Title>
            <Text>{command.description}</Text>
          </Box>

          <Box mt={20}>
            <Text fw={"bold"} mb={5}>Usage:</Text>
            <Code block>{command.usage}</Code>
          </Box>

          <Box mt={20}>
            <Text fw={"bold"} mb={5}>Arguments:</Text>
            {!commandArguments.length ? (
              <Alert icon={<IconAlertCircle size={16} />} title="No arguments available">
                This command has no arguments.
              </Alert>
            ) : (
              <SimpleGrid cols={6}>
                {commandArguments.map((argument: any, index: number) => (
                  <div key={index} style={{ alignSelf: 'center' }}>
                    <Tooltip disabled={!argument.description} label={argument.description} position={"bottom"}>
                      <TextInput
                        placeholder={argument.name}
                        value={argumentsData[argument.name]}
                        onChange={(e) => setArgumentsData({ ...argumentsData, [argument.name]: e.currentTarget.value })}
                        required={argument.is_value_required}
                      />
                    </Tooltip>
                  </div>
                ))}
              </SimpleGrid>
            )}
          </Box>

          <Box mt={20}>
            <Text fw={"bold"} mb={5}>Options:</Text>
            {!commandOptions.length ? (
              <Alert icon={<IconAlertCircle size={16} />} title="No options available">
                This command has no options
              </Alert>
            ) : (
              <SimpleGrid cols={6}>
                {commandOptions.map((option: any, index: number) => (
                  <div key={index} style={{ alignSelf: 'center' }}>
                    <Tooltip disabled={!option.description} label={option.description} position={"bottom"}>
                      {option.accept_value ? (
                        <TextInput
                          placeholder={option.name}
                          value={optionsData[option.name]}
                          onChange={(e) => setOptionsData({ ...optionsData, [option.name]: e.currentTarget.value })}
                          required={option.is_value_required}
                        />
                      ) : (
                        <Checkbox
                          label={option.name}
                          checked={optionsData[option.name]}
                          onChange={(e) => setOptionsData({ ...optionsData, [option.name]: e.currentTarget.checked })}
                          required={option.is_value_required}
                        />
                      )}
                    </Tooltip>
                  </div>
                ))}
              </SimpleGrid>
            )}
          </Box>

          <Box mt={20}>
            <Text fw={"bold"} mb={5}>Preview:</Text>
            <Prism language={"bash"}>{getCommandPreview()}</Prism>
          </Box>

          <Flex justify={"start"} align={"center"} mt={20}>
            <Button onClick={clearOptionsAndArguments} variant={"light"} mr={10}>Clear</Button>
            <Button loading={runCommandLoading} onClick={runCommand} fullWidth>Run</Button>
          </Flex>
        </Grid.Col>
        <Grid.Col span={6}>
          {result && (
            <Box mt={20} h={"80vh"} style={{overflow: "auto"}}>
              <Prism colorScheme="dark" language="bash" noCopy={true}>
                {result}
              </Prism>
            </Box>
          )}
        </Grid.Col>
      </Grid>
    </Container>
  )
}