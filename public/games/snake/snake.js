(() => {
  const canvas = document.getElementById('snake');
  const ctx = canvas.getContext('2d');
  const size = 16, cols = canvas.width/size, rows = canvas.height/size;
  let snake = [{x:Math.floor(cols/2), y:Math.floor(rows/2)}];
  let dir = {x:1,y:0};
  let food = null; let running=false; let timer=null;

  function spawnFood(){
    let ok=false; let pos;
    while(!ok){ pos={x:Math.floor(Math.random()*cols), y:Math.floor(Math.random()*rows)}; ok=!snake.some(s=>s.x===pos.x && s.y===pos.y); }
    food=pos;
  }

  function draw(){
    ctx.fillStyle='#081220'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#6fe38a'; snake.forEach(s=> ctx.fillRect(s.x*size+1,s.y*size+1,size-2,size-2));
    if(food){ ctx.fillStyle='#ff7c7c'; ctx.fillRect(food.x*size+1,food.y*size+1,size-2,size-2); }
  }

  function step(){
    const head = {x:snake[0].x+dir.x, y:snake[0].y+dir.y};
    if(head.x<0||head.x>=cols||head.y<0||head.y>=rows || snake.some(s=>s.x===head.x && s.y===head.y)){ stop(); alert('Game over'); return; }
    snake.unshift(head);
    if(food && head.x===food.x && head.y===food.y){ spawnFood(); } else snake.pop();
    draw();
  }

  function start(){ stop(); snake=[{x:Math.floor(cols/2),y:Math.floor(rows/2)}]; dir={x:1,y:0}; spawnFood(); running=true; timer=setInterval(step,120); }
  function stop(){ running=false; if(timer) clearInterval(timer); timer=null; }

  document.addEventListener('keydown', e=>{
    if(e.key==='ArrowUp' && dir.y!==1) dir={x:0,y:-1};
    if(e.key==='ArrowDown' && dir.y!==-1) dir={x:0,y:1};
    if(e.key==='ArrowLeft' && dir.x!==1) dir={x:-1,y:0};
    if(e.key==='ArrowRight' && dir.x!==-1) dir={x:1,y:0};
  });

  document.getElementById('start').addEventListener('click', start);
  draw();
})();
