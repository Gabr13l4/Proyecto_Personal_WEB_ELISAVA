const modes = {
  celiac: {
    kicker: "CELIAC CARE",
    title: "Feel more sure about food.",
    copy: "Explore gluten-aware choices and notice how everyday food decisions fit into your bigger health picture.",
    action: "Explore celiac care", target: "#celiac",
    color: "coral",
  },
  both: {
    kicker: "THE OVERLAP",
    title: "See the bigger picture.",
    copy: "Make sense of shared symptoms, food choices, and the small details that connect your care.",
    action: "Explore the overlap", target: "#in-common",
    color: "coral",
  },
  hashimoto: {
    kicker: "HASHIMOTO’S CARE",
    title: "Find a rhythm that fits.",
    copy: "Bring symptoms, medication routines, and daily patterns into one clearer view.",
    action: "Explore Hashimoto’s care", target: "#hashimoto",
    color: "lavender",
  },
};

const modeButtons = document.querySelectorAll(".mode-button");
const modeKicker = document.querySelector("#mode-kicker");
const modeTitle = document.querySelector("#mode-title");
const modeCopy = document.querySelector("#mode-copy");
const modeLink = document.querySelector("#mode-link");

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const mode = modes[button.dataset.mode];
    if (!mode) return;

    modeButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    modeKicker.textContent = mode.kicker;
    modeTitle.textContent = mode.title;
    modeCopy.textContent = mode.copy;
    modeLink.textContent = mode.action;
    modeLink.append(document.createTextNode(" "));
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    modeLink.append(arrow);
    modeKicker.dataset.tone = mode.color; modeLink.href = mode.target; modeLink.click();
  });
});

const questionButton = document.querySelector("#question-button");
const researchQuestion = document.querySelector("#research-question");

questionButton.addEventListener("click", () => {
  const expanded = questionButton.getAttribute("aria-expanded") === "true";
  questionButton.setAttribute("aria-expanded", String(!expanded));
  researchQuestion.hidden = expanded;
  questionButton.querySelector("span").textContent = expanded ? "＋" : "−";
});

const toolTabs = [...document.querySelectorAll(".tool-tab")];
const toolPanels = [...document.querySelectorAll(".tool-panel")];

function selectTool(tool, moveFocus = false) {
  toolTabs.forEach((tab) => {
    const selected = tab.dataset.tool === tool;
    tab.classList.toggle("is-selected", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && moveFocus) tab.focus();
  });

  toolPanels.forEach((panel) => {
    panel.hidden = panel.dataset.panel !== tool;
  });
}

toolTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTool(tab.dataset.tool));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % toolTabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + toolTabs.length) % toolTabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = toolTabs.length - 1;
    selectTool(toolTabs[next].dataset.tool, true);
  });
});
selectTool("tracker");

document.querySelectorAll(".range-row input").forEach((range) => {
  range.addEventListener("input", () => {
    range.parentElement.querySelector("output").value = range.value;
  });
});

const moodButtons = [...document.querySelectorAll(".mood-option")]; let selectedMood = document.querySelector(".mood-option.is-selected")?.dataset.mood || "Okay"; moodButtons.forEach((button) => { button.addEventListener("click", () => { selectedMood = button.dataset.mood; moodButtons.forEach((item) => { const selected = item === button; item.classList.toggle("is-selected", selected); item.setAttribute("aria-pressed", String(selected)); }); }); }); document.querySelector("#save-checkin").addEventListener("click", () => {
  document.querySelector("#tracker-feedback").textContent = "Mood check-in noted as " + selectedMood + ". It stays on this page and isn’t stored.";
});

document.querySelector("#routine-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const medicationTime = document.querySelector("#med-time").value;
  const mealTime = document.querySelector("#meal-time").value;
  document.querySelector("#routine-feedback").textContent = `Routine noted for this visit: medication ${medicationTime}, first meal ${mealTime}. This prototype won’t send reminders.`;
});

const finderSearch = document.querySelector("#finder-search");
const finderCards = [...document.querySelectorAll(".finder-result")];
const finderEmpty = document.querySelector("#finder-empty");

finderSearch.addEventListener("input", () => {
  const query = finderSearch.value.trim().toLowerCase();
  let visibleCards = 0;
  finderCards.forEach((card) => {
    const contentMatches = card.textContent.toLowerCase().includes(query);
    const kindMatches = (query.includes("restaurant") && card.dataset.kind.includes("dining")) ||
      ((query.includes("product") || query.includes("shop")) && card.dataset.kind.includes("shopping"));
    const matches = !query || contentMatches || kindMatches;
    card.hidden = !matches;
    if (matches) visibleCards += 1;
  });
  finderEmpty.hidden = visibleCards > 0;
});

const threads = {
  symptoms: {
    kicker: "A SHARED SIGNAL",
    title: "Fatigue. Brain fog. More questions.",
    copy: "When energy or focus shifts, several parts of daily life can be worth looking at together. A pattern is a place to start a conversation, not a diagnosis.",
    prompt: "What changed around the same time I started feeling different?",
  },
  food: {
    kicker: "FOOD + DAILY LIFE",
    title: "Choices take more than a label.",
    copy: "Your project notes call for bringing dining and packaged-food questions into one place, so information is easier to review when you need it.",
    prompt: "How is this prepared, and what information can I verify before choosing?",
  },
  routine: {
    kicker: "MEDICATION + MEALS",
    title: "A routine can raise questions.",
    copy: "Your notes flag a possible overlap between levothyroxine timing and celiac-related absorption. Capture the routine you were given and questions for your clinician or pharmacist.",
    prompt: "Which timing instructions should I follow, and what should I discuss before changing anything?",
  },
};

const threadButtons = document.querySelectorAll(".thread-button");
threadButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const thread = threads[button.dataset.thread];
    if (!thread) return;

    threadButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    document.querySelector("#thread-kicker").textContent = thread.kicker;
    document.querySelector("#thread-title").textContent = thread.title;
    document.querySelector("#thread-copy").textContent = thread.copy;
    document.querySelector("#thread-prompt").textContent = thread.prompt; 
  });
});


const placeSearch = document.querySelector("#place-search"); const placeCards = [...document.querySelectorAll(".place-card")]; const placePins = [...document.querySelectorAll(".map-pin")]; const placeFilters = [...document.querySelectorAll(".place-filter")]; const placeEmpty = document.querySelector("#place-empty"); const placeCount = document.querySelector("#place-count"); let activePlaceFilter = "all"; function updatePlaces() { const query = placeSearch.value.trim().toLowerCase(); let visiblePlaces = 0; placeCards.forEach((card) => { const matchesQuery = !query || card.textContent.toLowerCase().includes(query); const matchesFilter = activePlaceFilter === "all" || card.dataset.kind === activePlaceFilter; const visible = matchesQuery && matchesFilter; card.hidden = !visible; const pin = placePins.find((item) => item.dataset.place === card.dataset.placeCard); if (pin) pin.hidden = !visible; if (visible) visiblePlaces += 1; }); placeCount.textContent = visiblePlaces + (visiblePlaces === 1 ? " example" : " examples"); placeEmpty.hidden = visiblePlaces > 0; } function selectPlace(placeId) { placeCards.forEach((card) => card.classList.toggle("is-selected", card.dataset.placeCard === placeId)); placePins.forEach((pin) => pin.classList.toggle("is-selected", pin.dataset.place === placeId)); } placeSearch.addEventListener("input", updatePlaces); placeFilters.forEach((button) => { button.addEventListener("click", () => { activePlaceFilter = button.dataset.placeFilter; placeFilters.forEach((item) => { const selected = item === button; item.classList.toggle("is-active", selected); item.setAttribute("aria-pressed", String(selected)); }); updatePlaces(); }); }); placePins.forEach((pin) => pin.addEventListener("click", () => selectPlace(pin.dataset.place))); document.querySelectorAll("[data-select-place]").forEach((button) => { button.addEventListener("click", () => selectPlace(button.dataset.selectPlace)); });
