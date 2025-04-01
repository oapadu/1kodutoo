// Kujunda elektroonilise kella näide kasutades chatGPT-d(https://chat.openai.com/chat) vastavalt maitsele või kindlale teemale, mahutades kella täisekraanile, et saaks kasutada lauakella või ekraanisäästja asemel. Selleks, et see sobiks paljudele ekraanidele, kasuta kujunduse loomisel protsendilisi väärtusi (nt width: 100%; ) või nt võimalda kella suurust kasutajal muuta.

// Nõuded
// Veebirakendus töötab. Näitab kella, kuupäeva, nädalapäeva ja aastat.
// Vastavalt kasutaja tegevusele on võimalik muuta kuut lauakella atribuuti muuta.
// Kasutatud on eventListener'e ja funktsioone.
// Kell on originaalne ning kasutajaliides on maitsekalt kujundatud kasutades CSS-i.

// Atribuudid mida muuta, teksti ja tagaplaani värv, teksti font, teksti suurus, teksti asetus, võimalus muuta kell digitaalseks ja analoogseks.

// Lisa valik teksti või tausta värv teha muutlik rgb värv, mis liigub läbi kõikide värvide

// Lisa menüü tausta ja teksti rgb kiiruse muutmiseks

// Kas on võimalik teha nii, et kell oleks joonistatud samade värvidega, mis tekst, taust on läbipaistev ja iga tunni jaoks on eraldi joon

// Kas saab nii teha, et valikutemenuu oleks üleval vasakus nurgas ja neid saab minimize'ida nupust

// Menüü slaidereid ei ole näha, ainult slaideri liigutatav osa, kuidas muuta selle piirded teksti värvi?

// Fondi menüü taust on valge, fondi nimed ei ole näha

const clock = document.getElementById("clock");
const dateDiv = document.getElementById("date");
const textColor = document.getElementById("textColor");
const bgColor = document.getElementById("bgColor");
const textSize = document.getElementById("textSize");
const fontSelect = document.getElementById("font");
const toggleMode = document.getElementById("toggleMode");
const toggleRGBText = document.getElementById("toggleRGBText");
const toggleRGBBg = document.getElementById("toggleRGBBg");
const rgbTextSpeed = document.getElementById("rgbTextSpeed");
const rgbBgSpeed = document.getElementById("rgbBgSpeed");
const analogClock = document.getElementById("analogClock");
const ctx = analogClock.getContext("2d");
const settingsMenu = document.getElementById("settings");
const toggleSettingsButton = document.createElement("button");
toggleSettingsButton.id = "toggleSettings";
toggleSettingsButton.textContent = "⚙️";
document.body.appendChild(toggleSettingsButton);

toggleSettingsButton.addEventListener("click", () => {
    settingsMenu.classList.toggle("hidden");
});

let digitalMode = true;
let rgbTextActive = false;
let rgbBgActive = false;
let hue = 0;
let rgbTextInterval = 100;
let rgbBgInterval = 100;

function updateClock() {
    const now = new Date();
    clock.innerText = now.toLocaleTimeString("et-EE", { hour12: false }); // 24h formaat
    dateDiv.innerText = now.toLocaleDateString("et-EE", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    if (!digitalMode) drawAnalogClock(now);
    if (rgbTextActive) document.body.style.color = `hsl(${hue}, 100%, 50%)`;
    if (rgbBgActive) document.body.style.backgroundColor = `hsl(${hue}, 100%, 10%)`;
    hue = (hue + 1) % 360;
}

function drawAnalogClock(now) {
    const centerX = analogClock.width / 2;
    const centerY = analogClock.height / 2;
    const radius = centerX - 10;
    ctx.clearRect(0, 0, analogClock.width, analogClock.height);
    ctx.strokeStyle = textColor.value;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();

    for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6;
        const x1 = centerX + Math.cos(angle) * (radius - 10);
        const y1 = centerY + Math.sin(angle) * (radius - 10);
        const x2 = centerX + Math.cos(angle) * radius;
        const y2 = centerY + Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    drawHand(hours * 30 + minutes / 2, radius * 0.5, 6);
    drawHand(minutes * 6, radius * 0.75, 4);
    drawHand(seconds * 6, radius * 0.9, 2);
}

function drawHand(angle, length, width) {
    const centerX = analogClock.width / 2;
    const centerY = analogClock.height / 2;
    ctx.strokeStyle = textColor.value;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
        centerX + Math.cos((angle - 90) * (Math.PI / 180)) * length,
        centerY + Math.sin((angle - 90) * (Math.PI / 180)) * length
    );
    ctx.stroke();
}

textColor.addEventListener("input", () => {
    document.body.style.color = textColor.value;
});

bgColor.addEventListener("input", () => {
    document.body.style.backgroundColor = bgColor.value;
});

textSize.addEventListener("input", () => {
    clock.style.fontSize = `${textSize.value}vw`;
    dateDiv.style.fontSize = `${textSize.value / 2}vw`;
});

fontSelect.addEventListener("change", () => {
    document.body.style.fontFamily = fontSelect.value;
});

toggleMode.addEventListener("click", () => {
    digitalMode = !digitalMode;
    clock.style.display = digitalMode ? "block" : "none";
    analogClock.style.display = digitalMode ? "none" : "block";
});

toggleRGBText.addEventListener("click", () => {
    rgbTextActive = !rgbTextActive;
    toggleRGBText.innerText = rgbTextActive ? "RGB Tekst välja" : "RGB Tekst sisse";
});

toggleRGBBg.addEventListener("click", () => {
    rgbBgActive = !rgbBgActive;
    toggleRGBBg.innerText = rgbBgActive ? "RGB Taust välja" : "RGB Taust sisse";
});

rgbTextSpeed.addEventListener("input", () => {
    rgbTextInterval = 110 - rgbTextSpeed.value * 10;
});

rgbBgSpeed.addEventListener("input", () => {
    rgbBgInterval = 110 - rgbBgSpeed.value * 10;
});

setInterval(updateClock, 100);
updateClock();