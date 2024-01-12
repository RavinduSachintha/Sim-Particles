"use strict";(()=>{var v="#FFF",a={PARTICLE_COLOR:v,PARTICLE_SIZE:2};var c=class{constructor(t,e){this.vx=0;this.vy=0;this._x=t,this._y=e,this._visible=!0,this._bounce=!0}get x(){return this._x}set x(t){this._x=t}get y(){return this._y}set y(t){this._y=t}get visible(){return this._visible}set visible(t){this._visible=t}setPosition(t,e){this._x=t,this._y=e}setVelocity(t,e){this.vx=t,this.vy=e}calculatePosition(t,e){let n=this.x+this.vx,s=this.y+this.vy;this._bounce&&(n>t?(this._x=t,this.vx=-this.vx):n<0?(this._x=0,this.vx=-this.vx):this._x=n,s>e?(this._y=e,this.vy=-this.vy):s<0?(this._y=0,this.vy=-this.vy):this._y=s)}calculateVisibility(t,e){this._visible=this._x<=t&&this._x>=0&&this._y<=e&&this._y>=0}};var u=()=>(Math.random()-.5)*10;var o=class{constructor(){this.particles=[];this.state="stopped"}setCanvas(t){this.canvas=t}setContext(t){this.context=t}generate(t,e,n){for(let s=0;s<t;s++){let m=new c(e,n);m.setVelocity(u(),u()),this.particles.push(m)}}calculateAndDraw(){this.particles.forEach(t=>{t.calculatePosition(this.canvas.width,this.canvas.height),t.calculateVisibility(this.canvas.width,this.canvas.height)}),this.draw()}reset(){this.particles=[],this.state="stopped"}draw(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.particles.filter(t=>t.visible).forEach(t=>this.drawSingleParticle(t.x,t.y))}drawSingleParticle(t,e){this.context.beginPath(),this.context.arc(t,e,a.PARTICLE_SIZE,0,2*Math.PI),this.context.fillStyle=a.PARTICLE_COLOR,this.context.fill(),this.context.closePath()}};var d=document.getElementById("pc"),p=d.getContext("2d"),x=document.getElementById("emg-refresh"),r=document.getElementById("start"),h=document.getElementById("particle-count"),b=document.getElementById("particle-size"),i=new o,y=()=>{i.state="started",a.PARTICLE_SIZE=parseInt(b.value),h.disabled=!0,b.disabled=!0,i.generate(parseInt(h.value),300,300);let l=t=>{i.calculateAndDraw(),i.state==="started"&&window.requestAnimationFrame(l)};window.requestAnimationFrame(l)},_=()=>{h.disabled=!1,b.disabled=!1,i.reset()},g=()=>{p!=null&&(i.setCanvas(d),i.setContext(p)),x.addEventListener("click",()=>{window.location.reload()}),r.addEventListener("click",()=>{switch(i.state){case"stopped":y(),r.innerText="Stop Simulation",r.style.backgroundColor="#777777";break;case"started":_(),r.innerText="Start Simulation",r.style.backgroundColor="green";break;default:break}})};g();})();
