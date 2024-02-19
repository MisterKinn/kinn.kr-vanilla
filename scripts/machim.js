const support = document.querySelector(".support");
const invite = document.querySelector(".invite");
const support2 = document.querySelector(".support2");
const invite2 = document.querySelector(".invite2");

function runSupport() {
    window.open("https://discord.gg/ShqKtwyjgy", "_blank");
}

function runInvite() {
    window.open(
        "https://discord.com/oauth2/authorize?client_id=869998026083680336&permissions=8&scope=bot%20applications.commands",
        "_blank"
    );
}

support.addEventListener("click", runSupport);
invite.addEventListener("click", runInvite);
support2.addEventListener("click", runSupport);
invite2.addEventListener("click", runInvite);

const aboutMachim = document.querySelector(".about-machim");

function editAboutMachim() {
    if (window.innerWidth <= 1000) {
        aboutMachim.innerHTML =
            "<strong>.마침이</strong>는 <strong>Kinn</strong>이 개발한 Discord Bot 입니다. <br /><strong>.마침이</strong>는 당신의 Discord Server를 <strong>관리</strong>할 수 있으며, <br /><strong>유틸리티</strong> 기능 또한 있어 최고의<br />Discord Bot 사용 경험을 제공합니다. <br />다재다능한 Discord Bot, <strong>.마침이</strong>를<br />지금 당신의 서버에서 사용해보세요!";
    }
}

window.addEventListener("load", editAboutMachim);
window.addEventListener("resize", editAboutMachim);
