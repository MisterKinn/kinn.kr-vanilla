const joinBtn = document.querySelector(".join");

function runJoinBtn() {
    alert("지금은 동아리 모집 기간이 아닙니다.");
    // window.open("https://kinn.kr/promise-join", "_blank");
}

joinBtn.addEventListener("click", runJoinBtn);

function replaceImage() {
    if (window.innerWidth <= 1000) {
        img.src = mobileImagePath;
    } else {
        img.src = orgnImagePath;
    }
}

window.addEventListener("load", replaceImage);
window.addEventListener("resize", replaceImage);

const title = document.querySelector(".title");
const subTitle = document.querySelector(".sub-title");

function editTitle() {
    if (window.innerWidth <= 1000) {
        title.innerHTML = "당신도 무언가를<br />상상해본 적이<br />있나요?";
        subTitle.innerHTML =
            "우리는 상상을 현실로 구현합니다.<br /><strong>Promise</strong>는 교내 유일<br />웹 개발 동아리입니다. <br /><strong>Promise</strong>와 함께라면<br />당신의 상상은 현실이 됩니다.";
    }
}

window.addEventListener("load", editTitle);
window.addEventListener("resize", editTitle);
