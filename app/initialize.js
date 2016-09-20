const CONFIG = {
  amount: 150,
  speed: 1500,
  offset: 100,
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
    src: './right_b.png',
    name: 'right',
  }),
  left: img({
    width: 50,
    height: 109,
    src: './left_b.png',
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
  Math.floor(rand(0, window.innerHeight - CONFIG.offset)),
  Math.floor(rand(0, window.innerWidth - CONFIG.offset)),
]);

const isOutOfBounds = () => (
  (STATE.previous[0] >= (window.innerHeight - CONFIG.offset) || STATE.previous[0] <= CONFIG.offset) ||
  (STATE.previous[1] >= (window.innerWidth - CONFIG.offset) || STATE.previous[1] <= CONFIG.offset)
);

const step = () => {
  if (isOutOfBounds()) {
    STATE.previous = start();
    STATE.angle = rand(0, 360);
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
