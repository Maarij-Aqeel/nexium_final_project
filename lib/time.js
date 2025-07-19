// Function for getting time
const gettime = (seconds) => {
  const now = new Date();

  // Total seconds from now
  const totalSeconds = now.getSeconds() + seconds;
  const extraMinutes = Math.floor(totalSeconds / 60);
  const finalSeconds = totalSeconds % 60;

  const finalMinutes = now.getMinutes() + extraMinutes;

  const pad = (num) => String(num).padStart(2, "0");

  const endingTime = `${pad(finalMinutes)}:${pad(finalSeconds)}`;
  console.log(`Current time is ${now.getMinutes()}:${now.getSeconds()}`);
  return endingTime;
};

export default gettime;
