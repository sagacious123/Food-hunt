/**
 * jCircle - javascript library to generate circled images gallery or contents.
 * Version 1.0 - http://matar.online/jCircle
 *
 * Copyright 2017, salam aljehni ,(salamj@gmail.com), http://matar.online
 * License: Free for Personal and Learning.
 * Support 12$ Before Use in Commercial Projects To ((  aljehni@gmail.com   )).
**/
;(function(){
 this.jCircle=function(){
  var defaults = {
   container: 'circles-container',// Contains All Content, DIV ID
   circle: 'circle', // DIV That Contain Mini DIVs Circles ,Div ID
   mainContent:'main-circle-content', // Center Big Circle, DIV ID
   minCirclesClass: 'min-circle', // Class Name For Mini Circles DIVs
   minCircles: [], // For Internal Use, Array Of Mini Circles DIVs
   mainViewStyle: 'normal',// First Status, [normal | enlarge-view]
   animateCircles: true, //Animate Mini Circles?  [true | false]
   animateType: 'rotateAround', // Mini Circles Animation Type [rotateSelf]
  //  animateStatus: 'play',// Animation Statues [pause | play]
   speed: 3, // Animation Delay Time (speed) [Number Of Seconds]
   stopOnOverMain: true, //Stop Animation On Mouse Over Main Circle [true | false]
   stopOnOverMini: true, //Stop Animation On Mouse Over Any Mini Circle [true | false]
   minCirclesEffectOver: 'none', // Effect When Mouse Over Mini Circle  [pulse, zoomOutIn, flip, rotate]
   contentType: 'images', // Main Content Content Type [images | text]
   mainContentOverAction: 'normal',// Enlarge Center Area On Mouse Over 
   btnLeft: 'btn1',
   btnRight: 'btn2'
  //  btnLeft: newSlider.querySelector( '.circular-slider .wrapper .controls .controls__left' ),

  //       this.btnRight             = newSlider.querySelector( '.circular-slider .wrapper .controls .controls__right' );
  }
  
  if(arguments[0] && typeof arguments[0]==="object"){
   this.options=extendDefaults(defaults,arguments[0]);
  }else{
   this.options=defaults;
  }
  this.options.container=document.getElementById(this.options.container);
  this.options.circle=document.getElementById(this.options.circle);
  this.options.mainContent=document.getElementById(this.options.mainContent); 
  // this.options.btnLeft=document.getElementById(this.options.btnLeft);
  // this.options.btnRight=document.getElementById(this.options.btnRight);
  this.options.container.className=this.options.container.className+' circles-container';
  this.options.circle.className=this.options.circle.className+' circle';
  this.options.mainContent.className=this.options.mainContent.className+' main-circle-content';
  if(this.options.mainViewStyle=='enlarge-view')
    this.options.mainContent.className=this.options.mainContent.className+ ' enlarge-view';
  var mCircles=this.options.circle.getElementsByTagName('div');
  var j=0;
  for(var i=0;i<mCircles.length;i++){
   if(mCircles[i].getAttribute('data-inside')=='min-circle'){
    this.options.minCircles[j]=mCircles[i];
    j++;
   }
  }
  this.options.circleNumber=this.options.minCircles.length;
  if(this.options.contentType=='text')
   this.options.mainContentOverAction='enlarge-view';
  if(this.options.mainContentOverAction==='enlarge-view' ){
   this.options.mainContent.className=this.options.mainContent.className+ ' enlarge-main-circle-content';
  }
  if(this.options.animateCircles){
   var _=this;
   var animateTypes=['rotateAround','rotateSelf','fade'];
   for(var a in animateTypes){
    if(this.options.animateType==animateTypes[a]){
      // setNav();
      // console.log("okay");
     var animationRepeat;
    //  animationRepeat=setNav(this);
     var btnL = document.getElementById("btn1");
      var btnR = document.getElementById("btn2");
      setNav(this);
      // btnL.onclick = function () {
      //   animate(_,_.options.animateType); 
      // }
    //  animationRepeat=setInterval(animate,_.options.speed*1000,this,animateTypes[a]);
     if(_.options.stopOnOverMini){
      for(var i=0;i<this.options.circleNumber;i++){
       this.options.minCircles[i].addEventListener('mouseover',function(){
        _.options.animateStatus='pause';
       });
       this.options.minCircles[i].addEventListener('mouseout',function(){
           _.options.animateStatus='play';
       });
      }
     }
     break;
    }
   }
  }
  if(this.options.minCirclesEffectOver!='none'){
   var minCirclesEffects=['pulse','zoomOutIn','flip','rotate'];
   for(var a in minCirclesEffects){
    if(this.options.minCirclesEffectOver==minCirclesEffects[a]){
     var divs=this.options.minCircles;
     for(var i=0;i<divs.length;i++){
      divs[i].className=divs[i].className+' '+minCirclesEffects[a]
     }
    }
   }
  }
 }

 function extendDefaults(source,properties){
  for(var p in properties){
   if(properties.hasOwnProperty(p)){
    source[p]=properties[p];
   }
  }
  return source;
 }

 jCircle.prototype.create=function(){
  var circle=this;
  init.call(circle);
   window.addEventListener('resize',function(){
    init.call(circle);
   });
  
 }

 function getStyle(elem,name){
  if(elem.style[name])
   return elem.style[name];
  else if(elem.currentStyle)
   return elem.currentStyle[name];
  else if(document.defaultView && document.defaultView.getComputedStyle){
   var s=document.defaultView.getComputedStyle(elem,"");
   return s && s.getPropertyValue(name);
  }else{
   return null;
  }
 }
 function init(){
  var circle = this.options.circle;
  var container=this.options.container;
  var circleNumber=this.options.circleNumber;
  var mainContent=this.options.mainContent;
  var contentType=this.options.contentType;
  var _=this;
  if(circleNumber>0){
    var r=parseFloat(getStyle(circle,'width'))/2-2; 
   	var s=(2*Math.PI)/circleNumber;
    var l=s*r;
    var minCirclesR=(l-l*0.1)/2;
    var mainCircleR=parseFloat(getStyle(circle,'width'))-minCirclesR;
    container.style.margin=2*minCirclesR+'px auto';
    circle.style.height=parseFloat(getStyle(circle,'width'))+'px';
    container.style.height=parseFloat(getStyle(circle,'width'))+200+'px';
     mainContent.style.width=parseFloat(getStyle(circle,'width'))+'px';
     mainContent.style.height=parseFloat(getStyle(circle,'width'))+'px';
     if(this.options.contentType=='images'){
      mainContent.innerHTML='';
      var img = document.createElement('img');
      var caption = document.createElement('div');
      caption.className='caption';
      mainContent.appendChild(img);
      mainContent.appendChild(caption);
     }
     
     var mCircle;;
    for(var i=0;i<circleNumber;i++){
	    mCircle=this.options.minCircles[i];
	    var si=s*i;
	    var x=(r+1.4*minCirclesR)*Math.cos(si);
	    var y=(r+1.4*minCirclesR)*Math.sin(si);
	    var right=r-minCirclesR-x;
	    var top=r-minCirclesR-y;

	    mCircle.style.right=right+'px';
	    mCircle.style.top=top+'px';
	    mCircle.style.width=2*minCirclesR+'px';
	    mCircle.style.height=2*minCirclesR+'px';
    
	    mCircle.getElementsByTagName('a')[0].addEventListener('click',function(e){
	    	e.preventDefault();
	      
	      if(contentType=='images'){
	       img.setAttribute('src',this.getAttribute("href"));
	       if(this.parentNode.getElementsByTagName('div')[0])
	        caption=this.parentNode.getElementsByTagName('div')[0].innerHTML;
	      }
	      else if(contentType=='text'){
	       mainContent.innerHTML=this.parentNode.getElementsByTagName('div')[0].innerHTML;
	      }
	     });
     if(_.options.stopOnOverMain){
      mainContent.addEventListener('mouseover',function(){
       if(_.options.animateStatus=='play')
        _.options.animateStatus='pause';
      });
      mainContent.addEventListener('mouseout',function(){
       if(_.options.animateStatus=='pause')
        _.options.animateStatus='play';
     });
     }
    }
    if(this.options.contentType=='images'){
     mainContent.getElementsByTagName('img')[0].setAttribute('src',circle.getElementsByTagName('div')[0].getElementsByTagName('a')[0].getAttribute('href'));
     if(circle.getElementsByTagName('div')[0].getElementsByTagName('div')[0])
      caption.innerHTML=circle.getElementsByTagName('div')[0].getElementsByTagName('div')[0].innerHTML;
    }
    else if(this.options.contentType=='text')
     mainContent.innerHTML=circle.getElementsByTagName('div')[0].getElementsByTagName('div')[0].innerHTML;
    return _;
   }else{
    return null;
   }
 }
 function animate(elem,animateType){
  if(!elem.options.animateCircles || elem.options.animateStatus=='pause') return;
  var circle=elem.options.circle;
  var div=elem.options.minCircles;
  switch(animateType){
   case 'rotateAround':
     var topCircleNTH=0;
     var c1Top=getStyle(div[0],'bottom');
     var c1Right=getStyle(div[0],'left');
     for(var i=0;i<elem.options.circleNumber;i++){
         var j=i+1;
         if(i==elem.options.circleNumber-1){
          div[i].style.top=c1Top;
          div[i].style.right=c1Right;
         }else{
          div[i].style.top=getStyle(div[j],'bottom');
          div[i].style.right=getStyle(div[j],'left');
         }
         if(parseInt(getStyle(div[i],'right'))<=parseInt(getStyle(div[topCircleNTH],'right'))){
          topCircleNTH=i;
         } 
        //  else {
        //   topCircleNTH=j;
        //  }
       }
       if(elem.options.contentType=='images'){
        elem.options.mainContent.getElementsByTagName('img')[0].setAttribute('src',div[topCircleNTH].getElementsByTagName('a')[0].getAttribute('href'));
        if(div[topCircleNTH].getElementsByTagName('div')[0])
         elem.options.mainContent.getElementsByTagName('div')[0].innerHTML=div[topCircleNTH].getElementsByTagName('div')[0].innerHTML;
       }
       if(elem.options.contentType=='text')
        elem.options.mainContent.innerHTML=div[topCircleNTH].getElementsByTagName('div')[0].innerHTML;
    break;
   default:
    break;
  }
 }

 function setNav(elem) {
  var btnL = document.getElementById("btn1");
  var btnR = document.getElementById("btn2");
  
  btnL.onclick = function () {
    animate(elem,elem.options.animateType);  
  }
  btnR.onclick = function () {
    animate(elem,elem.options.animateType);  
  }
  // animate(this, this.animateType);
  // btnL.addEventListener("click", animate);
  // _this.options.btnLeft.onclick  = animate(this, rotateAround);
  // _this.options.btnRight.onclick = animate(this, rotateAround);

};
})();
