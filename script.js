let currentLang = "bn";
let darkMode = false;
let marketTotal = 0;
let calcTotal = 0;

// সংখ্যা বাংলায় রূপান্তর
function convertDigits(num) {
  if (currentLang === "bn") {
    const engToBn = { "0":"০","1":"১","2":"২","3":"৩","4":"৪","5":"৫","6":"৬","7":"৭","8":"৮","9":"৯" };
    return num.toString().replace(/[0-9]/g, d => engToBn[d]);
  }
  return num;
}

function toggleLanguage() {
  currentLang = currentLang === "bn" ? "en" : "bn";

  // মূল শিরোনাম
 // মেনু বাটন টেক্সট পরিবর্তন
// টাইটেল পরিবর্তন
document.getElementById("title").innerText = currentLang === "bn" 
  ? "🛒 বাজার ম্যানেজমেন্ট" 
  : "🛒 Market Management";


document.getElementById("menuMarketBtn").innerText = currentLang === "bn" 
? "🛒 বাজারের হিসাব" 
: "🛒 Market Record";

document.getElementById("menuCalcBtn").innerText = currentLang === "bn" 
? "🧮 দোকানের ক্যালকুলেটর" 
: "🧮 Shop Calculator";

// সেকশন শিরোনাম পরিবর্তন
document.getElementById("marketTitle").innerText = currentLang === "bn" 
? "🛒 বাজারের হিসাব" 
: "🛒 Market Record";

document.getElementById("calcTitle").innerText = currentLang === "bn" 
? "🧮  লিস্ট ক্যালকুলেটর" 
: "🧮  List Calculator";

// বাটন টেক্সট পরিবর্তন
document.getElementById("addMarketBtn").innerText = currentLang === "bn" ? "➕ সংযুক্ত করুন" : "➕ Add Item";
document.getElementById("clearMarketBtn").innerText = currentLang === "bn" ? "🗑️ সব মুছুন" : "🗑️ Clear All";
document.getElementById("addCalcBtn").innerText = currentLang === "bn" ? "➕ যোগ করুন" : "➕ Add";
document.getElementById("clearCalcBtn").innerText = currentLang === "bn" ? "🗑️ সব মুছুন" : "🗑️ Clear All";

  // placeholder পরিবর্তন
  document.getElementById("itemName").placeholder = currentLang === "bn" ? "জিনিসের নাম" : "Item Name";
  document.getElementById("pricePerKg").placeholder = currentLang === "bn" ? "প্রতি কেজি দাম" : "Price per Kg";
  document.getElementById("weight").placeholder = currentLang === "bn" ? "ওজন (গ্রাম)" : "Weight (gram)";
  document.getElementById("calcItem").placeholder = currentLang === "bn" ? "জিনিসের নাম" : "Item Name";
  document.getElementById("calcPrice").placeholder = currentLang === "bn" ? "দাম (টাকা)" : "Price (Taka)";

  // টোটাল লেবেল আপডেট
  document.getElementById("marketTotalLabel").innerHTML = currentLang === "bn" ? 
    `মোট খরচ: <span id="marketTotal">${convertDigits(marketTotal.toFixed(2))}</span> টাকা` : 
    `Total Cost: <span id="marketTotal">${marketTotal.toFixed(2)}</span> Taka`;

  document.getElementById("calcTotalLabel").innerHTML = currentLang === "bn" ? 
    `মোট যোগফল: <span id="calcTotal">${convertDigits(calcTotal.toFixed(2))}</span> টাকা` : 
    `Total Sum: <span id="calcTotal">${calcTotal.toFixed(2)}</span> Taka`;
}

function toggleDarkMode() {
  darkMode = !darkMode;
  document.body.classList.toggle("dark", darkMode);
}

function showSection(section) {
  document.getElementById("marketSection").classList.add("hidden");
  document.getElementById("calcSection").classList.add("hidden");
  if (section === "market") document.getElementById("marketSection").classList.remove("hidden");
  if (section === "calculator") document.getElementById("calcSection").classList.remove("hidden");
}

// বাজার ম্যানেজমেন্ট
function addMarketItem() {
  let name = document.getElementById("itemName").value;
  let price = parseFloat(document.getElementById("pricePerKg").value);
  let weight = parseFloat(document.getElementById("weight").value);

  if (!name || !price || !weight) {
    alert(currentLang === "bn" ? "সব তথ্য পূরণ করুন!" : "Please fill all fields!");
    return;
  }

  let unit = weight >= 1000 ? (currentLang === "bn" ? "কেজি" : "Kg") : (currentLang === "bn" ? "গ্রাম" : "Gram");
  let weightDisplay = weight >= 1000 ? (weight/1000).toFixed(2) : weight;
  let total = price * (weight/1000);

  marketTotal += total;

  document.getElementById("marketList").innerHTML += `
    <p>${name} ➡️ ${convertDigits(weightDisplay)} ${unit} ➡️ ${convertDigits(total.toFixed(2))} ${currentLang === "bn" ? "টাকা" : "Taka"}</p>
  `;
  document.getElementById("marketTotal").innerText = convertDigits(marketTotal.toFixed(2));

  document.getElementById("itemName").value = "";
  document.getElementById("pricePerKg").value = "";
  document.getElementById("weight").value = "";
}

function clearMarket() {
  document.getElementById("marketList").innerHTML = "";
  marketTotal = 0;
  document.getElementById("marketTotal").innerText = convertDigits("0");
}

// দোকানের ক্যালকুলেটর
function addCalcItem() {
  let name = document.getElementById("calcItem").value;
  let price = parseFloat(document.getElementById("calcPrice").value);

  if (!name || !price) {
    alert(currentLang === "bn" ? "সব তথ্য পূরণ করুন!" : "Please fill all fields!");
    return;
  }

  calcTotal += price;

  document.getElementById("calcList").innerHTML += `
    <p>${name} ➡️ ${convertDigits(price.toFixed(2))} ${currentLang === "bn" ? "টাকা" : "Taka"}</p>
  `;
  document.getElementById("calcTotal").innerText = convertDigits(calcTotal.toFixed(2));

  document.getElementById("calcItem").value = "";
  document.getElementById("calcPrice").value = "";
}

function clearCalc() {
  document.getElementById("calcList").innerHTML = "";
  calcTotal = 0;
  document.getElementById("calcTotal").innerText = convertDigits("0");
}
