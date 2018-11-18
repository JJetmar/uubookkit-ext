export let copyToClipBoard = (content) => {
    let textArea = document.createElement("textarea");
    textArea.innerHTML = content;
    document.body.appendChild(textArea);

    let range,
        selection;

    if (navigator.userAgent.match(/ipad|iphone/i)) {
        range = document.createRange();
        range.selectNodeContents(textArea);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, 999999);
    } else {
        textArea.select();
    }

    document.execCommand('copy');
    document.body.removeChild(textArea);
};

export let decodeSpecialChars = (input) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = input;
    return txt.value;
};