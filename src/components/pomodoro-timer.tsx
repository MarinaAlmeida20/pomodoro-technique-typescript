// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback, useEffect, useState } from 'react'
import { useInterval } from '../hooks/use-interval'
import { secondsToTime } from '../utils/seconds-to-time'
import { Button } from './button'
import { Timer } from './timer'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/src_sounds_bell-start.mp3')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../sounds/src_sounds_bell-finish.mp3')

const audioStartWorking = new Audio(bellStart)
const audioStopWorking = new Audio(bellFinish)

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime)
  const [timeCounting, setTimeCounting] = useState(false)
  const [working, setWorking] = useState(false)
  const [resting, setResting] = useState(false)
  const [cyclesQtdManager, setCyclesQtdManager] = useState(new Array(props.cycles - 1).fill(true)) // -1 means empty array, so sum 4 cyclesQtdManager

  const [completedCycles, setCompletedCycles] = useState(0)
  const [fullWorkingTime, setFullWorkingTime] = useState(0)
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0)

  useInterval(
    () => {
      setMainTime(mainTime - 1)
    },
    timeCounting ? 1000 : null
  )

  // starting work
  const configureWork = useCallback(() => { // useCallback make the no change in every render
    setTimeCounting(true)
    setWorking(true) // when this is true the classList will work
    setResting(false)
    setMainTime(props.pomodoroTime) // reset the time
    audioStartWorking.play()
  }, [setTimeCounting,
    setWorking,
    setResting,
    setMainTime,
    props.pomodoroTime,])

  const configureRest = useCallback((long: boolean) => {
    setTimeCounting(true)
    setWorking(false)
    setResting(true)

    if (long) {
      setMainTime(props.longRestTime);
    } else {
      setMainTime(props.shortRestTime)
    }

    audioStopWorking.play()
  }, [setTimeCounting,
    setWorking,
    setResting,
    setMainTime,
    props.longRestTime,
    props.shortRestTime,])

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    // if the 25min not finished
    if (mainTime > 0) return;

    // if the cyclesQtdManager not finished
    if (working && cyclesQtdManager.length > 0) {
      configureRest(false)
      cyclesQtdManager.pop(); // to remove one cycle from the Array
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true)
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1)
    }

    // pomodors number
    if (working) setNumberOfPomodoros(numberOfPomodoros + 1)

    // resting
    if (resting) configureWork()


  }, [working,
    resting,
    mainTime,
    cyclesQtdManager,
    numberOfPomodoros,
    completedCycles,
    configureRest,
    setCyclesQtdManager,
    configureWork,
    props.cycles])

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button text="Work" onClick={() => configureWork()}></Button>
        <Button text="Rest" onClick={() => configureRest(false)}></Button>
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)}
        ></Button>
      </div>

      <div className="details">
        <p>Completed Cycles: {completedCycles}</p>
        <p>Work Times: {secondsToTime(fullWorkingTime)}</p>
        <p>Completed Pomodoros: {numberOfPomodoros}</p>
      </div>
    </div>
  )
}
