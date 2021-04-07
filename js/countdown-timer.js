import clockFaceMarkup from './clockface-markup.js';

document.querySelector('body').insertAdjacentHTML('afterbegin', clockFaceMarkup());

const ref = {
  days: document.querySelector('span[data-value="days"]'),
  hours: document.querySelector('span[data-value="hours"]'),
  mins: document.querySelector('span[data-value="mins"]'),
  secs: document.querySelector('span[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ targetDate, onTick }) {
    this.timerId = null;
    this.targetDate = targetDate;
    this.onTick = onTick;

    this.start();
  };

  start() {
  this.timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = this.targetDate.getTime() - currentTime;
    const { days, hours, mins, secs } = this.getTimeComponents(deltaTime);
    if (+days === 0 && +hours === 0 && +mins === 0 && +secs === 0) {
      stop();
    }
    this.onTick({ days, hours, mins, secs });
  }, 1000);
  };

  stop() {
    clearInterval(this.timerId);
  };

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  };

  pad(value) {
    return String(value).padStart(2, '0');
  };
};

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Apr 12, 2021'),
  onTick: updateClockFace,
});

function updateClockFace({ days, hours, mins, secs }) {
  ref.days.textContent = `${days}:`;
  ref.hours.textContent = `${hours}:`;
  ref.mins.textContent = `${mins}:`;
  ref.secs.textContent = `${secs}`;
}