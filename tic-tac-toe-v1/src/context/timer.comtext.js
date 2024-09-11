import React from 'react'

export const TimerContext = React.createContext();

export const useTimerContext = ()=>React.useContext(TimerContext);