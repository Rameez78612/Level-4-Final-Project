async function getTime() { // I didnt come up with the code for this part by myself.
  const location = encodeURIComponent(document.getElementById('location').value);

  if (location === '') {
    displayError('Please enter a timezone.');
    return;
  }

  try {
    const response = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=VY23S8VOQXNX&format=json&by=zone&zone=${location}`);
    const data = await response.json();

    if (response.ok && data && data.status === 'OK') {
      const timezoneOffset = data.gmtOffset; // Get the timezone offset in seconds
      const currentTime = calculateLocalTime(timezoneOffset);
      displayTime(currentTime);
    } else {
      displayError('Failed to get time for the timezon.');
    }
  } catch (error) {
    console.error(error);
    displayError('Failed to fetch time. Please try again later.');
  }
}

function calculateLocalTime(offset) {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000); // shows time in milliseconds so thats why this is like this
  const localTime = new Date(utc + (offset * 1000));
  return localTime.toLocaleTimeString('en-US');
}

function displayTime(regularTime) {
  const timeContainer = document.getElementById('time-container');
  timeContainer.innerHTML = `
    <div class="time-box">
      <p>Time: ${regularTime}</p>
    </div>
  `;
}

function displayError(message) {
  const timeContainer = document.getElementById('time-container');
  timeContainer.innerHTML = `<div class="error-box">${message}</div>`;
}