"use strict";

const url = document.getElementById("url");
const friendlyUrl = document.getElementById("friendly-url");
const alert = document.getElementById("alert");
const filePath = document.getElementById("filePath");
const linuxFilePath = document.getElementById("linuxFilePath");
const alertFilePath = document.getElementById("alertFilePath");

/*
 Create SLUG from a string
 This function rewrite the string prototype and also
 replace latin and other special characters.
 
 Forked by Gabriel Fróes - https://gist.github.com/gabrielfroes
 Original Author: Mathew Byrne - https://gist.github.com/mathewbyrne/1280286
 */
if (!String.prototype.slugify) {
    String.prototype.slugify = function () {

        return this.toString().toLowerCase()
                .replace(/[àÀáÁâÂãäÄÅåª]+/g, 'a')       // Special Characters #1
                .replace(/[èÈéÉêÊëË]+/g, 'e')       	// Special Characters #2
                .replace(/[ìÌíÍîÎïÏ]+/g, 'i')       	// Special Characters #3
                .replace(/[òÒóÓôÔõÕöÖº]+/g, 'o')       	// Special Characters #4
                .replace(/[ùÙúÚûÛüÜ]+/g, 'u')       	// Special Characters #5
                .replace(/[ýÝÿŸ]+/g, 'y')       		// Special Characters #6
                .replace(/[ñÑ]+/g, 'n')       			// Special Characters #7
                .replace(/[çÇ]+/g, 'c')       			// Special Characters #8
                .replace(/[ß]+/g, 'ss')       			// Special Characters #9
                .replace(/[Ææ]+/g, 'ae')       			// Special Characters #10
                .replace(/[Øøœ]+/g, 'oe')       		// Special Characters #11
                .replace(/[%]+/g, 'pct')       			// Special Characters #12
                .replace(/\s+/g, '-')           		// Replace spaces with -
                // .replace(/[^\w\-]+/g, '')       		// Remove all non-word chars
                .replace(/\-\-+/g, '-')         		// Replace multiple - with single -
                .replace(/^-+/, '')             		// Trim - from start of text
                .replace(/-+$/, '');            		// Trim - from end of text
    };
}

function switchSlash(filePathStr) {
    return filePathStr.toString()
            .replace(/\'/g, '')
            .replace(/\"/g, '')
            .replace(/^-+/, '')
            .replace(/-+$/, '')
            .replace(/\\+/g, '/');
}
;

url.addEventListener("focus", (el) => {
    url.select();
});

url.addEventListener("click", (el) => {
    url.select();
});

url.addEventListener("keyup", () => {
    let content = url.value.toLowerCase();
    friendlyUrl.innerText = content.slugify();
    alert.innerText = "";
});

friendlyUrl.addEventListener("click", () => {
    /*
     * https://dev.to/tqbit/how-to-use-javascript-to-copy-text-to-the-clipboard-2hi2
     *
     */
    const cb = navigator.clipboard;
    cb.writeText(friendlyUrl.innerText).then(() => {
        alert.innerText = "Texto copiado!";
    });
});

filePath.addEventListener("focus", () => {
    filePath.select();
});

filePath.addEventListener("click", () => {
    filePath.select();
});

filePath.addEventListener("keyup", () => {
    let content = filePath.value;
    linuxFilePath.innerText = switchSlash(content);
    alertFilePath.innerText = "";
});

linuxFilePath.addEventListener("click", () => {
    /*
     * https://dev.to/tqbit/how-to-use-javascript-to-copy-text-to-the-clipboard-2hi2
     *
     */
    const cb = navigator.clipboard;
    cb.writeText(linuxFilePath.innerText).then(() => {
        alertFilePath.innerText = "Texto copiado!";
    });
});