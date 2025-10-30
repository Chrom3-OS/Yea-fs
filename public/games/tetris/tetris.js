(() => {
  const canvas = document.getElementById('tetris');
  const ctx = canvas.getContext('2d');
  const COLS = 10, ROWS = 20, SIZE = 24;
  ctx.scale(SIZE, SIZE);

  function arenaCreate(w,h){
    const a = [];
    while(h--) a.push(new Array(w).fill(0));
    return a;
  }
  const arena = arenaCreate(COLS, ROWS);

  function collide(arena, player){
    const m = player.matrix, o = player.pos;
    for(let y=0;y<m.length;y++) for(let x=0;x<m[y].length;x++) if(m[y][x] && (arena[y+o.y] && arena[y+o.y][x+o.x])!==0) return true;
    return false;
  }

  function merge(arena, player){
    player.matrix.forEach((row,y)=> row.forEach((val,x)=>{ if(val) arena[y+player.pos.y][x+player.pos.x]=val; }));
  }

  function rotate(matrix, dir){
    for(let y=0;y<matrix.length;y++) for(let x=0;x<y;x++){ [matrix[x][y], matrix[y][x]]=[matrix[y][x], matrix[x][y]]; }
    if(dir>0) matrix.forEach(row=>row.reverse()); else matrix.reverse();
  }

  function playerReset(){
    const pieces = 'TJLOSZI';
    const type = pieces[(Math.random()*pieces.length)|0];
    player.matrix = createPiece(type);
    player.pos.y = 0; player.pos.x = (COLS/2|0) - (player.matrix[0].length/2|0);
    if(collider()){ arena.forEach(row=>row.fill(0)); }
  }

  function createPiece(type){
    switch(type){
      case 'T': return [[0,1,0],[1,1,1]];
      case 'O': return [[2,2],[2,2]];
      case 'L': return [[0,0,3],[3,3,3]];
      case 'J': return [[4,0,0],[4,4,4]];
      case 'I': return [[0,5,0,0],[0,5,0,0],[0,5,0,0],[0,5,0,0]];
      case 'S': return [[0,6,6],[6,6,0]];
      case 'Z': return [[7,7,0],[0,7,7]];
    }
  }

  function drawMatrix(matrix, offset){
    matrix.forEach((row,y)=> row.forEach((val,x)=>{ if(val){ ctx.fillStyle = ['','#FFB86B','#FFD86B','#FF7C7C','#6BE4FF','#9BFF6B','#C37BFF','#7BE4FF'][val] || '#fff'; ctx.fillRect(x+offset.x, y+offset.y,1,1); } }));
  }

  function draw(){
    ctx.fillStyle = '#050814'; ctx.fillRect(0,0,COLS,ROWS);
    drawMatrix(arena, {x:0,y:0});
    drawMatrix(player.matrix, player.pos);
  }

  function arenaSweep(){
    let rowCount=1;
    outer: for(let y=arena.length-1;y>=0;y--){
      for(let x=0;x<arena[y].length;x++) if(arena[y][x]===0) continue outer;
      const row = arena.splice(y,1)[0].fill(0);
      arena.unshift(row);
      y++;
      player.score += rowCount * 10; rowCount*=2;
    }
  }

  function update(time=0){
    const dt = time - lastTime; if(dt > dropInterval){ player.pos.y++; if(collider()){ player.pos.y--; merge(arena,player); arenaSweep(); playerReset(); } lastTime = time; }
    draw(); requestAnimationFrame(update);
  }

  function collider(){ return collide(arena, player); }

  const player = { pos:{x:0,y:0}, matrix:null, score:0 };
  let lastTime=0, dropInterval=800;

  document.addEventListener('keydown', e=>{
    if(e.key==='ArrowLeft'){ player.pos.x--; if(collider()) player.pos.x++; }
    else if(e.key==='ArrowRight'){ player.pos.x++; if(collider()) player.pos.x--; }
    else if(e.key==='ArrowDown'){ player.pos.y++; if(collider()){ player.pos.y--; merge(arena,player); arenaSweep(); playerReset(); } }
    else if(e.key===' '){ rotate(player.matrix,1); if(collider()){ rotate(player.matrix,-1); } }
  });

  document.getElementById('restart').addEventListener('click', ()=>{ arena.forEach(row=>row.fill(0)); player.score=0; playerReset(); });

  function init(){ playerReset(); requestAnimationFrame(update); }
  init();
})();
