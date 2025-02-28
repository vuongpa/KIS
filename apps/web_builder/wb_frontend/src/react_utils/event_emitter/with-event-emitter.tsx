import { DefaultFcProps } from "../default-fc-props"
import { EmitterProvider } from "./event-emitter"

export const withEventEmitter = (Component: React.FC<DefaultFcProps>) => (props: DefaultFcProps) => {
  return (
    <EmitterProvider>
      <Component {...props} />
    </EmitterProvider>
  )
}