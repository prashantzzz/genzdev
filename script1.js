let html_div = document.querySelector("#editor");
let css_div = document.querySelector("#editor2");
let js_div = document.querySelector("#editor3");
const editorContainer = document.getElementById('editor-container');
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

window.onload = function() {
  // List of website prompts
  var prompts = [
    "Make 'Monuments in Delhi' website in light blue theme. each card representing a monument with a description (take it from internet) must be of rounded corners and should be responsive",
    "Create an elegant and modern e-commerce website, list 4 fashion accessories (take it from internet) with price of your choice. Include features such as product wishlist, login/signup, shopping cart",
    "Make blue-white futuristic website: 'My portfolio' with: a short bio, hobbies, 5 sample ai projects of your choice, 10 skills. every div block showing sub elements should have rounded border with shadow.",
    "Design a visually appealing movie listing website featuring 6 actual top-rated movies with IMDb ratings (take it from internet) and actors. Implement modern, rounded corner div styling with suitable fonts",
    "Make a modern website for a student portfolio form, with appropriate fields and corresponding form validation using proper js logic. the css should look attractive with rounded corners and colorful buttons",
    "Develop a dark theme website with 5 amazon products of your choice, with price and description, Add a button to toggle between dark and light theme, when clicked the color should invert using js DOM",
    "Develop a light blue travel blog website showcasing travel destinations, itineraries, and travel tips. Implement a user-friendly interface with interactive maps, photo galleries, and social media sharing capabilities.",
    "make a coding platform with a sample question on the left side and a textarea to write code on the right side, add a separator between the two sides with the capability to resize the area alloted to left and right side by dragging the separator. Use js logic for the draggable separator.",
    "Design a modern, dynamic note taking website for organizing and saving notes. Include working features such as adding, editing and removing notes by using proper js logic. Add a feature to add the notes to google calendar",
    "Develop a dark theme modern fitness application enabling users to set fitness goals as text, and check progress in another card. Include option to mark goals as completed, and add diet recommendations by using proper js logic."
  ];

  // Select a random prompt
  var randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

  // Insert the random prompt into the textarea
  document.getElementById('text-input').value = randomPrompt;
};

function download() {
  // Get HTML, CSS, and JS code from the editors
  const htmlCode = ace.edit(html_div).getValue();
  const cssCode = ace.edit(css_div).getValue();
  const jsCode = ace.edit(js_div).getValue();

  // Create a Blob containing the code
  const combinedCode = `
      ${htmlCode}
      <style>${cssCode}</style>
      <script>${jsCode}</script>
  `;
  const blob = new Blob([combinedCode], { type: 'text/html' });

  // Create a download link and trigger download
  const link1 = document.createElement('a');
  link1.href = URL.createObjectURL(blob);
  link1.download = 'GenZdev-Website.html';
  document.body.appendChild(link1);
  link1.click();
  document.body.removeChild(link1);
}

function toggleEditorContainer() {
  const leftIcon = document.getElementById('leftIcon');
  const rightIcon = document.getElementById('rightIcon');

  if (editorContainer.style.display === 'none') {
      editorContainer.style.display = 'block';
      leftIcon.style.display = 'block';
      rightIcon.style.display = 'none';
      result_sc.style.width = '50vw';
  } else {
      editorContainer.style.display = 'none';
      leftIcon.style.display = 'none';
      rightIcon.style.display = 'block';
      result_sc.style.width = '100vw';
  }
  run();
}

document.getElementById("dash").addEventListener("click", function() {
  
  if (js_div.style.visibility == "hidden") {
      js_div.style.visibility = "visible";
      js_div.style.height = "10.5rem";  
      html_div.style.height="10.5rem"; 
      css_div.style.height="10.5rem"; 
  } else { 
      js_div.style.visibility = "hidden";
      js_div.style.height = "0rem"; 
      html_div.style.height="15.7rem";
      css_div.style.height="15.7rem"; 
  }
});


// Function to run code
async function run() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    let htmlstr=ace.edit(html_div).getValue();
    htmlstr=htmlstr.replaceAll('href="#', 'href="');
    // Storing data in Local Storage  
    localStorage.setItem('htmlCode', htmlstr);
    localStorage.setItem('cssCode', ace.edit(css_div).getValue());
    localStorage.setItem('jsCode', ace.edit(js_div).getValue());

    // Executing HTML, CSS & JS code
    result_sc.srcdoc = `
      <style>${localStorage.getItem('cssCode')}</style>
      ${localStorage.getItem('htmlCode')}
      <script>${localStorage.getItem('jsCode')}</script>
    `;
  }, 1000); // Adjust the delay time as needed (in milliseconds)
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
