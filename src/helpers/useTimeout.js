import {useCallback, useEffect, useRef, useState} from 'react';

export default function useTimeout(callback, timer) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef();
  const timeLeftRef = useRef();

  const [timeLeft, setTimeLeft] = useState(timer);
  const delay = 1000;

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    setTimer();
  }, [timeLeft]);

  const setTimer = useCallback(() => {
    timeLeftRef.current = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, delay);
    if (timeLeft < 1) timeLeftRef.current && clearTimeout(timeLeftRef.current);
  }, [timeLeft]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      callbackRef.current();
      clear();
    }, timer * delay);
  }, [timer]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  const clearTimer = useCallback(() => {
    timeLeftRef.current && clearTimeout(timeLeftRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [timer, set, clear]);

  const reset = useCallback(() => {
    clear();
    clearTimer();
    set();
    setTimer();
  }, [clear, set]);

  return {reset, clearTimer, timeLeft};
}
