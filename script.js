const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const curve = document.querySelector(".curve");
const textH = document.querySelector(".text h1")
const textBtn = document.querySelector(".text-con button");
var image = document.querySelectorAll(".img");
var nav = document.querySelector("ul");
var hamburger = document.querySelector(".cont");
var body = document.querySelector("body");
var l = 0;
var u = 0;
// const img = document.querySelectorAll("img");
const imgGroup = document.querySelector(".img-group");
var colors = [];
var images = ["images/plate1.png", "images/plate2.png", "images/plate3.png", "images/plate4.png", "images/plate5.png", "images/plate6.png"];

colors[0] = "#0444bf";
colors[1] = "purple";
colors[2] = "#33d5fd";
colors[3] = "tomato";
colors[4] = "#d47b8d";
colors[5] = "#c0334d";

btn1.addEventListener("click", function() {
    
    for(var j = 0; j < colors.length; j++) {
        for(var w = 0; w < images.length; w++) {
            var col = Math.floor(Math.random() * 6);
            addBgColor(col); 
        }
    }
})
btn2.addEventListener("click", function() {
    
    for(var j = 0; j < colors.length; j++) {
        for(var w = 0; w < images.length; w++) {
            var col = Math.floor(Math.random() * 6);
            addBgColor(col);
        } 
    }
})


hamburger.addEventListener("click", function () {
    nav.classList.toggle("change");
    this.classList.toggle("change");
})

function addBgColor(c) {
    curve.style.background = `linear-gradient(45deg, ${colors[c]}, ${colors[1]})`;
    btn1.style.background = `linear-gradient(45deg, ${colors[c]}, ${colors[1]})`;
    btn2.style.backgroundColor = colors[c];
    if(window.innerWidth <= 900) {
        nav.style.background = `linear-gradient(-155deg, ${colors[c]}, ${colors[1]})`;
    }
}