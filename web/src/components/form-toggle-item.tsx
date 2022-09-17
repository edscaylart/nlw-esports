import * as ToggleGroup from '@radix-ui/react-toggle-group';

type Props = {
  title: string
  value: string
  checked: boolean
}

export function FormToggleItem({ checked, title, value }: Props) {
  return (
    <ToggleGroup.Item
      value={value}
      title={title}
      className={`
        w-8
        h-8
        rounded
        ${checked ? 'bg-violet-500' : 'bg-zinc-900'}
      `}>
    {title[0]}
  </ToggleGroup.Item>
  )
}