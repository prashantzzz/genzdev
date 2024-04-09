const htmlCode = document.querySelector('.html-code textarea');
const cssCode = document.querySelector('.css-code textarea');
const jsCode = document.querySelector('.js-code textarea');
const result = document.querySelector('#result');

function run() {
    // Storing data in Local Storage
    localStorage.setItem('htmlCode', htmlCode.value);
    localStorage.setItem('cssCode', cssCode.value);
    localStorage.setItem('jsCode', jsCode.value);

    // Executing HTML, CSS & JS code
    result.contentDocument.body.innerHTML = `<style>${localStorage.cssCode}</style>` + localStorage.htmlCode;
    result.contentWindow.eval(localStorage.jsCode);
}

// Checking if user is typing anything in input field
htmlCode.onkeyup = () => run();
cssCode.onkeyup = () => run();
jsCode.onkeyup = () => run();

// Accessing data stored in Local Storage. To make it more advanced you could check if there is any data stored in Local Storage.
htmlCode.value = localStorage.htmlCode;
cssCode.value = localStorage.cssCode;
jsCode.value = localStorage.jsCode;
