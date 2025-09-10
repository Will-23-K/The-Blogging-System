    // public/js/app.js
import { generateSampleContent } from "./helpers.js";
import { initModals } from "./modal.js";
import { initNavigation } from "./navigation.js";
import { initUpload } from "./upload.js";

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  initNavigation();
  initModals();
  initUpload();
  generateSampleContent();
});


Start-Job { cd 'C:\Users\kekae\blog-app\postee-frontend'; npm start }