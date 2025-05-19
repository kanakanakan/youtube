const imageVideoMap = {
    "acjapan.jpg": "zBqekh3glxA",
    "tikuwa.jpg": "jSTjJp1gjZ4",
    "topseika.jpeg": "q0T8T_Acz70",
    "afrac.jpg": "AeQpClPY8z4",
    "toshin.jpeg": "0mKEeqzqJtc"
};

const imagePaths = Object.keys(imageVideoMap); // ["acjapan.jpg", ...]

const reels = [
    document.querySelector("#reel1"),
    document.querySelector("#reel2"),
    document.querySelector("#reel3")
];

const startBtn = document.getElementById("startBtn");
const stopBtns = document.querySelectorAll(".stop-btn");
const resultMessage = document.getElementById("resultMessage");

let spinningIntervals = [null, null, null];
let stoppedReels = 0;

// ランダムな画像パスを返す
function getRandomImage() {
    const index = Math.floor(Math.random() * imagePaths.length);
    return imagePaths[index];
}

// スロット開始
startBtn.addEventListener("click", () => {
    resultMessage.textContent = "";
    stoppedReels = 0;

    startBtn.disabled = true; // ⛔ 連続押し防止：スタートボタンを無効にする

    reels.forEach((reel, index) => {
        const img = reel.querySelector(".slot-image");
        spinningIntervals[index] = setInterval(() => {
            img.src = `./image/${getRandomImage()}`;
        }, 100);
    });

    stopBtns.forEach(btn => btn.disabled = false);
});

// 個別にストップ
stopBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        if (spinningIntervals[index]) {
            clearInterval(spinningIntervals[index]);
            spinningIntervals[index] = null;
            stoppedReels++;

            btn.disabled = true;

            // 全て止まったら絵柄一致をチェック
            if (stoppedReels === reels.length) {
                startBtn.disabled = false; // ✅ すべて止まったのでスタート再有効化
                checkMatchAndPlayVideo();
            }
        }
    });
});
function checkMatchAndPlayVideo() {
    const images = reels.map(reel => reel.querySelector(".slot-image").src);
    const [base, ...rest] = images;

    // ファイル名だけ取り出す
    const baseFile = base.split("/").pop();
    const allMatch = rest.every(img => img.split("/").pop() === baseFile);

    if (allMatch) {
        const videoId = imageVideoMap[baseFile];
        if (videoId) {
            resultMessage.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        } else {
            resultMessage.textContent = "一致しましたが、対応動画が見つかりません。";
        }
    } else {
        resultMessage.textContent = "残念！絵柄が一致しませんでした。";
    }
}