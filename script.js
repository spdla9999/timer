var time = 0;
let timer;
var input = "";
var time_temp = 0;
var time_temp_sec = 0;
var time_temp_min = 0;
var time_temp_hour = 0;
var now = 'add';

function formatTime(value) {
    return String(value).padStart(2, '0');
}

function updateClock() {
    const time_absoluteValue = Math.abs(time)
    var time_sec = time_absoluteValue % 60;
    var time_min = Math.floor(time_absoluteValue / 60) % 60;
    var time_hour = Math.floor(time_absoluteValue / 3600);
    document.getElementById("seconds").textContent = formatTime(time_sec);
    document.getElementById("minutes").textContent = formatTime(time_min);
    document.getElementById("hours").textContent = formatTime(time_hour);
}

function disableTimeAddButtons() {
    const timeAddBtns = ['add1h', 'add30m', 'add15m', 'add10m', 'add5m'];
    timeAddBtns.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.disabled = true;
        }
    });
}

function enableTimeAddButtons() {
    const timeAddBtns = ['add1h', 'add30m', 'add15m', 'add10m', 'add5m'];
    timeAddBtns.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.disabled = false;
        }
    });
}

function timeadd(time_tobeadded) {
    time += time_tobeadded;
    updateClock();
}

function addself_start() {
    reset();
    now = 'self';
    disableTimeAddButtons();
    document.addEventListener('keydown', addself_keyhandler);
}

function addself_keyhandler(event) {
    const pressed_key = event.key;
    if (!isNaN(pressed_key)) {
        input += pressed_key;
    }
    else if (pressed_key === "Backspace") {
        input = input.slice(0, -1);
    }
    if (input.length === 7) {
        input = input.slice(1);
    }
    enableStartButton();
    input_display();
    input_to_time();
}

function input_display() {
    const len = input.length;
    if (len === 0) {
        time_temp_sec = 0;
        time_temp_min = 0;
        time_temp_hour = 0;
    }
    else if (len === 1) {
        time_temp_sec = parseInt(input);
        time_temp_min = 0;
        time_temp_hour = 0;
    }
    else if (len === 2) {
        time_temp_sec = parseInt(input);
        time_temp_min = 0;
        time_temp_hour = 0;
    }
    else if (len === 3) {
        time_temp_sec = parseInt(input.slice(-2));
        time_temp_min = parseInt(input.slice(0, 1));
        time_temp_hour = 0;
    }
    else if (len === 4) {
        time_temp_sec = parseInt(input.slice(-2));
        time_temp_min = parseInt(input.slice(-4, -2));
        time_temp_hour = 0;
    }
    else if (len === 5) {
        time_temp_sec = parseInt(input.slice(-2));
        time_temp_min = parseInt(input.slice(-4, -2));
        time_temp_hour = parseInt(input.slice(0, 1));
    }
    else if (len === 6) {
        time_temp_sec = parseInt(input.slice(-2));
        time_temp_min = parseInt(input.slice(-4, -2));
        time_temp_hour = parseInt(input.slice(-6, -4));
    }

    document.getElementById("seconds").textContent = formatTime(time_temp_sec);
    document.getElementById("minutes").textContent = formatTime(time_temp_min);
    document.getElementById("hours").textContent = formatTime(time_temp_hour);
}

function input_to_time() {
    const len = input.length;
    if (len === 0) {
        time_temp = 0;
    }
    else if (len === 1) {
        time_temp = parseInt(input);
    }
    else if (len === 2) {
        time_temp = parseInt(input);
    }
    else if (len === 3) {
        time_temp = parseInt(input.slice(-2)) + (60 * parseInt(input.slice(0, 1)));
    }
    else if (len === 4) {
        time_temp = parseInt(input.slice(-2)) + (60 * parseInt(input.slice(-4, -2)));
    }
    else if (len === 5) {
        time_temp = parseInt(input.slice(-2)) + (60 * parseInt(input.slice(-4, -2))) + (3600 * parseInt(input.slice(0, 1)));
    }
    else if (len === 6) {
        time_temp = parseInt(input.slice(-2)) + (60 * parseInt(input.slice(-4, -2))) + (3600 * parseInt(input.slice(-6, -4)));
    }
}

function reset() {
    time = 0;
    input = "";
    time_temp = 0;
    time_temp_sec = 0;
    time_temp_min = 0;
    time_temp_hour = 0;
    enableTimeAddButtons();
    now = 'add';
    updateClock();
}

function decreaseTime() {
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(() => {
        time--;
        istimeend();
        updateClock();
    }, 1000);
}

function decreaseTime_minus() {
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(() => {
        time--;
        updateClock();
    }, 1000);
}

function canstart() {
    if (time === 0 && time_temp === 0) {
        return false;
    }
    else if (time_temp_sec >= 60 || time_temp_min >= 60 || time_temp_hour >= 60) {
        return false;
    }
    else {
        return true;
    }
}

function istimeend() {
    if (time <= 0) {
        clearInterval(timer);

        const endtext = document.getElementById("title_end")
        endtext.style.opacity = 1;
        endtext.style.transition = 'opacity 1s';

        const clock = document.querySelectorAll(".set_time_container")
        clock.forEach(element => {
            element.style.color = "red";
            element.style.transition = "color, 0.3s";
        })

        setTimeout(() => {
            const minus_symbol = document.getElementById("minus_symbol");
            minus_symbol.style.opacity = 1;
        }, 1000);

        decreaseTime_minus()
    }
}

function disableButtons() {
    const addTimeBtns = document.querySelectorAll('.add_time');
    addTimeBtns.forEach(btn => {
        btn.disabled = true;
    });

    const start_btn = document.getElementById("start")
    start_btn.style.opacity = 0;

    const reset_btn = document.getElementById("resettime");
    reset_btn.disabled = true;
}

function enableButtons() {
    const addTimeBtns = document.querySelectorAll('.add_time');
    addTimeBtns.forEach(btn => {
        btn.disabled = false;
    });

    const start_btn = document.getElementById("start")
    start_btn.style.opacity = 1;

    const reset_btn = document.getElementById("resettime");
    reset_btn.disabled = false;
}

function disableStartButton() {
    const startBtn = document.getElementById('start');
    startBtn.disabled = true;
}

function enableStartButton() {
    const startBtn = document.getElementById('start');
    startBtn.disabled = false;
}

function focus_on_clock() {
    const timeContainers = document.getElementsByClassName("set_time_container");
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
}

function start() {
    if (!canstart()) {
        disableStartButton();
        return;
    }
    if (now === 'self') {
        time = time_temp;
    }
  

    document.removeEventListener("keydown", addself_keyhandler);
    disableButtons();
    focus_on_clock();
    decreaseTime();

    setTimeout(function() {
        const element = document.getElementById("exit_btn");
        if (!element) {
        const exit_btn = document.createElement("button"); 
        exit_btn.id = "exit_btn"; 
        exit_btn.textContent = "나가기";
        exit_btn.classList.add("exit_btn");
        exit_btn.onclick = exit;
        document.body.appendChild(exit_btn);
    }}, 1500)
}

function exit() {
    clearInterval(timer)

    if (time < 0) {
        time = 0;
        const minus_symbol = document.getElementById("minus_symbol")
        minus_symbol.style.opacity = 0;
    }
    updateClock();

    const exit_btn = document.getElementById("exit_btn");
    exit_btn.remove();

    const clock = document.querySelectorAll(".set_time_container")
        clock.forEach(element => {
            element.style.color = "#fff";
        })

    now = 'add';

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

    const endtext = document.getElementById("title_end")
    endtext.style.opacity = 0;
    endtext.style.transition = 'opacity 0.3s';
    });
}

function startup_settings() {
    document.getElementById("add5m").addEventListener("click", function() { timeadd(300); enableStartButton();});
    document.getElementById("add10m").addEventListener("click", function() { timeadd(600); enableStartButton();});
    document.getElementById("add15m").addEventListener("click", function() { timeadd(900); enableStartButton();});
    document.getElementById("add30m").addEventListener("click", function() { timeadd(1800); enableStartButton();});
    document.getElementById("add1h").addEventListener("click", function() { timeadd(3600); enableStartButton();});
    document.getElementById("addself").addEventListener("click", function() { addself_start(); enableStartButton();});
    document.getElementById("resettime").addEventListener("click", function() { reset();});
    document.getElementById("start").addEventListener("click", function() { start();});
}

startup_settings();

