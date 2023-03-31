const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");
const checkboxEl = document.querySelector("#checkbox");

let interval;
const displayTime = (timeName, time) => {
  const lastOne = Number(time.toString().slice(-1));
  switch (timeName) {
    case "hours":
      if (lastOne === 1) return "час";
      if ([2, 3, 4].indexOf(lastOne) >= 0) return "часа";
      return "часов";
    case "minutes":
      if (lastOne === 1) return "минута";
      if ([2, 3, 4].indexOf(lastOne) >= 0) return "минуты";
      return "минут";
    case "sec":
      if (lastOne === 1) return "секунда";
      if ([2, 3, 4].indexOf(lastOne) >= 0) return "секунды";
      return "секунд";
    default:
      break;
  }
};

const formatTime = (seconds, checked) => {
  const hours = `${String(Math.floor(seconds / 60 / 60)).padStart(2, "0")}`;
  const mins = String(Math.floor(seconds / 60) % 60).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  if (!checked) {
    return `${hours}:${mins}:${sec}`;
  }
  return `${hours} ${displayTime("hours", hours)}:${mins} ${displayTime(
    "minutes",
    mins
  )}:${sec} ${displayTime("sec", sec)}`;
};

const createTimerAnimator = () => {
  const timer = (seconds) => {
    interval = setInterval(() => {
      seconds--;
      timerEl.textContent = formatTime(seconds, checkboxEl.checked);

      if (seconds <= 0) {
        clearInterval(interval);
        timerEl.textContent = "00:00:00";
        console.log("done");
      }
    }, 1000);
  };

  return (seconds) => {
    clearInterval(interval);
    timer(seconds);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  inputEl.value = inputEl.value.replace(/\D/g, "");
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);
  timerEl.textContent = formatTime(seconds, checkboxEl.checked);

  animateTimer(seconds);

  inputEl.value = "";
});

checkboxEl.addEventListener("input", () => {
  const arr = timerEl.textContent.match(/\d{2}/g) || [];

  const seconds = arr
    .map((i, index) => {
      if (index === 0) return Number(i) * 3600;
      if (index === 1) return Number(i) * 60;
      if (index === 2) return Number(i);
    })
    .reduce((a, b) => a + b, 0);

  timerEl.textContent = formatTime(seconds, checkboxEl.checked);
});
