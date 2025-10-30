(() => {
  const SIZE = 4;
  const gridEl = document.getElementById('grid');
  const scoreEl = document.getElementById('score');
  const newBtn = document.getElementById('new');
  let board = [];
  let score = 0;

  function init() {
    board = Array.from({length: SIZE}, () => Array(SIZE).fill(0));
    score = 0; renderScore();
    addRandom(); addRandom();
    render();
  }

  function renderScore(){ scoreEl.textContent = score }

  function addRandom(){
    const empties = [];
    for(let r=0;r<SIZE;r++) for(let c=0;c<SIZE;c++) if(!board[r][c]) empties.push([r,c]);
    if(!empties.length) return;
    const [r,c] = empties[Math.floor(Math.random()*empties.length)];
    board[r][c] = Math.random() < 0.9 ? 2 : 4;
  }

  function render(){
    gridEl.innerHTML = '';
    for(let r=0;r<SIZE;r++) for(let c=0;c<SIZE;c++){
      const v = board[r][c];
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.textContent = v || '';
      gridEl.appendChild(cell);
    }
  }

  function compress(row){
    const out = row.filter(x=>x);
    while(out.length<row.length) out.push(0);
    return out;
  }

  function merge(row){
    for(let i=0;i<row.length-1;i++){
      if(row[i] && row[i]===row[i+1]){ row[i]*=2; score+=row[i]; row.splice(i+1,1); row.push(0); }
    }
    return row;
  }

  function moveLeft(){
    let moved=false;
    for(let r=0;r<SIZE;r++){
      let row = board[r].slice();
      let compressed = compress(row);
      let merged = merge(compressed);
      merged = compress(merged);
      for(let c=0;c<SIZE;c++) if(board[r][c]!==merged[c]) moved=true;
      board[r]=merged;
    }
    return moved;
  }

  function rotateClock(){
    const m = Array.from({length:SIZE},()=>Array(SIZE).fill(0));
    for(let r=0;r<SIZE;r++) for(let c=0;c<SIZE;c++) m[c][SIZE-1-r]=board[r][c];
    board=m;
  }

  function move(dir){ // 0:left 1:up 2:right 3:down
    let moved=false;
    if(dir===0) moved = moveLeft();
    else if(dir===2){ rotateClock(); rotateClock(); moved = moveLeft(); rotateClock(); rotateClock(); }
    else if(dir===1){ rotateClock(); rotateClock(); rotateClock(); moved = moveLeft(); rotateClock(); }
    else if(dir===3){ rotateClock(); moved = moveLeft(); rotateClock(); rotateClock(); rotateClock(); }
    if(moved){ addRandom(); render(); renderScore(); checkGameOver(); }
  }

  function checkGameOver(){
    for(let r=0;r<SIZE;r++) for(let c=0;c<SIZE;c++) if(!board[r][c]) return;
    // check merges
    for(let r=0;r<SIZE;r++) for(let c=0;c<SIZE-1;c++) if(board[r][c]===board[r][c+1]) return;
    for(let c=0;c<SIZE;c++) for(let r=0;r<SIZE-1;r++) if(board[r][c]===board[r+1][c]) return;
    setTimeout(()=>alert('Game over — score: '+score),50);
  }

  window.addEventListener('keydown', e=>{
    if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){
      e.preventDefault();
      const map = {ArrowLeft:0, ArrowUp:1, ArrowRight:2, ArrowDown:3};
      move(map[e.key]);
    }
  });

  newBtn.addEventListener('click', init);
  init();
})();
