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

document.querySelectorAll(".range-row input, .med-score-grid input").forEach((range) => {
  range.addEventListener("input", () => { range.parentElement.querySelector("output").value = range.value; });
});
const journalKey="in-common-journal-v1", journalEntries=JSON.parse(localStorage.getItem(journalKey)||"{}");
let journalDate=new Date().toISOString().slice(0,10);
const reflections=["Taking things one breath at a time.","Making space for a slower moment.","You’re finding your balance.","There’s a little more room to breathe.","A bright moment is here."];
function updateZipper(){const ids=["energy-range","weather-range","lightness-range","connection-range"];const vals=ids.map(id=>Number(document.querySelector("#"+id).value));ids.forEach(id=>document.querySelector("#"+id).nextElementSibling.value=document.querySelector("#"+id).value);const avg=vals.reduce((a,b)=>a+b,0)/vals.length;document.querySelector("#zipper-pull").style.left=(12+(avg-1)*19)+"%";document.querySelector("#zipper-reading").textContent=reflections[Math.round(avg)-1];journalEntries[journalDate]={...(journalEntries[journalDate]||{}),checkin:vals,reflection:reflections[Math.round(avg)-1]};}
["energy-range","weather-range","lightness-range","connection-range"].forEach(id=>document.querySelector("#"+id).addEventListener("input",updateZipper));
function renderCalendar(){const grid=document.querySelector("#journal-grid"),d=new Date(journalDate+"T12:00:00"),y=d.getFullYear(),m=d.getMonth(),offset=(new Date(y,m,1).getDay()+6)%7,days=new Date(y,m+1,0).getDate();grid.replaceChildren();for(let i=0;i<offset;i++){const blank=document.createElement("span");blank.textContent="";grid.append(blank);}for(let n=1;n<=days;n++){const date=new Date(y,m,n).toISOString().slice(0,10),b=document.createElement("button");b.type="button";b.textContent=n;b.setAttribute("aria-label",new Date(date+"T12:00:00").toLocaleDateString(undefined,{month:"long",day:"numeric"}));if(journalEntries[date]?.note||journalEntries[date]?.checkin)b.classList.add("has-entry");if(date===journalDate)b.classList.add("is-current");b.addEventListener("click",()=>{journalDate=date;document.querySelector("#journal-note").value=journalEntries[date]?.note||"";document.querySelector("#journal-date-title").textContent=new Date(date+"T12:00:00").toLocaleDateString(undefined,{month:"long",day:"numeric"})+" note";document.querySelector("#journal-status").textContent=journalEntries[date]?.reflection||"Select a day to add a note.";renderCalendar();});grid.append(b);}}
document.querySelector("#journal-note").addEventListener("input",e=>{journalEntries[journalDate]={...(journalEntries[journalDate]||{}),note:e.target.value};localStorage.setItem(journalKey,JSON.stringify(journalEntries));renderCalendar();});
document.querySelector("#save-checkin").addEventListener("click",()=>{updateZipper();localStorage.setItem(journalKey,JSON.stringify(journalEntries));document.querySelector("#tracker-feedback").textContent="Check-in saved for today.";renderCalendar();});
const medicationKey="in-common-medication-periods-v1";let medicationPeriods=JSON.parse(localStorage.getItem(medicationKey)||"[]");
function renderMedicationTimeline(){const container=document.querySelector("#med-history-list");container.replaceChildren();if(!medicationPeriods.length){const empty=document.createElement("p");empty.className="journal-status";empty.textContent="Your saved periods will appear here.";container.append(empty);return;}medicationPeriods.forEach(item=>{const entry=document.createElement("article");entry.className="med-entry";const title=document.createElement("b");title.textContent=item.name;const details=document.createElement("span");details.textContent=" · "+item.start+(item.end?" – "+item.end:" – ongoing")+" · "+item.dose+" · "+item.days.join(", ");entry.append(title,details);if(item.question){const note=document.createElement("div");note.textContent="Note: "+item.question;entry.append(note);}container.append(entry);});}
document.querySelector("#routine-form").addEventListener("submit",e=>{e.preventDefault();medicationPeriods.push({name:document.querySelector("#med-name").value.trim(),start:document.querySelector("#med-start").value,end:document.querySelector("#med-end").value,dose:document.querySelector("#med-dose").value.trim()||"As prescribed",days:[...document.querySelectorAll("[name=med-day]:checked")].map(x=>x.value),question:document.querySelector("#med-question").value.trim()});localStorage.setItem(medicationKey,JSON.stringify(medicationPeriods));renderMedicationTimeline();document.querySelector("#routine-feedback").textContent="Medication period saved in this browser.";e.currentTarget.reset();});
document.querySelector("#save-med-day").addEventListener("click",()=>{const key="in-common-wellbeing-v1",logs=JSON.parse(localStorage.getItem(key)||"[]");logs.push({date:new Date().toISOString().slice(0,10),scores:Object.fromEntries([...document.querySelectorAll(".med-score-grid input")].map(x=>[x.id,Number(x.value)])),note:document.querySelector("#med-daily-note").value.trim()});localStorage.setItem(key,JSON.stringify(logs));document.querySelector("#med-day-feedback").textContent="Today’s log saved in this browser.";});
renderCalendar();updateZipper();renderMedicationTimeline();

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
