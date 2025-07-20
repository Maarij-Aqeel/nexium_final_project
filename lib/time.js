const gettime = (seconds) => {
  const now = new Date();

  const totalSeconds = now.getUTCSeconds() + seconds;
  const addedMinutes = Math.floor(totalSeconds / 60);

  const totalMinutes = now.getUTCMinutes() + addedMinutes;
  const extraHours = Math.floor(totalMinutes / 60);
  const finalMinutes = totalMinutes % 60;

  const totalHours = (now.getUTCHours() + extraHours) % 24;

  const pad = (num) => String(num).padStart(2, "0");

  const hour12 = totalHours % 12 || 12;
  const ampm = totalHours >= 12 ? "PM" : "AM";

  const endingTime = `${pad(hour12)}:${pad(finalMinutes)} ${ampm}`;
  console.log(
    `Current UTC time is ${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}`
  );
  return endingTime;
};

export default gettime;
