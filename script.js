//==================================
//IMPORTS
//==================================
import { getUserIds } from "./storage.js";
import { renderBookmarks } from "./view.js";

//==================================
// DOM elements
//==================================
const userSelect = document.getElementById("user-selection");

//==================================
//DROPDOWN
//==================================

function populateUserDropdown() {
  getUserIds().forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    userSelect.append(option);
  });
}

//==================================
//START-UP
//==================================
populateUserDropdown();
renderBookmarks(userSelect.value);

userSelect.addEventListener("change", () => renderBookmarks(userSelect.value));
