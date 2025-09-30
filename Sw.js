navigator.serviceWorker.register("sw.js").then((reg) => {
  console.log("Service worker registered:", reg);
}).catch((err) => {
  console.error("Service worker registration failed:", err);
  document.getElementById("errorMessage").textContent = "Offline support may be limited.";
  document.getElementById("errorMessage").style.display = "block";
});
