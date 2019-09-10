export const minuteInMs = 60 * 1000;
export const hourInMs = minuteInMs * 60;

export const msToMinutes = (ms: number) => Math.ceil(ms / (60 * 1000));
export const msToHours = (ms: number) => Math.ceil(ms / (60 * 60 * 1000));

export const timeLeft = (timer, timeScale) => {
  const timeLeftInMs = timer.duration - (Date.now() - timer.start.getTime());
  let timeLeft = timeLeftInMs;

  if (timeLeftInMs <= -1) return 0;

  if (timeScale === minuteInMs) {
    timeLeft = msToMinutes(timeLeftInMs);
  } else if (timeScale === hourInMs) {
    timeLeft = msToHours(timeLeftInMs);
  }

  return timeLeft;
};
