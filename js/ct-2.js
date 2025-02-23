// Set the target date
const targetDate = new Date("2025-04-01T22:00:00").getTime(); // Hardcoded date

// Function to update the countdown
function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    // Countdown expired: update the element's content and add a custom CSS class
    const timerElement = document.querySelector(".countdown-timer");
    timerElement.innerHTML = "It's time!";
    timerElement.classList.add("time-up");
    return;
  }

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update the countdown values in Webflow
  document.querySelector(".cd-days").textContent = days < 10 ? `0${days}` : days;
  document.querySelector(".cd-hours").textContent = hours < 10 ? `0${hours}` : hours;
  document.querySelector(".cd-minutes").textContent = minutes < 10 ? `0${minutes}` : minutes;
  document.querySelector(".cd-seconds").textContent = seconds < 10 ? `0${seconds}` : seconds;
}

// Run the countdown timer
updateCountdown(); // Run once to avoid delay
setInterval(updateCountdown, 1000); // Update every second