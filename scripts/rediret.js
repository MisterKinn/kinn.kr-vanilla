const inappdeny_exec_vanillajs = (callback) => {
    if (document.readyState != "loading") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
};

inappdeny_exec_vanillajs(() => {
    const useragt = navigator.userAgent.toLowerCase();
    const target_url = location.href;

    if (useragt.match(/kakaotalk/i)) {
        //KakaoTalk External Brower
        location.href =
            "kakaotalk://web/openExternal?url=" +
            encodeURIComponent(target_url);
    } else if (
        useragt.match(
            /inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|SamsungBrowser\/[^1]/i
        )
    ) {
        if (useragt.match(/iphone|ipad|ipod/i)) {
            // iOS, iPadOS User
            alert(
                "You're using In-App Brower.\nTo use all function of website,\nYou should use External Brower."
            );
        } else {
            //Android User
            location.href =
                "intent://" +
                target_url.replace(/https?:\/\//i, "") +
                "#Intent;scheme=http;package=com.android.chrome;end";
        }
    }
});
