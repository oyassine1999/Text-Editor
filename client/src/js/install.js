const butInstall = document.getElementById("buttonInstall");

let deferredPrompt;

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  // Show the install button
  butInstall.hidden = false;
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  if (deferredPrompt) {
    // Show the installation prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
    // Reset the deferredPrompt variable
    deferredPrompt = null;
    // Hide the install button
    butInstall.hidden = true;
  }
});

// Add a handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("App installed successfully");
});
