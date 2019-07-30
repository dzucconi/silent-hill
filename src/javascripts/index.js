import rightSrc from "../images/right.png";
import leftSrc from "../images/left.png";

const CONFIG = {
  global: {
    speed: 1500
  },
  desktop: {
    offset: 100,
    amount: 150,
    width: 50,
    height: 109
  },
  mobile: {
    offset: 20,
    amount: 50,
    width: 25,
    height: 54.5
  }
};

const img = ({ width, height, src, name }) => {
  const i = new Image(width, height);
  i.src = src;
  i.className = name;
  return i;
};

const buildShoes = screen => ({
  right: img({
    width: CONFIG[screen].width,
    height: CONFIG[screen].height,
    src: rightSrc,
    name: "right"
  }),
  left: img({
    width: CONFIG[screen].width,
    height: CONFIG[screen].height,
    src: leftSrc,
    name: "left"
  })
});

const shoes = {
  desktop: buildShoes("desktop"),
  mobile: buildShoes("mobile")
};

const STATE = {
  screen: "desktop",
  step: "right",
  current: [0, 0],
  previous: [0, 0]
};

const next = ([top, left], angle) => [
  Math.round(
    Math.sin((angle * Math.PI) / 180) * CONFIG[STATE.screen].amount + top
  ),
  Math.round(
    Math.cos((angle * Math.PI) / 180) * CONFIG[STATE.screen].amount + left
  )
];

const rand = (min, max) => Math.random() * (max - min) + min;

const start = () => [
  Math.floor(rand(0, window.innerHeight - CONFIG[STATE.screen].offset)),
  Math.floor(rand(0, window.innerWidth - CONFIG[STATE.screen].offset))
];

const isOutOfBounds = () =>
  STATE.previous[0] >= window.innerHeight - CONFIG[STATE.screen].offset ||
  STATE.previous[0] <= CONFIG[STATE.screen].offset ||
  (STATE.previous[1] >= window.innerWidth - CONFIG[STATE.screen].offset ||
    STATE.previous[1] <= CONFIG[STATE.screen].offset);

const step = () => {
  if (isOutOfBounds()) {
    STATE.previous = start();
    STATE.angle = rand(0, 360);
  }

  STATE.current = next(STATE.previous, STATE.angle);
  STATE.step = STATE.step === "right" ? "left" : "right";
};

const render = () => {
  const image = shoes[STATE.screen][STATE.step];
  image.style.top = `${STATE.current[0]}px`;
  image.style.left = `${STATE.current[1]}px`;
  image.style.transform = `rotate(${STATE.angle + 90}deg)`;
  document.body.appendChild(image);
};

document.addEventListener("DOMContentLoaded", () => {
  setInterval(() => {
    STATE.previous = STATE.current;
    step();
    render();
  }, CONFIG.global.speed);
});

const setScreen = width => (STATE.screen = width >= 600 ? "desktop" : "mobile");
setScreen(window.innerWidth);
window.onresize = () => setScreen(window.innerWidth);
