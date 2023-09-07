
var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
let arguments;

{class Fountain {
  constructor() {
    this.limit = 35
    this.particles = []
    this.autoAddParticle = false
    this.height = document.documentElement.clientHeight
    this.sizes = [15, 20, 25, 35, 45]
    this.variants = ['🥞', '🤑']
    this.addHandlers()
    this.loop()
  }

  loop() {
    if (this.autoAddParticle && this.particles.length < this.limit) {
      this.createParticle()
    }

    this.updateParticles()

    requestAnimationFrame(this.loop.bind(this))
  }

  addHandlers() {
    const isTouchInteraction =
      "ontouchstart" in window || navigator.msMaxTouchPoints

    const tap = isTouchInteraction ? "touchstart" : "mousedown"
    const tapEnd = isTouchInteraction ? "touchend" : "mouseup"
    const move = isTouchInteraction ? "touchmove" : "mousemove"

    document.addEventListener(
      move,
      (e) => {
        this.mouseX = e.pageX || e.touches[0].pageX
        this.mouseY = e.pageY || e.touches[0].pageY
      },
      {passive: false}
    )

    document.addEventListener(tap, (e) => {
      this.mouseX = e.pageX || e.touches[0].pageX
      this.mouseY = e.pageY || e.touches[0].pageY
      this.autoAddParticle = true
    })

    document.addEventListener(tapEnd, () => {
      this.autoAddParticle = false
    })

    document.addEventListener("mouseleave", () => {
      this.autoAddParticle = false
    })
  }

  createParticle() {
    const size = this.sizes[Math.floor(Math.random() * this.sizes.length)]
    const speedHorz = Math.random() * 10
    const speedUp = Math.random() * 25
    const spinVal = Math.random() * 360
    const spinSpeed = Math.random() * 35 * (Math.random() <= 0.5 ? -1 : 1)
    const top = this.mouseY - size / 2
    const left = this.mouseX - size / 2
    const direction = Math.random() <= 0.5 ? -1 : 1

    const particle = document.createElement("span")
    particle.innerHTML = `<img>${this.variants[Math.floor(Math.random() * this.variants.length)]}</img>`
    particle.classList.add("particle")

    particle.setAttribute(
      "style",
      `
      width: ${size}px;
      top: ${top}px;
      left: ${left}px;
      transform: rotate(${spinVal}deg);
    `
    )

    document.getElementById("root").appendChild(particle)

    this.particles.push({
      element: particle,
      size,
      speedHorz,
      speedUp,
      spinVal,
      spinSpeed,
      top,
      left,
      direction,
    })
  }

  updateParticles() {
    this.particles.forEach((p) => {
      p.left = p.left - p.speedHorz * p.direction
      p.top = p.top - p.speedUp
      p.speedUp = Math.min(p.size, p.speedUp - 1)
      p.spinVal = p.spinVal + p.spinSpeed

      if (p.top >= this.height + p.size) {
        this.particles = this.particles.filter((o) => o !== p)
        p.element.remove()
      }

      p.element.setAttribute(
        "style",
        `
        top: ${p.top}px;
        left: ${p.left}px;
        font-size: ${p.size}px;
        transform:rotate(${p.spinVal}deg);
      `
      )
    })
  }
}

new Fountain()

let container = document.getElementById('vomit');
let emoji = ['🤑', '💰', '🔥', '🥞', '🚀', '🌈', '💎', '🌕', '👏', '🧠', '🧑‍🚀', '📈'];
let circles = [];

for (let i = 0; i < 6; i++) {
  addCircle(i * 150, [15 + 145, 12], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 150, [27 + 145, 12], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 150, [39 + 145, 7], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 150, [46 + 145, 12], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 150, [58 + 145, 12], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 150, [70 + 145, 12], emoji[Math.floor(Math.random() * emoji.length)]);
}

function addCircle(delay, range, color) {
  setTimeout(function() {
    var c = new Circle(range[0] + Math.random() * range[1], 80 + Math.random() * 4, color, {
      x: -0.15 + Math.random() * 0.3,
      y: 1 + Math.random() * 1
    }, range);
    circles.push(c);
  }, delay);
}

class Circle {
  constructor(x, y, c, v, range){
    this.x = x;
    this.y = y;
    this.color = c;
    this.v = v;
    this.range = range;
    this.element = document.createElement('span');
    /*this.element.style.display = 'block';*/
    this.element.style.opacity = 0;
    this.element.style.position = 'absolute';
    this.element.style.fontSize = '26px';
    this.element.innerHTML = `<img>${c}</img>`;
    container.appendChild(this.element);
  }
  
  update(){
    if (this.y > 220) {
      this.y = 80 + Math.random() * 4;
      this.x = this.range[0] + Math.random() * this.range[1];
    }
    this.y += this.v.y;
    this.x += this.v.x;
    this.element.style.opacity = 1;
    this.element.style.transform = 'translate3d(' + this.x + 'px, ' + this.y + 'px, 0px)';
    this.element.style.webkitTransform = 'translate3d(' + this.x + 'px, ' + this.y + 'px, 0px)';
    this.element.style.mozTransform = 'translate3d(' + this.x + 'px, ' + this.y + 'px, 0px)';
  }
}

(function animate(){
  for (var i in circles) {
    circles[i].update();
  }
  requestAnimationFrame(animate);
})();

}}