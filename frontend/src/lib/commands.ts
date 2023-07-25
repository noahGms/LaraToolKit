export const CommonCommandOptions = [
  '--ansi',
  '--current',
  '--env',
  '--help',
  '--input',
  '--no-ansi',
  '--no-interaction',
  '--quiet',
  '--shell',
  '--symfony',
  '--verbose',
  '--version',
]

export const getOptionsWithoutCommon = (options: any) => {
  return options.filter((option: any) => !CommonCommandOptions.includes(option.name))
}