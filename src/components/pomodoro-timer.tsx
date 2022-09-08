import React, { useEffect } from 'react'
import { useInterval } from '../hooks/use-interval'
import { Button } from './button'
import { Timer } from './timer'

interface Props {
  pomodoroTime: number
  shortRestTime: number
  longRestTime: number
  cycles: number
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime)
  const [timeCounting, setTimeCounting] = React.useState(false)
  const [working, setWorking] = React.useState(false)

  useEffect(() => {
    if (working) document.body.classList.add('working')
  }, [working])

  useInterval(
    () => {
      setMainTime(mainTime - 1)
    },
    timeCounting ? 1000 : null
  )

  const configureWork = () => {
    setTimeCounting(true)
    setWorking(true) // when this is true the classList will work
  }

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button text="Work" onClick={() => configureWork()}></Button>
        <Button text="test" onClick={() => console.log(1)}></Button>
        <Button text="Pause" onClick={() => setTimeCounting(false)}></Button>
      </div>

      <div className="details">
        <p>Testando: dsgasdg sdgagd asgf adfg adgf</p>
        <p>Testando: dsgasdg sdgagd asgf adfg adgf</p>
      </div>
    </div>
  )
}
