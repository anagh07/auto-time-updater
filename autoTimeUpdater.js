const axios = require('axios');

// Full IANA time zone name
const timeZoneName = 'America/Montreal';
const url = `https://www.timeapi.io/api/Time/current/zone`;

/**
 * Fetch the current date and time from timeapi.io
 * Needs time zone information according to IANA time zone name
 * @returns Data-Time object defined in https://www.timeapi.io/swagger/index.html or -1 on error
 */
const fetchTime = async () => {
  try {
    const res = await axios.get(url, {
      params: {
        timeZone: timeZoneName,
      },
    });

    if (res.status === 200) {
      return res.data;
    } else {
      console.log(
        `Error fetching time, code: ${res.status}, status: ${res.statusText}, msg: ${res.data}`
      );
      return -1;
    }
  } catch (error) {
    if (error.response) {
      console.log(
        `Error fetching time, code: ${error.response.status}, msg: ${error.response.data}`
      );
    } else {
      console.log('Error fetching time: ', error.message);
    }
    return -1;
  }
};

const main = async () => {
  const time = await fetchTime();
  console.log(time);
};

main();
