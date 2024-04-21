let html_div = document.querySelector("#editor");
let css_div = document.querySelector("#editor2");
let js_div = document.querySelector("#editor3");
const result_sc = document.querySelector('#white-div');
let debounceTimer;

// Initialize Ace editors
ace.edit(css_div, {
  theme: "ace/theme/tomorrow_night",
  mode: "ace/mode/css",
});

ace.edit(html_div, {
  theme: "ace/theme/tomorrow_night",
  mode: "ace/mode/html",
});

ace.edit(js_div, {
  theme: "ace/theme/tomorrow_night",
  mode: "ace/mode/javascript",
});

function toggleEditorContainer() {
  const editorContainer = document.querySelector('.editor-container');
  const leftIcon = document.getElementById('leftIcon');
  const rightIcon = document.getElementById('rightIcon');
  
  const rightIcon = document.getElementById('whitediv');

  if (editorContainer.style.display === 'none') {
      editorContainer.style.display = 'block';
      leftIcon.style.display = 'block';
      rightIcon.style.display = 'none';
  } else {
      editorContainer.style.display = 'none';
      leftIcon.style.display = 'none';
      rightIcon.style.display = 'block';
  }
}


// Function to run code
async function run() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    // Storing data in Local Storage
    localStorage.setItem('htmlCode', ace.edit(html_div).getValue());
    localStorage.setItem('cssCode', ace.edit(css_div).getValue());
    localStorage.setItem('jsCode', ace.edit(js_div).getValue());

    // Executing HTML, CSS & JS code
    result_sc.srcdoc = `
      <style>${localStorage.getItem('cssCode')}</style>
      ${localStorage.getItem('htmlCode')}
      <script>${localStorage.getItem('jsCode')}</script>
    `;
  }, 500); // Adjust the delay time as needed (in milliseconds)
}

// Event listeners for input fields
html_div.addEventListener('keyup', run);
css_div.addEventListener('keyup', run);
js_div.addEventListener('keyup', run);

// Check if data is stored in Local Storage and populate the editors
if(localStorage.getItem('htmlCode'))
  ace.edit(html_div).setValue(localStorage.getItem('htmlCode'));

if(localStorage.getItem('cssCode'))
  ace.edit(css_div).setValue(localStorage.getItem('cssCode'));

if(localStorage.getItem('jsCode')) 
  ace.edit(js_div).setValue(localStorage.getItem('jsCode'));

// Initialize code execution
run();
