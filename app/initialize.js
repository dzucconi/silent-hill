const img = ({ width, height, src, name }) => {
  const i = new Image(width, height);
  i.src = src;
  i.className = name;
  return i;
};

const shoes = {
  right: img({ width: 75, height: 164, src: './right.png', name: 'right' }),
  left: img({ width: 75, height: 164, src: './left.png', name: 'left' }),
};

const CONFIG = {
  amount: 150,
  speed: 2000,
};

const STATE = {
  step: 'right',
  top: 0,
  left: 0,
  steps: 0,
};

const rand = (min, max) =>
  Math.random() * (max - min) + min;

const start = () => ([
  Math.floor(rand(0, window.innerHeight)),
  Math.floor(rand(0, window.innerWidth)),
]);

const move = (delta) => (x) => {
  if (x instanceof Array) return x.map(i => i + delta);
  return x + delta;
};

const angle = ([top1, left1], [top2, left2]) =>
  (Math.atan2(top2 - top1, left2 - left1) * 180 / Math.PI) + 90;

const step = () => {
  if (
    (STATE.top >= window.innerHeight || STATE.top <= 0) ||
    (STATE.left >= window.innerWidth || STATE.left <= 0)
  ) STATE.steps = 0;

  if (STATE.steps === 0) {
    const [top, left] = start();

    STATE.top = top;
    STATE.left = left;

    STATE.moveTop = (STATE.top >= window.innerHeight / 2)
      ? move(-CONFIG.amount) : move(CONFIG.amount);
    STATE.moveLeft = (STATE.left >= window.innerWidth / 2)
      ? move(-CONFIG.amount) : move(CONFIG.amount);

  } else {
    STATE.top = STATE.moveTop(STATE.top);
    STATE.left = STATE.moveLeft(STATE.left);
  }

  STATE.step = (STATE.step === 'right') ? 'left' : 'right';
  STATE.steps++;

  return STATE;
};

document.addEventListener('DOMContentLoaded', () => {
  setInterval(() => {
    STATE.previous = [STATE.top, STATE.left];

    step();

    STATE.angle = angle(STATE.previous, [STATE.top, STATE.left]);

    const image = shoes[STATE.step];
    image.style.top = `${STATE.top}px`;
    image.style.left = `${STATE.left}px`;
    image.style.transform = `rotate(${STATE.angle}deg)`;

    document.body.appendChild(image);
  }, CONFIG.speed);
});
