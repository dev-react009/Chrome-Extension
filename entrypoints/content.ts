
interface MessageRequest {
  action: string;
  text?: string; // Assuming `text` is optional, adjust as necessary
}
export default defineContentScript({
  matches: ["*://www.linkedin.com/*"],
  main() {
    // Create the AI icon element
    const aiIcon = document.createElement("div");
    aiIcon.innerHTML = `<img src="path/to/your/icon.svg" alt="AI Icon" class="ai-icon" />`;
    aiIcon.style.position = "absolute";
    aiIcon.style.zIndex = "1000";
    aiIcon.style.display = "none"; // Initially hidden

    document.body.appendChild(aiIcon);

    // Locate the LinkedIn message input field
    const messageInput = document.querySelector<HTMLInputElement>(
      'input[data-placeholder="Write a message..."]'
    );

    if (messageInput) {
      // Show the AI icon when the input field is focused
      messageInput.addEventListener("focus", () => {
        const rect = messageInput.getBoundingClientRect();
        aiIcon.style.top = `${rect.top + window.scrollY}px`;
        aiIcon.style.left = `${rect.right + window.scrollX + 10}px`; // Position next to input
        aiIcon.style.display = "block";
      });

      // Hide the AI icon when the input field loses focus
      messageInput.addEventListener("blur", () => {
        aiIcon.style.display = "none";
      });
    } else {
      console.error("Message input field not found.");
    }

    // Function to insert text into the input field
    const insertText = (text: string) => {
      if (messageInput) {
        const start = messageInput.selectionStart??0;
        const end = messageInput.selectionEnd??0;
        const currentValue = messageInput.value;
        messageInput.value =
          currentValue.slice(0, start) + text + currentValue.slice(end);
        messageInput.setSelectionRange(
          start + text.length,
          start + text.length
        );
      }
    };

    // Listen for messages from the popup to insert text
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === "insertText") {
        insertText(request.text);
      }
    });
  },
});
