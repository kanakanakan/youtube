const slots = [document.getElementById('slot1'), document.getElementById('slot2'), document.getElementById('slot3')];
const symbols = ['🍎', '🍌', '🍇', '🍒', '🍊', '7']; // スロットに表示するシンボル
let slotTimers = [];
let isSpinning = [false, false, false]; // 各リールの状態を管理

// スロットを開始する関数
function startSlot() {
    document.getElementById('result').textContent = ''; // 結果をクリア

    for (let i = 0; i < slots.length; i++) {
        if (!isSpinning[i]) {
            isSpinning[i] = true;
            slotTimers[i] = setInterval(() => {
                slots[i].textContent = symbols[Math.floor(Math.random() * symbols.length)];
            }, 100); // スロットが高速で回転
        }
    }
}

// スロットを停止する関数（リールごと）
function stopSlot(reelIndex) {
    if (isSpinning[reelIndex]) {
        clearInterval(slotTimers[reelIndex]);
        isSpinning[reelIndex] = false;

        // 全てのリールが停止したら結果を判定
        if (!isSpinning.includes(true)) {
            checkResult();
        }
    }
}

// 結果の判定関数
function checkResult() {
    const result = slots.map(slot => slot.textContent);
    if (result[0] === result[1] && result[1] === result[2]) {
        document.getElementById('result').textContent = '大当たり！';
    } else {
        document.getElementById('result').textContent = '残念！';
    }
}

// イベントリスナーをボタンに追加
document.getElementById('startButton').addEventListener('click', startSlot);
document.getElementById('stopButton1').addEventListener('click', () => stopSlot(0));
document.getElementById('stopButton2').addEventListener('click', () => stopSlot(1));
document.getElementById('stopButton3').addEventListener('click', () => stopSlot(2));