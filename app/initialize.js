const CONFIG = {
  amount: 150,
  speed: 1000,
};

const STATE = {
  step: 'right',
  current: [0, 0],
  previous: [0, 0],
};

const img = ({ width, height, src, name }) => {
  const i = new Image(width, height);
  i.src = src;
  i.className = name;
  return i;
};

const shoes = {
  right: img({
    width: 50,
    height: 109,
    src: './right.png',
    name: 'right',
  }),
  left: img({
    width: 50,
    height: 109,
    src: './left.png',
    name: 'left',
  }),
};

const next = ([top, left], angle) => ([
  Math.round(Math.sin(angle * Math.PI / 180) * CONFIG.amount + top),
  Math.round(Math.cos(angle * Math.PI / 180) * CONFIG.amount + left),
]);

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

const isOutOfBounds = () => (
  (STATE.previous[0] >= window.innerHeight || STATE.previous[0] <= 0) ||
  (STATE.previous[1] >= window.innerWidth || STATE.previous[1] <= 0)
);

const step = () => {
  if (isOutOfBounds()) {
    STATE.angle = rand(0, 360);
    STATE.previous = start();
  }

  STATE.current = next(STATE.previous, STATE.angle);
  STATE.step = (STATE.step === 'right') ? 'left' : 'right';
};

const render = () => {
  const image = shoes[STATE.step];
  image.style.top = `${STATE.current[0]}px`;
  image.style.left = `${STATE.current[1]}px`;
  image.style.transform = `rotate(${STATE.angle + 90}deg)`;
  document.body.appendChild(image);
};

document.addEventListener('DOMContentLoaded', () => {
  setInterval(() => {
    STATE.previous = STATE.current;
    step();
    render();
  }, CONFIG.speed);
});
