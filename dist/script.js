let beams = [];
let lights = [];
let dancerSwitch = true;
let dancer = document.getElementById("disco-ball");


let colors = ["#ff7979", "#686de0", "#badc58", "#f6e58d", "#ffbe76", "#e056fd", "#7ed6df", "#dff9fb"];

for(let x = 0; x < 8; x++){
  beams.push(document.getElementById("beam" + x));
}

function startParty(){
  document.body.style = "background: black; color: white; cursor: none !important;";
  document.getElementById("switch").style = "pointer-events:none;"
  document.getElementById("switch").innerText = "Night Party Mode Enabled!"
  createLights();
  update();
  
  window.addEventListener("mousemove", function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
    let dancerTransform = "";
    if(dancerSwitch){
      dancerTransform = "transform: scaleX(-1);";
    }
    dancer.style = `left: ${mouseX}px; top: ${mouseY}px; display: block; ${dancerTransform}`;
  });
  
  window.addEventListener("resize", remakeLights);
}

let mouseX = 0;
let mouseY = 0;

function update(){
  let time = Date.now()/2750;
  let xLoc = window.innerWidth/2;
  for(let z = 0; z < 8; z++){
    beams[z].style = `left: ${xLoc}px; 
                      top: -5px;
                      display: block;
                      transform-origin: top center;
                      background: white;
                      box-shadow: 0px 0px 30px 10px ${colors[z]}, 0px 0px 150px 10px ${colors[z]};
                      transform: rotate(${(time % 360) * 180 + (z*45)}deg)`;
  }
  
  window.requestAnimationFrame(update);
}

setInterval(shuffleArray, 1000, colors);

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function getLightStyle(x, y, color){
  return `left: ${x}px; top: ${y}px;
          box-shadow:
              0px 0px 10px 10px white,
              0px 0px 30px 30px ${color},
              0px 100px 100px 30px ${color};`;
}

function remakeLights(){
  for(let z = 0; z < lights.length; z++){
      lights[z].remove();
  }
  createLights();
}

function createLights(){
  let width = window.innerWidth;
  let height = window.innerHeight;
  
  for(let x = 0; x < width; x+= 150){
    let randomColor = colors[Math.floor(colors.length * Math.random())];
    let lightTop = document.createElement("div");
    lightTop.classList.add("bottom-light");
    lightTop.style = getLightStyle(x, 0, randomColor);
    
    let lightbottom = document.createElement("div");
    lightbottom.classList.add("bottom-light");
    lightbottom.style = getLightStyle(x, height-10, randomColor);
    
    lights.push(lightTop);
    lights.push(lightbottom);
    document.body.append(lightTop);
    document.body.append(lightbottom);
  }
  
  for(let y = 0; y < height; y += 150){
    let randomColor = colors[Math.floor(colors.length * Math.random())];
    let lightLeft = document.createElement("div");
    lightLeft.classList.add("bottom-light");
    lightLeft.style = getLightStyle(0, y, randomColor);
    
    let lightRight = document.createElement("div");
    lightRight.classList.add("bottom-light");
    lightRight.style = getLightStyle(width - 10, y, randomColor);
    
    lights.push(lightLeft);
    lights.push(lightRight);
    document.body.append(lightLeft);
    document.body.append(lightRight);
  }
}

setInterval(function(){
   dancerSwitch = !dancerSwitch;
}, 600);