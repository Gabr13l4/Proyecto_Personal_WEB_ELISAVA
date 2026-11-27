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
const journalKey="in-common-journal-v1";
let journalEntries={};
try{journalEntries=JSON.parse(localStorage.getItem(journalKey)||"{}");}catch{journalEntries={};}
const sliderIds=["energy-range","weather-range","lightness-range","connection-range"];
const journalGrid=document.querySelector("#journal-grid"),journalNote=document.querySelector("#journal-note");
const journalStatus=document.querySelector("#journal-status"),journalTitle=document.querySelector("#journal-date-title");
const trackerFeedback=document.querySelector("#tracker-feedback");
const localDateString=(date=new Date())=>{const y=date.getFullYear(),m=String(date.getMonth()+1).padStart(2,"0"),d=String(date.getDate()).padStart(2,"0");return y+"-"+m+"-"+d;};
let journalDate=localDateString();
const reflections=["Taking things one breath at a time.","Making space for a slower moment.","You’re finding your balance.","There’s a little more room to breathe.","A bright moment is here."];
function persistJournal(){try{localStorage.setItem(journalKey,JSON.stringify(journalEntries));}catch{trackerFeedback.textContent="This browser could not save the entry. Check its storage settings.";}}
function updateZipper({save=true,feedback=false}={}){const vals=sliderIds.map(id=>Number(document.querySelector("#"+id).value));sliderIds.forEach(id=>document.querySelector("#"+id).nextElementSibling.value=document.querySelector("#"+id).value);const avg=vals.reduce((a,b)=>a+b,0)/vals.length,reflection=reflections[Math.round(avg)-1];document.querySelector("#zipper-pull").style.left=(12+(avg-1)*19)+"%";document.querySelector("#zipper-reading").textContent=reflection;journalEntries[journalDate]={...(journalEntries[journalDate]||{}),checkin:vals,reflection};if(save)persistJournal();if(feedback)trackerFeedback.textContent="Mood saved for "+new Date(journalDate+"T12:00:00").toLocaleDateString("en",{month:"long",day:"numeric"})+".";}
function loadJournalDate(date){journalDate=date;const entry=journalEntries[date]||{};journalNote.value=entry.note||"";journalTitle.textContent=new Date(date+"T12:00:00").toLocaleDateString("en",{month:"long",day:"numeric"})+(date===localDateString()?" · today":" · note");journalStatus.textContent=entry.reflection||"Select a day to add a note.";if(Array.isArray(entry.checkin)){sliderIds.forEach((id,index)=>document.querySelector("#"+id).value=entry.checkin[index]||3);updateZipper({save:false});}else{sliderIds.forEach(id=>document.querySelector("#"+id).value=3);updateZipper({save:false});document.querySelector("#zipper-reading").textContent="Your check-in will appear here.";document.querySelector("#zipper-pull").style.left="50%";}trackerFeedback.textContent=entry.checkin?"Saved in this browser.":"Changes save automatically in this browser.";renderCalendar();}
sliderIds.forEach(id=>document.querySelector("#"+id).addEventListener("input",()=>updateZipper({feedback:true})));
function renderCalendar(){const d=new Date(journalDate+"T12:00:00"),y=d.getFullYear(),m=d.getMonth(),offset=(new Date(y,m,1).getDay()+6)%7,days=new Date(y,m+1,0).getDate();journalGrid.replaceChildren();for(let i=0;i<offset;i++){const blank=document.createElement("span");blank.setAttribute("aria-hidden","true");journalGrid.append(blank);}for(let n=1;n<=days;n++){const date=localDateString(new Date(y,m,n)),button=document.createElement("button");button.type="button";button.textContent=n;button.setAttribute("aria-label",new Date(date+"T12:00:00").toLocaleDateString("en",{month:"long",day:"numeric"}));button.setAttribute("aria-pressed",String(date===journalDate));if(journalEntries[date]?.note||journalEntries[date]?.checkin)button.classList.add("has-entry");if(date===journalDate)button.classList.add("is-current");button.addEventListener("click",()=>loadJournalDate(date));journalGrid.append(button);}}
journalNote.addEventListener("input",event=>{journalEntries[journalDate]={...(journalEntries[journalDate]||{}),note:event.target.value};persistJournal();journalStatus.textContent=event.target.value?"Note saved in this browser.":"Select a day to add a note.";renderCalendar();});
document.querySelector("#save-checkin").addEventListener("click",()=>{updateZipper({feedback:true});renderCalendar();});
const medicationKey="in-common-medication-periods-v1";let medicationPeriods=JSON.parse(localStorage.getItem(medicationKey)||"[]");
function renderMedicationTimeline(){const container=document.querySelector("#med-history-list");container.replaceChildren();if(!medicationPeriods.length){const empty=document.createElement("p");empty.className="journal-status";empty.textContent="Your saved periods will appear here.";container.append(empty);return;}medicationPeriods.forEach(item=>{const entry=document.createElement("article");entry.className="med-entry";const title=document.createElement("b");title.textContent=item.name;const details=document.createElement("span");details.textContent=" · "+item.start+(item.end?" – "+item.end:" – ongoing")+" · "+item.dose+" · "+item.days.join(", ");entry.append(title,details);if(item.question){const note=document.createElement("div");note.textContent="Note: "+item.question;entry.append(note);}container.append(entry);});}
document.querySelector("#routine-form").addEventListener("submit",e=>{e.preventDefault();medicationPeriods.push({name:document.querySelector("#med-name").value.trim(),start:document.querySelector("#med-start").value,end:document.querySelector("#med-end").value,dose:document.querySelector("#med-dose").value.trim()||"As prescribed",days:[...document.querySelectorAll("[name=med-day]:checked")].map(x=>x.value),question:document.querySelector("#med-question").value.trim()});localStorage.setItem(medicationKey,JSON.stringify(medicationPeriods));renderMedicationTimeline();document.querySelector("#routine-feedback").textContent="Medication period saved in this browser.";e.currentTarget.reset();});
const wellbeingKey="in-common-wellbeing-v1";
let wellbeingLogs=[];try{wellbeingLogs=JSON.parse(localStorage.getItem(wellbeingKey)||"[]");if(!Array.isArray(wellbeingLogs))wellbeingLogs=[];}catch{wellbeingLogs=[];}
const wellbeingInputs=[...document.querySelectorAll(".med-score-grid input")],wellbeingNote=document.querySelector("#med-daily-note"),wellbeingHistory=document.querySelector("#wellbeing-history"),wellbeingFeedback=document.querySelector("#med-day-feedback");
function renderWellbeingHistory(){wellbeingHistory.replaceChildren();if(!wellbeingLogs.length){const empty=document.createElement("p");empty.className="journal-status";empty.textContent="Your saved daily logs will appear here.";wellbeingHistory.append(empty);return;}[...wellbeingLogs].sort((a,b)=>b.date.localeCompare(a.date)).forEach(log=>{const card=document.createElement("article");card.className="wellbeing-entry";const title=document.createElement("b");title.textContent=new Date(log.date+"T12:00:00").toLocaleDateString("en",{month:"long",day:"numeric",year:"numeric"});const scores=document.createElement("p");scores.textContent=wellbeingInputs.map(input=>input.id.replace("-score","")+": "+(log.scores?.[input.id]??"—")).join(" · ");card.append(title,scores);if(log.note){const note=document.createElement("p");note.textContent=log.note;card.append(note);}wellbeingHistory.append(card);});}
function saveWellbeingLog(feedback=false){const date=localDateString(),entry={date,scores:Object.fromEntries(wellbeingInputs.map(input=>[input.id,Number(input.value)])),note:wellbeingNote.value.trim()};const index=wellbeingLogs.findIndex(log=>log.date===date);if(index>=0)wellbeingLogs[index]=entry;else wellbeingLogs.push(entry);wellbeingLogs.sort((a,b)=>a.date.localeCompare(b.date));try{localStorage.setItem(wellbeingKey,JSON.stringify(wellbeingLogs));}catch{wellbeingFeedback.textContent="This browser could not save the log. Check its storage settings.";return;}renderWellbeingHistory();if(feedback)wellbeingFeedback.textContent="Today’s log saved in this browser.";}
const todayWellbeing=wellbeingLogs.find(log=>log.date===localDateString());if(todayWellbeing){wellbeingInputs.forEach(input=>{if(todayWellbeing.scores?.[input.id]!=null)input.value=todayWellbeing.scores[input.id];input.parentElement.querySelector("output").value=input.value;});wellbeingNote.value=todayWellbeing.note||"";wellbeingFeedback.textContent="Today’s log restored from this browser.";}else{wellbeingFeedback.textContent="Changes save automatically in this browser.";}
wellbeingInputs.forEach(input=>input.addEventListener("input",()=>saveWellbeingLog()));
wellbeingNote.addEventListener("input",()=>saveWellbeingLog());
document.querySelector("#save-med-day").addEventListener("click",()=>saveWellbeingLog(true));
renderWellbeingHistory();
renderMedicationTimeline();loadJournalDate(journalDate);

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



const mapStatus=document.querySelector("#place-status"),mapHint=document.querySelector("#map-hint"),mapResults=document.querySelector("#place-list"),mapCount=document.querySelector("#place-count"),mapSearchInput=document.querySelector("#place-search"),searchAreaButton=document.querySelector("#search-area"),placeFilters=[...document.querySelectorAll(".gf-place-filters .place-filter")];
let activePlaceFilter="all",mappedPlaces=[],placeMarkers=new Map(),overpassCache=new Map(),geocodeCache=new Map(),mapSearchController=null,isSearching=false,lastGeocodeAt=0;
const glutenMap=L.map("gluten-map",{worldCopyJump:true,minZoom:2,maxZoom:19,scrollWheelZoom:true}).setView([25,0],2);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(glutenMap);
const glutenMarkers=L.layerGroup().addTo(glutenMap);
function setMapStatus(message){mapStatus.textContent=message;mapHint.textContent=message;}
function tagType(tags){if(tags.amenity){const names={restaurant:"Restaurant",cafe:"Café",fast_food:"Fast food",food_court:"Food court",bakery:"Bakery",pub:"Pub"};return names[tags.amenity]||tags.amenity.replaceAll("_"," ");}if(tags.shop){const names={supermarket:"Supermarket",convenience:"Grocery shop",bakery:"Bakery",health_food:"Health food shop"};return names[tags.shop]||tags.shop.replaceAll("_"," ");}return "Food & drink";}
function gfLevel(value){if(value==="only")return "Dedicated gluten-free";if(value==="yes")return "Gluten-free options";if(value==="limited")return "Limited gluten-free options";return "Gluten-free information";}
function placeCoords(item){return item.type==="node"?[item.lat,item.lon]:item.center?[item.center.lat,item.center.lon]:null;}
function placeLabel(item){return item.tags?.["name:en"]||item.tags?.name||tagType(item.tags||{});}
function osmUrl(item){return "https://www.openstreetmap.org/"+encodeURIComponent(item.type)+"/"+encodeURIComponent(item.id);}
function filteredPlaces(){return mappedPlaces.filter(item=>{const tags=item.tags||{},gf=tags["diet:gluten_free"]||"";if(activePlaceFilter==="dedicated"&&gf!=="only")return false;if(activePlaceFilter==="dining"&&!tags.amenity)return false;if(activePlaceFilter==="shopping"&&!tags.shop)return false;return true;});}
function selectMapPlace(item){const id=item.type+"/"+item.id;mapResults.querySelectorAll(".place-card").forEach(card=>card.classList.toggle("is-selected",card.dataset.osmId===id));const marker=placeMarkers.get(id);if(marker){glutenMap.setView(marker.getLatLng(),Math.max(glutenMap.getZoom(),15));marker.openPopup();}}
function renderMappedPlaces(){glutenMarkers.clearLayers();placeMarkers.clear();mapResults.replaceChildren();const results=filteredPlaces();mapCount.textContent=results.length+" "+(results.length===1?"place":"places");if(!results.length){const empty=document.createElement("p");empty.className="place-empty";empty.textContent=mappedPlaces.length?"No places match these filters.":"Search an area to find places tagged with gluten-free options.";mapResults.append(empty);return;}results.forEach((item,index)=>{const tags=item.tags||{},coords=placeCoords(item);if(!coords)return;const id=item.type+"/"+item.id,gf=tags["diet:gluten_free"]||"",dedicated=gf==="only",name=placeLabel(item),kind=tagType(tags),marker=L.circleMarker(coords,{radius:dedicated?9:7,color:dedicated?"#ff8552":"#31263e",weight:3,fillColor:dedicated?"#ff8552":"#8765dd",fillOpacity:.9});const popup=document.createElement("div"),title=document.createElement("strong"),description=document.createElement("p"),link=document.createElement("a");title.textContent=name;description.textContent=kind+" · "+gfLevel(gf);link.href=osmUrl(item);link.target="_blank";link.rel="noopener";link.textContent="View OpenStreetMap entry ↗";popup.append(title,description,link);marker.bindPopup(popup);marker.addTo(glutenMarkers);placeMarkers.set(id,marker);marker.on("click",()=>{const card=mapResults.querySelector('[data-osm-id="'+CSS.escape(id)+'"]');mapResults.querySelectorAll(".place-card").forEach(other=>other.classList.toggle("is-selected",other===card));});const card=document.createElement("article");card.className="place-card";card.dataset.osmId=id;const button=document.createElement("button");button.type="button";button.className="place-select";const number=document.createElement("span");number.className="place-number";number.textContent=String(index+1).padStart(2,"0");const copy=document.createElement("span");copy.className="place-copy";const titleEl=document.createElement("b");titleEl.textContent=name;const subtitle=document.createElement("small");subtitle.textContent=kind;copy.append(titleEl,subtitle);const arrow=document.createElement("span");arrow.className="place-arrow";arrow.textContent="↗";button.append(number,copy,arrow);button.addEventListener("click",()=>selectMapPlace(item));const badge=document.createElement("span");badge.className="gf-tag-badge"+(dedicated?" is-dedicated":"");badge.textContent="✧ "+gfLevel(gf);const source=document.createElement("a");source.className="gf-osm-link";source.href=osmUrl(item);source.target="_blank";source.rel="noopener";source.textContent="View OpenStreetMap entry ↗";card.append(button,badge,source);mapResults.append(card);});}
async function searchGlutenFreeArea(){if(isSearching)return;if(glutenMap.getZoom()<6){setMapStatus("Zoom in closer to a city or neighborhood before searching for places.");return;}const bounds=glutenMap.getBounds(),south=Math.max(-85,bounds.getSouth()),west=bounds.getWest(),north=Math.min(85,bounds.getNorth()),east=bounds.getEast(),bbox=[south,west,north,east].map(v=>Number(v.toFixed(4))).join(","),cached=overpassCache.get(bbox);if(cached){mappedPlaces=cached;renderMappedPlaces();setMapStatus(mappedPlaces.length?"Showing mapped gluten-free options in this area.":"No gluten-free tags found here yet. Try another area.");return;}if(mapSearchController)mapSearchController.abort();mapSearchController=new AbortController();isSearching=true;searchAreaButton.disabled=true;searchAreaButton.textContent="Searching this area…";setMapStatus("Looking for mapped gluten-free options in this area…");const searchTimer=setTimeout(()=>mapSearchController?.abort(),25000);const query='[out:json][timeout:20];(nwr["diet:gluten_free"~"^(yes|only|limited)$"]('+bbox+'););out center tags;';try{const response=await fetch("https://overpass.private.coffee/api/interpreter",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:new URLSearchParams({data:query}),signal:mapSearchController.signal});if(!response.ok)throw new Error(response.status===429?"The map service is busy. Please wait a little and try again.":"The map service could not complete the search.");const data=await response.json();mappedPlaces=(data.elements||[]).filter(item=>placeCoords(item));overpassCache.set(bbox,mappedPlaces);renderMappedPlaces();setMapStatus(mappedPlaces.length?"Found "+mappedPlaces.length+" mapped gluten-free "+(mappedPlaces.length===1?"place":"places")+" in this area.":"No gluten-free tags found here yet. Try another area.");}catch(error){if(error.name==="AbortError")setMapStatus("The map search timed out. Please try again.");else setMapStatus(error.message||"Map data could not be loaded. Please try again.");}finally{clearTimeout(searchTimer);isSearching=false;searchAreaButton.disabled=false;searchAreaButton.innerHTML='Search this area <span aria-hidden="true">⌕</span>';}}
document.querySelector("#place-search-form").addEventListener("submit",async event=>{event.preventDefault();const query=mapSearchInput.value.trim();if(!query)return;let result=geocodeCache.get(query.toLowerCase());if(!result){const wait=Math.max(0,1000-(Date.now()-lastGeocodeAt));if(wait)await new Promise(resolve=>setTimeout(resolve,wait));lastGeocodeAt=Date.now();setMapStatus("Finding "+query+"…");try{const url="https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&accept-language=en&q="+encodeURIComponent(query);const response=await fetch(url,{headers:{Accept:"application/json"}});if(!response.ok)throw new Error("Place search is temporarily unavailable. Try panning the map instead.");const results=await response.json();if(!results.length){setMapStatus("No matching place found. Try another city or search the map directly.");return;}result=results[0];geocodeCache.set(query.toLowerCase(),result);}catch(error){setMapStatus(error.message||"Place search is temporarily unavailable.");return;}}const lat=Number(result.lat),lon=Number(result.lon),name=result.name||query;glutenMap.setView([lat,lon],13);setMapStatus("Searching around "+name+"…");searchGlutenFreeArea();});
searchAreaButton.addEventListener("click",searchGlutenFreeArea);
placeFilters.forEach(button=>button.addEventListener("click",()=>{activePlaceFilter=button.dataset.placeFilter;placeFilters.forEach(filter=>{const selected=filter===button;filter.classList.toggle("is-active",selected);filter.setAttribute("aria-pressed",String(selected));});renderMappedPlaces();}));
setTimeout(()=>glutenMap.invalidateSize(),150);

