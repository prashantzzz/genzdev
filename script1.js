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

window.onload = function() {
  // List of website prompts
  var prompts = [
    "Make blue-white futuristic website: 'My portfolio' with: 5 sample ai projects of your choice, 10 skills, hobby and a short bio. every div block showing sub elements should have rounded border with shadow.",
    "Make beautiful 'monuments in delhi' website in deep blue and light blue theme. each card representing a monument must be of rounded corners and should be responsive to align themselves according to screen width.",
    "Design a visually appealing movie listing website featuring 5 actual top-rated movies with IMDb ratings (take it from internet) and actors. Ensure intuitive navigation, search, and responsive layout. Implement modern, rounded corner div styling with suitable fonts",
    "Make a modern website for a student portfolio form, with appropriate fields and corresponding form validation, the css should look attractive with rounded corners and colorful buttons",
    "Create an elegant e-commerce website selling 10 fashion accessories with a clean and modern design. Include features such as product categorization, user authentication, shopping cart",
    "Develop a colourful travel blog website showcasing travel destinations, itineraries, and travel tips. Implement a user-friendly interface with interactive maps, photo galleries, and social media sharing capabilities.",
    "Build a modern recipe sharing platform with ten recipies, allowing users to discover, share, and rate recipes. Include features such as recipe categorization, ingredient lists, cooking instructions. with css styling of rounded div and shadow",
    "Design a modern, dynamic note taking website for organizing and saving notes. Include features such as event scheduling, adding, editing and removing notes",
    "Develop a modern fitness tracking application enabling users to set fitness goals, track workouts, and monitor progress. Include features such as workout logging, activity tracking, and personalized recommendations."
];


  // Select a random prompt
  var randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

  // Insert the random prompt into the textarea
  document.getElementById('text-input').value = randomPrompt;
};

function toggleEditorContainer() {
  const editorContainer = document.querySelector('.editor-container');
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
