
import AIIcon from "../assets/Frame.svg"
import GenerateIcon from "../assets/generate.svg";
import InsertIcon from "../assets/InsertIcon.png";
import regenetateIcon from "../assets/Regenerate.png"

export default defineContentScript({
  matches: ["*://www.linkedin.com/*"],
  main() {

    // Wait until the page is fully loaded
    window.addEventListener("load", () => {
      const observer = new MutationObserver(() => {
        const messageInput = document.querySelector(
          "div.msg-form__contenteditable"
        );

        if (messageInput) {
          setupFocusEvent(messageInput as HTMLElement);
          observer.disconnect(); // Stop observing once input is found
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    });
  },
});

// Function to handle focus event and inject the AI icon
function setupFocusEvent(inputElement: HTMLElement) {
   const icon = createAIIcon();
   let isClickInsideIcon = false;

   icon.addEventListener("mousedown", () => {
     isClickInsideIcon = true;
   });


    inputElement.addEventListener("focus", () => {
      icon.style.display = "block"; // Show the icon on focus
    });

    inputElement.addEventListener("blur",()=>{
      if(!isClickInsideIcon){
       icon.style.display = "none"; 
      }
      isClickInsideIcon = false;
    });
    inputElement.parentElement?.appendChild(icon);
}

const icon = document.createElement("img");
function createAIIcon(): HTMLImageElement {
  icon.src = AIIcon; 
  icon.style.width="30px"
  icon.style.height="30px"
  icon.style.position = "absolute";
  icon.style.right = "8px";
  icon.style.bottom = "8px";
  icon.style.cursor = "pointer";
  icon.style.display = "none";
  icon.title = "Use AI Writer";

  icon.addEventListener("click", () => {
    showModal();
  });

  return icon;
}

let overlay:HTMLDivElement | null = null;
let modal: HTMLDivElement| null = null;
const dummyResponse = `Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.`;

function showModal() {
  if (modal) {
    modal.remove(); // Remove the existing modal
  }
  if (overlay) {
    overlay.remove();
  }

  overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; // Semi-transparent dark background
  overlay.style.zIndex = "999";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  });

  modal = document.createElement("div");
  modal.style.position = "relative";
  modal.style.width = "32%";
  modal.style.minHeight = "120px";
  modal.style.borderRadius = "15px";
  modal.style.padding = "20px";
  modal.style.borderRadius = "10px";
  modal.style.fontFamily = "Arial, sans-serif";
  modal.style.color = "#333";
  modal.style.backgroundColor = "white";

  
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Your Prompt";
  input.style.width = "100%";
  input.style.padding = "10px";
  input.style.marginBottom = "10px";
  input.style.border = "1px solid #C1C7D0";
  input.style.borderRadius = "5px";
  input.style.flex = "1"; // Allow input to grow
  input.style.marginRight = "10px";

  // Response area (initially hidden)
  const responseWrapper = document.createElement("div");
  responseWrapper.style.display = "flex";
  responseWrapper.style.flexDirection = "column";
  responseWrapper.style.gap = "10px";
  responseWrapper.style.alignItems = "center";
  responseWrapper.style.marginBottom = "10px";
  responseWrapper.style.display = "none";
  responseWrapper.style.padding = "10px";
  responseWrapper.style.borderRadius = "5px";
  responseWrapper.style.fontSize = "14px";
  responseWrapper.style.color = "#333";
  responseWrapper.style.marginBottom = "10px";
  responseWrapper.style.width="100%"
  responseWrapper.style.minHeight = "80px";
  responseWrapper.style.flex = "1"; // Allow response to grow
 

  // Left SectionContainer - Generated Response
  const leftSection = document.createElement('div');
  leftSection.style.flex ='1';
  leftSection.style.backgroundColor = "#DBEAFE";
  leftSection.style.padding= "10px";
  leftSection.style.borderRadius = "5px";
  leftSection.style.fontSize="14px";
  leftSection.style.minHeight="70px"
  leftSection.style.color="#333"
  leftSection.style.width= "100%";
  leftSection.style.display= "flex";
  leftSection.style.justifyContent="flex-start"

  
  // leftSection content
  const leftSectionContent = document.createElement('div');
  leftSectionContent.innerText = "";


  // Right Section - Typed Input Text
  const rightSection = document.createElement('div');
  // rightSection.style.flex="1";
  rightSection.style.backgroundColor = "#F9FAFB";
  rightSection.style.width = "100%";
  rightSection.style.padding="10px";
  rightSection.style.fontSize="14px";
  rightSection.style.minHeight = "40px";
  rightSection.style.color="#333";
  rightSection.style.display="flex";
  rightSection.style.justifyContent="flex-end"

  // rightSection.style.width= "70%";
  rightSection.innerText = input.value;
  responseWrapper.appendChild(rightSection);
  responseWrapper.appendChild(leftSection);
  
  // Buttons Container
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "flex-end";
  buttonContainer.style.alignItems = "center";
  buttonContainer.style.gap = "10px";
  buttonContainer.style.marginTop = "10px";

  // generateButton element
  const generateButton = document.createElement("button");
  generateButton.innerHTML = `<span style="display: flex; align-items: center; gap: 8px;">
    <img src="${GenerateIcon}" alt="AI Icon" style="width: 16px; height: 16px;">
    <span>Generate</span>
  </span>`;
  generateButton.style.backgroundColor = "#3B82F6";
  generateButton.style.color = "#fff";
  generateButton.style.padding = "8px 20px";
  generateButton.style.border = "none";
  generateButton.style.borderRadius = "5px";
  generateButton.style.cursor = "pointer";
  generateButton.style.display = "flex";
  generateButton.style.alignItems = "center";
  generateButton.style.justifyContent = "flex-end";
  generateButton.disabled = true;
  generateButton.style.opacity = "0.6"; // Disabled state style
  generateButton.style.cursor = "not-allowed"; // Disable cursor

  // Insert button (initially hidden)
  const insertButton = document.createElement("button");
  insertButton.innerHTML = `<span style="display: flex; align-items: center; gap: 8px;">
    <img src="${InsertIcon}" alt=Insert Icon" style="width: 15px; height: 15px;">
    <span>Insert</span>
  </span>`;
  insertButton.style.backgroundColor = "transparent";
  insertButton.style.color = "#000";
  insertButton.style.padding = "8px 15px";
  insertButton.style.border = "none";
  insertButton.style.borderRadius = "5px";
  insertButton.style.cursor = "pointer";
  insertButton.style.display = "none"; // Hidden initially
  (insertButton.style.alignItems = "center"),
    (insertButton.style.justifyContent = "flex-end");
  insertButton.style.marginRight = "10px";
  insertButton.style.border = "1px solid #666D80";

  generateButton.addEventListener("click", () => {
    rightSection.innerText = input.value;
    leftSection.innerText =
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
    leftSection.style.display = "flex"; // Show the response
    responseWrapper.style.display = "flex";
    generateButton.innerHTML = `<span style="display: flex; align-items: center; gap: 8px;">
    <img src="${regenetateIcon}" alt=Insert Icon" style="width: 15px; height: 15px;">
    <span>ReGenerate</span>
  </span>`; // Change button text
    input.value = ""; // Clear the input field
    insertButton.style.display = "flex"; // Show Insert button
  });
 
 insertButton.addEventListener("click", () => {
   const messageInput = document.querySelector(
     "div.msg-form__contenteditable"
   ) as HTMLDivElement; // Cast to HTMLDivElement

   if (messageInput) {
     // Set the inner text of the LinkedIn input to the generated response
     messageInput.innerText = leftSection.innerText; // Use the generated text

     // Get the placeholder element
     const placeholder = document.querySelector(
       ".msg-form__placeholder.t-14.t-black--light.t-normal"
     ) as HTMLElement;

     // Check if input has text and hide the placeholder if it does
     if (messageInput.innerText.trim() !== "") {
       if (placeholder) {
         placeholder.style.display = "none"; // Hide the placeholder
       }
     } else {
       // Show the placeholder if the input is empty
       if (placeholder) {
         placeholder.style.display = "block"; // Show the placeholder
       }
     }
   }

   closeModal();
   // Clear input and response

   input.value = ""; // Clear the input field
   leftSection.innerText = ""; // Clear the left section text
   rightSection.innerText = ""; // Clear the right section text
   responseWrapper.style.display = "none"; // Hide the response wrapper
   generateButton.style.display = "flex"; // Show the generate button
   generateButton.innerText = "Generate"; // Reset button text
   insertButton.style.display = "none"; // Hide the insert button
   
 });

  input.addEventListener("input", () => {
    if (input.value.trim() === "") {
      generateButton.disabled = true;
      generateButton.style.opacity = "0.6"; // Disabled state style
      generateButton.style.cursor = "not-allowed"; // Disable cursor
    } else {
      generateButton.disabled = false;
      generateButton.style.opacity = "1"; // Enabled state style
      generateButton.style.cursor = "pointer"; // Default cursor
    }
  });

  // Append elements to the modal
  modal.appendChild(responseWrapper);
  modal.appendChild(input);
  buttonContainer.appendChild(insertButton);
  buttonContainer.appendChild(generateButton);
  modal.appendChild(buttonContainer);

  icon.style.display = "none";
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}


function closeModal() {
  modal?.remove();
  overlay?.remove();
  modal = null;
  overlay = null;
}
