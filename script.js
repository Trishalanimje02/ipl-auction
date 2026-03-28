// 💰 Budgets
let teamBudget = { RCB:20, MI:20, CSK:20, GT:20, SRH:20 };

// 🎨 Colors
let colors = { RCB:"red", MI:"blue", CSK:"gold", GT:"purple", SRH:"orange" };

// 🏷️ Logos

let logos = {
    RCB:"images/logos/rcb.png",
    MI:"images/logos/mi.png",
    CSK:"images/logos/csk.png",
    GT:"images/logos/gt.png",
    SRH:"images/logos/srh.png"
};

// 🏏 Players
let players = [
{ name:"Virat Kohli", image:"images/virat.jpg", team:"RCB"},
{ name:"Faf du Plessis", image:"images/faf.jpg", team:"RCB"},
{ name:"Maxwell", image:"images/maxwell.jpg", team:"RCB"},
{ name:"Siraj", image:"images/siraj.jpg", team:"RCB"},
{ name:"DK", image:"images/dk.jpg", team:"RCB"},

{ name:"Rohit Sharma", image:"images/rohit.jpg", team:"MI"},
{ name:"Surya", image:"images/sky.jpg", team:"MI"},
{ name:"Hardik", image:"images/hardik.jpg", team:"MI"},
{ name:"Bumrah", image:"images/bumrah.jpg", team:"MI"},
{ name:"Ishan", image:"images/ishan.jpg", team:"MI"},

{ name:"Dhoni", image:"images/dhoni.jpg", team:"CSK"},
{ name:"Ruturaj", image:"images/rutu.jpg", team:"CSK"},
{ name:"Jadeja", image:"images/jadeja.jpg", team:"CSK"},
{ name:"Shivam Dube", image:"images/dube.jpg", team:"CSK"},
{ name:"Deepak Chahar", image:"images/chahar.jpg", team:"CSK"},

{ name:"Gill", image:"images/gill.jpg", team:"GT"},
{ name:"Rashid", image:"images/rashid.jpg", team:"GT"},
{ name:"Shami", image:"images/shami.jpg", team:"GT"},
{ name:"Miller", image:"images/miller.jpg", team:"GT"},
{ name:"Saha", image:"images/saha.jpg", team:"GT"},

{ name:"Tripathi", image:"images/tripathi.jpg", team:"SRH"},
{ name:"Markram", image:"images/markram.jpg", team:"SRH"},
{ name:"Bhuvi", image:"images/bhuvi.jpg", team:"SRH"},
{ name:"Mayank", image:"images/mayank.jpg", team:"SRH"},
{ name:"Klaasen", image:"images/klaasen.jpg", team:"SRH"}
];

let currentPlayer = 0;
let price = 2;
let lastBidTeam = "";
let timer = 10;

let soldPlayers = [];
let interval;

// 🚀 LOAD AFTER PAGE READY
window.onload = function(){
    loadPlayer();
    updateBudgetUI();
};

// 🎯 LOAD PLAYER
function loadPlayer(){
    let p = players[currentPlayer];

    // UI effects
    document.querySelector(".left").style.background = colors[p.team];
    document.querySelector(".card").style.boxShadow = "0 0 20px " + colors[p.team];

    // Player info
    document.getElementById("playerName").innerText = p.name;
    document.getElementById("playerImg").src = p.image;

    document.getElementById("team").innerText = p.team;
    document.getElementById("team").style.color = colors[p.team];

    document.getElementById("teamLogo").src = logos[p.team];

    // Reset values
    price = 2;
    lastBidTeam = "";

    document.getElementById("price").innerText = price;
    document.getElementById("result").innerText = "";

    startTimer();
}

// ⏳ TIMER
function startTimer(){
    clearInterval(interval);
    timer = 10;

    document.getElementById("timer").innerText = timer;

    interval = setInterval(()=>{
        timer--;
        document.getElementById("timer").innerText = timer;

        if(timer <= 0){
            clearInterval(interval);

            if(lastBidTeam !== ""){
                if(teamBudget[lastBidTeam] >= price){

    let soldPlayer = players[currentPlayer]; // ✅ store player first

    teamBudget[lastBidTeam] -= price;
    updateBudgetUI();

    let msg = soldPlayer.name + 
              " sold to " + lastBidTeam + 
              " for ₹" + price + " Cr";

    soldPlayers.push(msg);

    addToTable(soldPlayer.name, lastBidTeam, price);

    // 🔥 EXACT PLACE TO REMOVE PLAYER
    players.splice(currentPlayer, 1);
    currentPlayer--;

    document.getElementById("result").innerText = "🏆 " + msg;
} else {
                    document.getElementById("result").innerText = "❌ Not enough budget!";
                }
            } else {
                document.getElementById("result").innerText = "❌ No bids placed!";
            }
        }
    },1000);
}

// 💰 BID
function manualBid(team){

    if(teamBudget[team] <= 0){
        document.getElementById("result").innerText = "❌ " + team + " has no money left!";
        return;
    }

    if(teamBudget[team] < price + 0.2){
        document.getElementById("result").innerText = "❌ Not enough budget!";
        return;
    }

    price += 0.2;
    price = parseFloat(price.toFixed(1));

    document.getElementById("price").innerText = price;

    lastBidTeam = team;

    document.getElementById("team").innerText = team;
    document.getElementById("team").style.color = colors[team];
    document.getElementById("teamLogo").src = logos[team];

    timer = 10;
}

function addToTable(player, team, price){
    let table = document.getElementById("soldTable");

    let row = table.insertRow(-1);

    // 🔥 ADD TEAM CLASS
    row.classList.add(team + "-row");

    let col1 = row.insertCell(0);
    let col2 = row.insertCell(1);
    let col3 = row.insertCell(2);
    let col4 = row.insertCell(3);

    col1.innerText = player;
    col2.innerText = team;
    col3.innerHTML = `<img src="${logos[team]}">`;
    col4.innerText = price;
}

// ⏭️ NEXT PLAYER
function nextPlayer(){

    if(players.length === 0){
        document.getElementById("result").innerText = "🎉 Auction Finished!";
        return;
    }

    currentPlayer++;

    if(currentPlayer >= players.length){
        currentPlayer = 0; // loop safely
    }

    loadPlayer();
}

// 🔍 SEARCH
function searchPlayer(){
    let val = document.getElementById("searchBox").value.toLowerCase();

    for(let i=0;i<players.length;i++){
        if(players[i].name.toLowerCase().includes(val)){
            currentPlayer = i;
            loadPlayer();
            return;
        }
    }
}
function updateBudgetUI(){
    document.getElementById("RCB-money").innerText = teamBudget.RCB;
    document.getElementById("MI-money").innerText = teamBudget.MI;
    document.getElementById("CSK-money").innerText = teamBudget.CSK;
    document.getElementById("GT-money").innerText = teamBudget.GT;
    document.getElementById("SRH-money").innerText = teamBudget.SRH;
}

// 🔄 RESET
function resetAuction(){
    location.reload();
}