// Library functions and constants
// ===============================
const DRAGGABLE_CLASS = "draggable";
const DRAGGABLE_SELECTOR = `.${DRAGGABLE_CLASS}`;
const EVERYTHING_IS_DRAGGABLE = false;

const shuffled = (arr) =>
  arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);



// Animations
// ==========
const spin =
  [[
    { transform: 'rotate(0) translate3D(-50%, -50%, 0)', color: '#000' },
    { color: '#431236', offset: 0.3 },
    { transform: 'rotate(360deg) translate3D(-50%, -50%, 0)', color: '#000' }
  ], {
    duration: 3000,
    iterations: Infinity
  }]


// Making puzzle pieces draggable
// ==============================
let zIndex = 0
interact(DRAGGABLE_SELECTOR).draggable({
  listeners: {
    move(event) {
      // event.target.animate(...wiggle);
      
      // Approach 1: using left: and right: css rules
      const previousLeft = parseFloat(event.target.style.left || 0);
      const previousTop = parseFloat(event.target.style.top || 0);
      event.target.style.left = `${event.dx + previousLeft}px`;
      event.target.style.top = `${event.dy + previousTop}px`;

      // Approach 2: using transform: transform() css rule
      // const previousTransform = event.target.style.transform || 'translate(0px, 0px)';
      // console.log('previousTransform', previousTransform)
      // console.log('/[0-9.]+/.exec(previousTransform)');
      // console.log(/[0-9.]+/.exec(previousTransform))
      // const [previousX = 0, previousY = 0] = previousTransform.match(/[0-9.]+/);
      // console.log('previousX, previousY', previousX, previousY)
      // const x = Number(previousX) + event.dx;
      // const y = Number(previousY) + event.dy;
      // event.target.style.transform = `translate(${x}px, ${y}px)`;
      

      event.target.style.zIndex = ++zIndex;
      event.target.style.position = 'relative';
    }
  },
});
