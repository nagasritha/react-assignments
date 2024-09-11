import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { If } from './if.component';

export const Timer = forwardRef(({ name, timerCondition, restarted }, ref) => {
    const [ms, setMs] = useState(0);
    const [running, setRunning] = useState(false);
    const intervalId = useRef(null); // For storing the interval ID

    // Start the timer
    const start = () => {
        if (intervalId.current) clearInterval(intervalId.current);
        intervalId.current = setInterval(() => {
            setMs(prevMs => prevMs + 100);
        }, 100);
        setRunning(true);
    };

    // Stop the timer
    const stop = () => {
        if (intervalId.current) clearInterval(intervalId.current);
        setRunning(false);
    };

    // Reset the timer
    const reset = () => {
        if (intervalId.current) clearInterval(intervalId.current);
        setMs(0);
        setRunning(false);
    };

    // Expose start, stop, and reset functions to parent components via ref
    useImperativeHandle(ref, () => ({
        start,
        stop,
        reset,
        ms
    }));

    // Effect to handle timerCondition and restarted props changes
    useEffect(() => {
        if (timerCondition && !running) {
            start();
        } else if (!timerCondition && running) {
            stop();
        }
    }, [timerCondition, running]);

    useEffect(() => {
        if (restarted) {
            reset();
        }
    }, [restarted]);

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            clearInterval(intervalId.current);
        };
    }, []);

    const formatTime = num => (num < 10 ? `0${num}` : num);

    const formatMilliseconds = num => {
        if (num < 10) return `00${num}`;
        if (num < 100) return `0${num}`;
        return num;
    };

    // Render buttons
    const renderButtons = () => (
        <div>
            <button onClick={start}>{running ? 'Stop' : 'Start'}</button>
            <button onClick={reset}>Reset</button>
        </div>
    );

    // Calculate time components
    const _ms = ms % 1000;
    let sec = Math.floor(ms / 1000);
    const minutes = Math.floor(sec / 60);
    sec = sec % 60;

    return (
        <div className='timer-component'>
            <h1>{name}</h1>
            <div className='timer'>
                <span className='minutes'>{formatTime(minutes)}:</span>
                <span className='seconds'>{formatTime(sec)}.</span>
                <span className='milliseconds'>{formatMilliseconds(_ms)}</span>
            </div>
            <If condition='false' child={renderButtons} />
        </div>
    );
});
