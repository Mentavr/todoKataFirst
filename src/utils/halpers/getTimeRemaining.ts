export const getTimeRemaining = (e: string) => {
  const dateNow = new Date();
  const total = Date.parse(e) - Date.parse(String(dateNow));
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / 1000 / 60 / 60) % 24);
  return {
    total,
    hours,
    minutes,
    seconds,
  };
};
