var html_div = document.querySelector("#editor");
var css_div = document.querySelector("#editor2");
var js_div = document.querySelector("#editor3");

var editorContainer = document.getElementById('editor-container');
var result_sc = document.querySelector('#white-div');
var debounceTimer;

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
    "Make 'Monuments in Delhi' website in light blue theme. each card representing a monument with a description (take it from internet)",
    "Create an elegant and modern e-commerce website, list fashion accessories (take it from internet) with price of your choice. Include buttons for product wishlist, login/signup, shopping cart",
    "Make blue-white futuristic website: 'My portfolio' with: a short bio, hobbies, 5 sample ai projects of your choice, 10 skills.",
    "Design a visually appealing movie listing website featuring 6 actual top-rated movies with IMDb ratings (take it from internet) and actors.",
    "Make a modern website for a student portfolio form, with appropriate fields and corresponding form validation using proper js logic.",
    "Develop a dark theme website with 6 amazon products of your choice, with price and description",
    "Develop a light blue travel blog website showcasing travel destinations, itineraries, and travel tips.",
    "Design a modern, dynamic note taking website. Include working features such as adding, editing and removing notes by using proper js logic.",
    "Develop a dark theme modern fitness application enabling users to set fitness goals as text. Include option to mark goals as completed using proper js logic."
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

  //EXTRACTING PAGE TITLE
  let htmlstr=ace.edit(html_div).getValue(); 
  htmlstr=htmlstr.replaceAll('href="#', 'href="');
  var tempElement = document.createElement('div');
  tempElement.innerHTML = htmlstr;
  var title = tempElement.querySelector('title').innerText;

  link1.download = "GenZdev-"+title.replaceAll(" ","-")+".html";
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
  const jsDiv = document.querySelector("#editor3");
  const htmlDiv = document.querySelector("#editor");
  const cssDiv = document.querySelector("#editor2");
  const dash = document.getElementById("dash");
  
  // Toggle collapsed state
  const isCollapsed = jsDiv.style.visibility === "hidden";
  
  if (!isCollapsed) {
      // Collapse JS editor
      jsDiv.style.visibility = "hidden";
      jsDiv.style.height = "0";
      dash.textContent = "▼"; // Down arrow to indicate expand
      
      // Expand HTML and CSS editors
      htmlDiv.style.height = "15.7rem";
      cssDiv.style.height = "15.7rem";
  } else {
      // Restore all editors to default height
      jsDiv.style.visibility = "visible";
      jsDiv.style.height = "10.5rem";
      dash.textContent = "__"; // Original dash symbol
      
      htmlDiv.style.height = "10.5rem";
      cssDiv.style.height = "10.5rem";
  }
  
  // Force Ace editor resize to prevent display issues
  setTimeout(() => {
      ace.edit(htmlDiv).resize();
      ace.edit(cssDiv).resize();
      ace.edit(jsDiv).resize();
  }, 300);
});

// Function to display the info popup
function displayPopup(event) {
  var popup = document.getElementById("info-popup");
  popup.style.display = "block";
  event.stopPropagation(); // Prevent click event from propagating
}

function closePopup() {
  var popup = document.getElementById("info-popup");
  popup.style.display = "none";
}

// Function to close the info popup when anywhere on screen is clicked outside of the popup
function closePopupOnClickOutside(event) {
  var popup = document.getElementById("info-popup");
  var infoBtn = document.getElementById("info-btn");
  if (event.target !== popup && event.target !== infoBtn) {
    popup.style.display = "none";
  }
}

// Event listener for clicks anywhere on the document
document.addEventListener("click", closePopupOnClickOutside);
document.getElementById("info-btn").addEventListener("click", displayPopup);


// Function to run code
async function run() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    let htmlstr=ace.edit(html_div).getValue();
    htmlstr=htmlstr.replaceAll('href="#', 'href="');
    result_sc.srcdoc = `Loading Updated Preview..`;

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
    //setting title
    var tempElement = document.createElement('div');
    tempElement.innerHTML = htmlstr;
    
    var titleElement = tempElement.querySelector('title');
    var title = titleElement ? titleElement.innerText : "Default Title";  
    
    document.title = "GenZdev | " + title;
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
