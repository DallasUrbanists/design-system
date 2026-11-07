import { Progress } from '@dallasurbanists/ui'

export default {
  title: 'Components/Progress',
  component: Progress,
  args: { label: 'Preparing preview', value: 40, max: 100 },
}
export const Default = {}
export const Complete = { args: { value: 100 } }
export const Indeterminate = { args: { value: undefined } }
