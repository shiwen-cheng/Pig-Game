'use strict';

// select elements
const players = [
  {
    playerEl: document.querySelector('.player--0'),
    score: 0,
    scoreEl: document.querySelector('#score--0'),
    curEl: document.getElementById('current--0'), // 比 querySelector 快一点
  },
  {
    playerEl: document.querySelector('.player--1'),
    score: 0,
    scoreEl: document.querySelector('#score--1'),
    curEl: document.getElementById('current--1'),
  },
];

const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Start conditions
let curUserNum, curScore, isPlaying;

const init = () => {
  curUserNum = 0;
  curScore = 0;
  isPlaying = true;
  players[curUserNum].playerEl.classList.add('player--active');

  for (const player of players) {
    player.score = 0;
    player.scoreEl.textContent = 0; // js 自动转换为 str
    player.curEl.textContent = 0;
    player.playerEl.classList.remove('player--winner');
  }

  diceImg.classList.add('hidden');
};

init();

function switchUser() {
  curScore = 0;
  players[curUserNum].curEl.textContent = 0;
  players[curUserNum].playerEl.classList.toggle('player--active');
  curUserNum = 1 - curUserNum;
  players[curUserNum].playerEl.classList.toggle('player--active'); // 如果有这个类，就删除；没有这个类就添加
}

// rolling dice func
btnRoll.addEventListener('click', () => {
  if (isPlaying) {
    let dice = Math.trunc(Math.random() * 6) + 1;

    diceImg.classList.remove('hidden');
    diceImg.src = `images/dice-${dice}.png`;

    if (dice !== 1) {
      curScore += dice;
      players[curUserNum].curEl.textContent = curScore;
    } else {
      switchUser();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (isPlaying) {
    players[curUserNum].score += curScore;
    players[curUserNum].scoreEl.textContent = players[curUserNum].score;
    if (players[curUserNum].scoreEl.textContent >= 100) {
      // win game !!!!
      isPlaying = false;
      diceImg.classList.add('hidden');
      players[curUserNum].playerEl.classList.add('player--winner');
      players[curUserNum].playerEl.classList.remove('player--active');
    } else switchUser();
  }
});

btnNew.addEventListener('click', init);
