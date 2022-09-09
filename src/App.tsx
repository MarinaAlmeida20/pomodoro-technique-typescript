/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { PomodoroTimer } from './components/pomodoro-timer'

function App(): JSX.Element {
  return (
    <div className="App">
      <PomodoroTimer
        pomodoroTime={1500} // 25min = 1500
        shortRestTime={300} // 5min - For each pomodoro one shortRestTime
        longRestTime={900} // 15min
        cycles={4} // For each end of cycle (4x short) one longRestTime
      />
    </div>
  )
}

export default App
