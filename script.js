import { getUserIds } from "./storage.js";
//==================================
//section: dropdown
//==================================

function populateUserDropdown() {
  const userSelect = document.getElementById("user-selection");

  getUserIds().forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    userSelect.append(option);
  });
}

// ---------- START-UP ----------

populateUserDropdown();
