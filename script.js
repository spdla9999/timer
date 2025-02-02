var time = 0;
let timer;

function formatTime(value) {
    return String(value).padStart(2, '0');
}

function updateClock() {
    var time_sec = time % 60;
    var time_min = Math.floor(time / 60) % 60;
    var time_hour = Math.floor(time / 3600);
    
    document.getElementById("seconds").textContent = formatTime(time_sec);
    document.getElementById("minutes").textContent = formatTime(time_min);
    document.getElementById("hours").textContent = formatTime(time_hour);
}

function timeadd(time_tobeadded) {
    time += time_tobeadded;
    updateClock();
}


function resettime() {
    time = 0;
    updateClock()
}

function decreaseTime() {
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(() => {
        time--;
        updateClock();
        if (time <= 0) {
            clearInterval(timer);
            resettime();
        }
    }, 1000);
}

function disableButtons() {
    const addTimeBtns = document.querySelectorAll('.add_time');
    addTimeBtns.forEach(btn => {
        btn.disabled = true;
    });

    const reset_btn = document.getElementById("resettime");
        if (reset_btn) reset_btn.disabled = true;
}

function enableButtons() {
    const addTimeBtns = document.querySelectorAll('.add_time');
    addTimeBtns.forEach(btn => {
        btn.disabled = false;
    });

    const reset_btn = document.getElementById("resettime");
        if (reset_btn) reset_btn.disabled = false;
}

function disableStartButton() {
    const startBtn = document.getElementById('start');
    startBtn.disabled = true;
}

function enableStartButton() {
    const startBtn = document.getElementById('start');
    startBtn.disabled = false;
}

function start() {

    if (time <= 0) {
        disableStartButton();
        return;
    }

    const timeContainers = document.getElementsByClassName("set_time_container");

    disableButtons();

    for (var i = 0; i < timeContainers.length; i++) {
        timeContainers[i].classList.remove('shrink');
    }
    for (var i = 0; i < timeContainers.length; i++) {
    timeContainers[i].classList.add('expand');
    }

    const otherElements = document.querySelectorAll('body > *:not(.set_time_container)');
    otherElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transition = 'opacity 0.3s';
    });

    decreaseTime()

    setTimeout(function() {
    const exit_btn = document.createElement("button"); 
    exit_btn.id = "exit_btn"; 
    exit_btn.textContent = "나가기";
    exit_btn.classList.add("exit_btn");
    exit_btn.onclick = exit;
    document.body.appendChild(exit_btn);
    }, 1500)
    
}

function exit() {
    clearInterval(timer)

    const exit_btn = document.getElementById("exit_btn");
    exit_btn.remove();

    enableButtons();

    const timeContainers = document.getElementsByClassName("set_time_container");
    for (var i = 0; i < timeContainers.length; i++) {
        timeContainers[i].classList.remove('expand');
    }
    for (var i = 0; i < timeContainers.length; i++) {
        timeContainers[i].classList.add('shrink');
    }

    const otherElements = document.querySelectorAll('body > *:not(.set_time_container)');
    otherElements.forEach(element => {
    element.style.opacity = 1;
    element.style.transition = 'opacity 0.5s';
    });
}







document.getElementById("add5m").addEventListener("click", function() { timeadd(300); enableStartButton();});
document.getElementById("add10m").addEventListener("click", function() { timeadd(600); enableStartButton();});
document.getElementById("add15m").addEventListener("click", function() { timeadd(900); enableStartButton();});
document.getElementById("add30m").addEventListener("click", function() { timeadd(1800); enableStartButton();});
document.getElementById("add1h").addEventListener("click", function() { timeadd(3600); enableStartButton();});
document.getElementById("addself").addEventListener("click", function() { enableStartButton();});
document.getElementById("resettime").addEventListener("click", function() { resettime();});
document.getElementById("start").addEventListener("click", function() { start();});


updateClock(); 