// Library functions and constants
// ===============================
const DRAGGABLE_SELECTOR = `.draggable`;
const DROPZONE_SELECTOR = '.dropzone';

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

const inDropzone = {};
window.inDropzone = inDropzone;

interact(DROPZONE_SELECTOR)
  .dropzone({
    ondrop: (event) => {     
      // event.relatedTarget.classList.add('drop-activated')
      console.log('dropzone e', event)
    },
    ondragenter: function (event) {
      var draggableElement = event.relatedTarget
      draggableElement.classList.add('drop-activated')

      const id = draggableElement.getAttribute('data-drop-id') || String(Math.random() * 1000);
      draggableElement.setAttribute('data-drop-id', id);

      inDropzone[id] = draggableElement;
      console.log('in dropZone is now', inDropzone)
    },
    ondragleave: function (event) {
      var draggableElement = event.relatedTarget
      draggableElement.classList.remove('drop-activated')

      const id = draggableElement.getAttribute('data-drop-id');
      delete inDropzone[id];

      console.log('in dropZone is now', inDropzone)
    },  
  })


