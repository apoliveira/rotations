const pi = new Big(8958937768937).div(2851718461558);
const phi = new Big(5).sqrt().plus(1).div(2);
const twopi = pi.times(2);
const e = new Big(22526049624551).div(8286870547680);

const list_of_angles = [
  {name: "π", angle: pi}, 
  {name: "22/7", angle: Big(22).div(7)}, 
  {name: "355/113", angle: Big(355).div(113)}, 
  {name: "Golden Ratio, phi", angle: phi}, 
  {name: "2 π", angle: twopi},
  {name: "Euler's constant, e", angle: e}
].map( ( {name, angle} ) => {
  
  return {
    name: name + " &asymp; " + angle.toPrecision(5),
    angle
  }
});

var app = new Vue({
  el: "#app",
  data: {
    angles: list_of_angles,
    alpha : list_of_angles[0].angle,
    radius : 150,
    n : 1,
    closest : 1,
    convergents : [],
    drawerId : 0,
    canvas: null,
    ctx: null,
    dashOffset : 10,
    dashColor : "green",
    speed: 500,
  },
  methods: {
    draw : function() {
      const rotation = this.deg.times(this.n).mod(1);
      
      const other_dist = rotation.minus(1).abs();
      const dist = rotation.lte(other_dist) ? rotation : other_dist;
            
      this.ctx.beginPath();
      this.ctx.rotate(rotation.times(twopi));
      this.ctx.moveTo(this.radius - this.dashOffset, 0);
      
      if(dist.lt(this.closest) ) {
        this.closest = dist;
        this.convergents.push(this.n);
        this.ctx.moveTo(Math.pow(.9, this.convergents.length) * this.radius, 0);
        this.ctx.strokeStyle = "orange";
      }
      this.ctx.lineTo(this.radius + this.dashOffset, 0);
      this.ctx.stroke()
      this.ctx.strokeStyle = "green";
      this.ctx.rotate(-rotation.times(twopi));
      this.n += 1;
      
      return;
      this.ctx.beginPath();
      this.ctx.rotate(rotation);
      this.ctx.moveTo(this.radius - this.dashOffset, 0);
      this.ctx.lineTo(this.radius + this.dashOffset, 0);
      this.ctx.stroke()
      this.ctx.rotate(-rotation);
      this.n += 1;
    },
    clear : function() {
      var wasplaying = this.drawerId != 0;

      this.pause()

      var oldcanv = document.getElementsByTagName('canvas')[0];
      oldcanv.remove();
 
      var canv = document.createElement('canvas');
      var app = document.getElementById("app");
      app.prepend(canv);

      this.setup();
      
      if(wasplaying)
        this.play();
    },
    play: function() {
      if(this.drawerId != 0) return;
      this.drawerId = setInterval(this.draw, this.speed);
    },
    pause() {
      clearTimeout(this.drawerId);
      this.drawerId = 0
    },
    toggle_play() {
      if(this.drawerId == 0) {
        this.play();
      }
      else {
        this.pause()
      }
    },
    setup() {
      var _canvas = document.getElementsByTagName("canvas")[0];
      var _ctx = _canvas.getContext("2d");
      this.canvas = _canvas;
      this.ctx = _ctx;
      
      // Fix ratio
      let dpi = window.devicePixelRatio;
      let style_height = getComputedStyle(this.canvas).getPropertyValue("height").slice(0, -2);
      let style_width = getComputedStyle(this.canvas).getPropertyValue("width").slice(0, -2);
      //scale the this.canvas
      this.canvas.setAttribute('height', style_height * dpi);
      this.canvas.setAttribute('width', style_width * dpi)

      // Set position
      this.centerX = this.canvas.width / 2;
      this.centerY = this.canvas.height / 2;

      this.radius = .45 * Math.min(style_height, style_width)
      
      this.init_draw();
    },
    init_draw() {
      // Draw circle
      this.n = 1;
      this.closest = 1;
      this.convergents = [];
      this.ctx.strokeStyle = "black";
      this.ctx.translate(this.centerX, this.centerY);
      this.ctx.beginPath();
      this.ctx.arc(0,0, this.radius, 0, 2 * Math.PI, true)
      this.ctx.stroke()
  
      // Draw zero
      this.ctx.strokeStyle = "red";
      this.ctx.beginPath();
      this.ctx.moveTo(this.radius - 1.5 * this.dashOffset, 0);
      this.ctx.lineTo(this.radius + 1.5 * this.dashOffset, 0);
      this.ctx.stroke()

      this.ctx.strokeStyle = this.dashColor;
    }
  },
  mounted() {
    this.setup();

    // Listen for shortcuts
    // Escape key is dumb...
    window.addEventListener("keydown", e => {
      if(e.keyCode == 27) { // ESC
        togglePopup();
      }
    })
    
    window.addEventListener("keypress", e => {
      //console.log(e.keyCode);
      if(e.keyCode == 97) { // ?
        toggle_about();
      }
      if(e.keyCode == 63) { // ?
        toggle_help();
      }
      if(e.keyCode == 110) { // n
        this.n = parseInt(prompt("Update iteration number: ")) + 1;
      }
      if(e.keyCode == 100) { // d
        this.draw();
      }
      if(e.keyCode == 32) { // space
        this.toggle_play();
      }
      if(e.keyCode == 48) { // 0
        this.speed = 0;
      }
      if(e.keyCode == 45) { // -
        this.speed -= 25;
        if(this.speed < 0) {
          this.speed += 25;
        }
      }
      if(e.keyCode == 43) { // +
        this.speed += 25;
      }
      if(e.keyCode == 99) { // c
        this.clear();
      }
    });
  },
  computed: {
    deg: { 
      get: function() {
        const bn_alpha = new Big(this.alpha);
        const bn1 = bn_alpha.mod(1);
        return bn1;
      },
      set: function(value) {
        // do nothing, just allow the value to be reset.
      }
    }
  },
  watch: {
    alpha: function(){
      this.clear();
    },
    speed: function(){
      if(this.drawerId == 0) return;
      this.pause();
      this.play();
    }
  }
});
