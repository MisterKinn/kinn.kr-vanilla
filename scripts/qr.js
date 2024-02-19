const textInput = document.querySelector(".text-input");
const copyButton = document.querySelector(".copyButton");
const downloadButton = document.querySelector(".downloadButton");

function generateQR() {
    const textInputValue = document.querySelector(".text-input").value;
    const result = document.querySelector("#result");
    if (textInputValue.trim() !== "") {
        result.innerHTML = ""; // Clear previous QR code

        // Generate new QR code
        new QRCode(result, {
            text: textInputValue,
            width: 128,
            height: 128,
        });
    } else {
        result.innerHTML = "";
        return;
    }
}

function downloadQR() {
    const qrCodeCanvas = document.querySelector("#result canvas");

    if (qrCodeCanvas) {
        // Trigger download
        const downloadLink = document.createElement("a");
        downloadLink.href = qrCodeCanvas.toDataURL();
        downloadLink.download = "qrcode.png";
        downloadLink.click();
    }
}

textInput.addEventListener("input", generateQR);
downloadButton.addEventListener("click", downloadQR);
