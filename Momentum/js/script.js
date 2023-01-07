// START Clock and calendar 
console.log('Часы и календарь +15');
console.log('Приветствие +10');
console.log('Смена фонового изображения +20');
console.log('Виджет погоды +15');
console.log('Виджет цитата дня +10');
console.log('Аудиоплеер +15');
console.log('Продвинутый аудиоплеер (реализуется без использования библиотек) +20');
console.log('Перевод приложения на два языка (en/ru или en/be) +15');
console.log('Получение фонового изображения от API +10');
console.log('Настройки приложения +20');
console.log('Дополнительный функционал на выбор +10');
console.log('Итого: 150');



// reset

let languageValue;
// let BackgroundsourseValue;

const time = document.querySelector('.time');
const calendarDay = document.querySelector('.date');
const options = {weekday: 'long', month: 'long', day: 'numeric'};
const nameImput = document.querySelector('.name');
let indextimeOfDayArray = 0;
const greetingUser = document.querySelector('.greeting');
const timeOfDayGit = ['night', 'morning', 'afternoon', 'evening']
const timeOfDayArray = [
      ['Good night', 'Good morning', 'Good afternoon', 'Good evening'],
      ['Доброй ночи,', 'Доброе утро,', 'Доброго дня,', 'Добрый вечер']
];
let date;
let currentcalendarDay;
let currentTime;
const datashowDate = ['en-US', 'ru-RU'];
let indexshowDate = 0;

    function newTime() {
    date = new Date();
  };

    function showDate() {
    currentcalendarDay = date.toLocaleDateString(`${datashowDate[indexshowDate]}`, options);

    calendarDay.textContent = currentcalendarDay;
  };

    (function showTimeAndDate() {
    newTime();  
    currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTimeAndDate, 250);
   }());

// END Clock and calendar 

// START slider


// WZtINGBa7iYlfTDC_yUwI9CqXdLruzdN4AnsxdiCf4A   unsplash
// 878ccfcbfee4ad2f3999a8c498741ab3 flickr


const formInputBackgroundtagsSourse = document.querySelector('.form-input-backgroundtags-sourse');
let url = '../assets/img/bg.jpg';
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const formInputBackgroundtags = document.querySelector('.form-input-backgroundtags');
let formInputBackgroundtagsValue = 'random';
const bodyBG = document.querySelector('body');
let bgBlockControls = true;
const img = new Image();
let randomNum = getRandomNum().toString().padStart(2, "0");
let BackgroundsourseValue;
// let BackgroundsourseValue = 'github';

formInputBackgroundtagsSourse.addEventListener('change', function(e) {
  BackgroundsourseValue = e.target.value;
  changeBackgroundsourse(BackgroundsourseValue);

});


function changeBackgroundsourse(params) {

  if (params === 'github') {
    BackgroundsourseValue = 'github';
    setBg(randomNum);
  } else if (params === 'unsplash') {
    BackgroundsourseValue = 'unsplash';
    setBg(randomNum);
  } else if (params === 'flickr') {
    BackgroundsourseValue = 'flickr';
    setBg(randomNum);
  }
  
}




formInputBackgroundtags.addEventListener('submit', function(e) {
  e.preventDefault();
});

formInputBackgroundtags.addEventListener('change', function(e) {
  if (e.target.value === '') {
    formInputBackgroundtagsValue = 'random';
  } else {
    formInputBackgroundtagsValue = e.target.value;
  };
  setBg(randomNum);
});

    function getRandomNum() {
        return Math.floor(Math.random() * (21 - 1)) + 1;
     };

     async function setBg(randomNum) {  
try {

  if (BackgroundsourseValue === 'github') {
    randomNum = randomNum.toString().padStart(2, "0");
    img.src = `https://raw.githubusercontent.com/Syderi/stage1-tasks/assets/images/${timeOfDayGit[getTimeOfDay()]}/${randomNum}.jpg`;

  };
  if (BackgroundsourseValue === 'unsplash') {
    url = `https://api.unsplash.com/photos/random?query=${formInputBackgroundtagsValue}&client_id=WZtINGBa7iYlfTDC_yUwI9CqXdLruzdN4AnsxdiCf4A`;
    const res = await fetch(url);
    const data = await res.json();
    img.src = data.urls.regular;
  };

  if (BackgroundsourseValue === 'flickr') {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=878ccfcbfee4ad2f3999a8c498741ab3&tags=${formInputBackgroundtagsValue}&extras=url_h&format=json&nojsoncallback=1`;
    const resflickr = await fetch(url);

    const dataflickr = await resflickr.json();
    let photoNumber = Math.floor(Math.random() * (101 - 1)) + 1;

    if (dataflickr.photos.photo[photoNumber].url_h) {
      img.src = dataflickr.photos.photo[photoNumber].url_h;
    } else {
      randomNum = randomNum.toString().padStart(2, "0");
      img.src = `https://raw.githubusercontent.com/Syderi/stage1-tasks/assets/images/${timeOfDayGit[getTimeOfDay()]}/${randomNum}.jpg`;
    }
  };

} catch (error) {

}
    img.addEventListener('load', () => {  
      bodyBG.style.backgroundImage = `url(${img.src})`
    }); 
};

    document.body.addEventListener("transitionend", (e) => {
     if (e.propertyName === "background-image" && e.target === document.body) {
         bgBlockControls = true;
     };
   });

    slideNext.addEventListener( "click" , getSlideNext);
    slidePrev.addEventListener( "click" , getSlidePrev);
    setBg(randomNum);
 
    function getSlideNext() {
      if (bgBlockControls === true) {
        bgBlockControls = false;    
        randomNum = +randomNum + 1;
        if (randomNum === 21) {
          randomNum = 1;
        } 
        setBg(randomNum);
      };
     };

     function getSlidePrev() {
       if (bgBlockControls === true) {
         bgBlockControls = false;
        randomNum = +randomNum - 1;
        if (randomNum === 0) {
          randomNum = 20;
        } 
        setBg(randomNum);
      };
     };

// END slider

// START weather

const weatherEnter = document.querySelector('.weather');
const weatherError = document.querySelector('.weather-error');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
let cityName = localStorage.getItem('cityNameNew') !== null ? `${localStorage.getItem('cityNameNew')}` :'Minsk';
city.placeholder = 'Minsk';
let indexweatherArray = 0;
const weatherArray = [
  ['en', 'Wind speed', 'm/s', 'Humidity', 'Name ', ' of city entered incorrectly'],
  ['ru', 'Скорость ветра,', 'м/с,', 'Влажность', 'Название ', ' города не корректно']
];

// cityName = 'Чебоксары';

getWeather();

  city.addEventListener('change', () => {
      cityName = city.value;
      weatherEnter.classList.toggle('weather_enter');
    getWeather();
  });

  async function getWeather() {

    weatherIcon.className = 'weather-icon owf'; 
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${weatherArray[indexweatherArray][0]}&appid=1523cc4a3a7fa33d0ffa6ee10108c068&units=metric`;
      const res = await fetch(url);
      const data = await res.json(); 
      weatherEnter.classList.toggle('weather_enter');
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      wind.textContent = `${weatherArray[indexweatherArray][1]}: ${Math.round(data.wind.speed)} ${weatherArray[indexweatherArray][2]}`;
      humidity.textContent = `${weatherArray[indexweatherArray][3]}: ${Math.round(data.main.humidity)} %`;
      if (cityName !== 'Minsk') {
              city.placeholder = `${cityName}`;
      };
      city.value = '';
      weatherError.textContent = '';
    } catch (error) {
      cityName = localStorage.getItem('cityNameNew');
      weatherError.textContent = `${weatherArray[indexweatherArray][4]}"${city.value}" ${weatherArray[indexweatherArray][5]}`;
      temperature.textContent = '';
      weatherDescription.textContent = '';
      wind.textContent = '';
      humidity.textContent = '';
      city.value = '';
    };
};

// END weather

// Start quote

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
let dataQuotes;
const dataQuotesAray = ['dataen', 'dataru'];
let indexdataQuotesAray = 0;

async function getQuotes() {  
  let res = await fetch(`json/${dataQuotesAray[indexdataQuotesAray]}.json`);
  dataQuotes = await res.json(); 
  return dataQuotes;
}
getQuotes();


function getRandomNum1643() {
  return Math.floor(Math.random() * (dataQuotes.length - 0)) + 0;
};

function seeQuotes() {
  getQuotes().then((data) => {
    let numberArray = getRandomNum1643();
    quote.textContent = `${data[numberArray].text}`
    author.textContent = `${data[numberArray].author}`
  });
};
seeQuotes();

changeQuote.addEventListener('click', () => {
  changeQuote.classList.toggle('changequoteactive');
  seeQuotes();
});


// End quote

// START Audioplayer

  const player = document.querySelector('.player');
  const playPause = document.querySelector('.play');
  const playNext = document.querySelector('.play-next');
  const playPrevious = document.querySelector('.play-prev');
  const playList = document.querySelector('.play-list');
  const songName = document.querySelector('.song-name');
  const range = document.querySelector('.range');
  const rangeVolume = document.querySelector('.range-volume');
  const timeSong = document.querySelector('.time-song');
  const timeLong = document.querySelector('.time-long');
  const mute = document.querySelector('.mute');
  // const arrayLi = document.querySelectorAll('.play-item');
  let stoptimeupdate = true; 
  let isPlay = false;
  let numberSong = 0;
  let currentTimeAudio =0;

  const audio = new Audio();
  const audioTrack = ['Aqua Caelestis', 'River Flows In You', 'Summer Wind', 'Ennio Morricone'];

    audioTrack.forEach((el) => {
      const li = document.createElement('li');
      li.classList.add('play-item');
      li.textContent = el;
      playList.append(li);
    });

    playNext.addEventListener( "click" , playNextSong);
    playPrevious.addEventListener( "click" , playPreviousSong);

    function playNextSong() {
      currentTimeAudio = 0;
      playList.querySelector(`li:nth-child(${numberSong + 1})`).classList.remove('item-active');
            if (numberSong === 3) {
                numberSong = 0;
            } else {
                numberSong += 1;
            };
      isPlay = false;
      playList.querySelector(`li:nth-child(${numberSong + 1})`).classList.add('item-active');
      playAudio();
    };

  function playPreviousSong() {
    currentTimeAudio = 0;
    playList.querySelector(`li:nth-child(${numberSong + 1})`).classList.remove('item-active');
          if (numberSong === 0) {
              numberSong = 3;
          } else {
              numberSong -= 1;
          };
    isPlay = false;
    playList.querySelector(`li:nth-child(${numberSong + 1})`).classList.add('item-active');
    playAudio();
  };

      function playAudio() {
        audio.src = `assets/sounds/${audioTrack[numberSong]}.mp3`;
        audio.volume = 0.5;
            if (!isPlay) {
                audio.currentTime = currentTimeAudio;
                songName.textContent = `${audioTrack[numberSong]}`;
                audio.play();
                playPause.classList.add('pause');
                playList.querySelector(`li:nth-child(${numberSong + 1})`).classList.add('item-active');
                isPlay = !isPlay;
                currentTimeAudio = audio.currentTime;
            } else {
                audio.pause();
                playPause.classList.remove('pause');
                isPlay = !isPlay;
            };
      };

    playPause.addEventListener('click', () => {
        playAudio();
    });

    audio.addEventListener('ended', () => {
      playNextSong();
    });

// End Audioplayer

// Start Advanced audio player

    audio.addEventListener('timeupdate', () => {
      if (audio.currentTime !== 0) {
        timeSong.textContent = (formatTime(Math.floor(audio.currentTime)));;
        currentTimeAudio = audio.currentTime;
      };
          if (stoptimeupdate) {
              if (audio.currentTime !== 0) {
              range.value = 100 / audio.duration * currentTimeAudio;
              rangeChange();
            };
          }
    });

  audio.addEventListener('loadedmetadata',()=> {
    timeLong.textContent = (formatTime(Math.floor(audio.duration)));
  });

  range.addEventListener('mouseout', (e) => {
    stoptimeupdate = true;
  });
  
  range.addEventListener('mouseover', (e) => {
    stoptimeupdate = false; 
  });

  range.addEventListener('change', (e) => {
    rangeChange();
    if (isPlay) {
      currentTimeAudio = range.value / 100 * audio.duration;
      isPlay = false;
    playAudio();
    };
  });

function rangeChange() {
  range.style.background = `-webkit-linear-gradient(left, rgb(94, 108, 109) 0%, rgb(94, 108, 109) ${range.value}%, #fff ${range.value}%, #fff 0%)`;
  rangeVolume.style.background = `-webkit-linear-gradient(left, rgb(94, 108, 109) 0%, rgb(94, 108, 109) ${rangeVolume.value}%, #fff ${rangeVolume.value}%, #fff 0%)`;
}

// convert song.currentTime and song.duration into MM:SS format
  function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
      if (sec < 10){ 
          sec  = `0${sec}`;
      };
    return `${min}:${sec}`;
  };

  mute.addEventListener('click', () => {
    mute.classList.toggle('mute-active');
      if (!audio.muted) {
        audio.muted = true;
      } else {
        audio.muted = false;
      }
  });

    rangeVolume.addEventListener('change', (e) => {
       audio.volume = rangeVolume.value/100;
       rangeChange();
    });

  playList.addEventListener('click', (e) => {
    const numberli = e.target.closest(".play-item");
    const index = Array.from(playList.children).indexOf(numberli);
        if (numberSong === index) {
          audio.currentTime = currentTimeAudio;
          if (isPlay) {
            playPause.classList.add('pause');
          } 
          playAudio();
        } else {
              numberSong = index;
              clearLi();
              isPlay = false;
              playPause.classList.remove('pause');
              currentTimeAudio = 0;
              playAudio();
        }
  });

  const arrayLi = document.querySelectorAll('.play-item');

  function clearLi() {
    arrayLi.forEach((el) => {
       el.classList.remove('item-active'); 
    });
  };

// End Advanced audio player

// Start Translation

const formInputlanguage = document.querySelector('.form-input-language');
const popupHeader = document.querySelector('.popup-header');
const todoHeader = document.querySelector('.todo-header');
const language = document.querySelector('.language');
const backgroundSourse = document.querySelector('.background-sourse');
const backgroundTags = document.querySelector('.background-tags');
const showWidgets = document.querySelector('.show-widgets');
const english = document.querySelector('.english');
const russian = document.querySelector('.russian');
const timeLabel = document.querySelector('.timelabel');
const dateLabel = document.querySelector('.datelabel');
const greetingLabel = document.querySelector('.greetinglabel');
const quoteLabel = document.querySelector('.quotelabel');
const weatherLabel = document.querySelector('.weatherlabel');
const playerLabel = document.querySelector('.playerlabel');
const todolistLabel = document.querySelector('.todolistlabel');





formInputlanguage.addEventListener('change', function(e) {

  languageValue = e.target.value;

  changeLanguage(languageValue);
  
});

function changeLanguage(params) {

  if (params === 'russian') {
    indexdataQuotesAray = 1;
    indexshowDate = 1;
    indextimeOfDayArray = 1
    nameImput.placeholder = '[Ваше имя]';
    indexweatherArray = 1;
    city.placeholder = 'Минск';
    popupHeader.textContent = 'Настройки';
    todoHeader.textContent = 'Мои задачи';
    language.textContent = 'Язык';
    backgroundSourse.textContent = 'Источники обоев';
    backgroundTags.textContent = 'Тэги для обоев';
    showWidgets.textContent = 'Показать виджеты';
    english.textContent = 'Английский';
    russian.textContent = 'Русский';
    timeLabel.textContent = 'Время';
    dateLabel.textContent = 'Дата';
    greetingLabel.textContent = 'Приветствие';
    quoteLabel.textContent = 'Цитата';
    weatherLabel.textContent = 'Погода';
    playerLabel.textContent = 'Плеер';
    todolistLabel.textContent = 'Список дел';
  } else {
    indexdataQuotesAray = 0;
    indexshowDate = 0;
    indextimeOfDayArray = 0
    nameImput.placeholder = '[Enter name]';
    indexweatherArray = 0;
    city.placeholder = 'Minsk';
    popupHeader.textContent = 'Configuration';
    todoHeader.textContent = 'My tasks';
    language.textContent = 'Language';
    backgroundSourse.textContent = 'Background sourse';
    backgroundTags.textContent = 'Background tags';
    showWidgets.textContent = 'Show widgets';
    english.textContent = 'English';
    russian.textContent = 'Russian';
    timeLabel.textContent = 'Time';
    dateLabel.textContent = 'Date';
    greetingLabel.textContent = 'Greeting';
    quoteLabel.textContent = 'Quote';
    weatherLabel.textContent = 'Weather';
    playerLabel.textContent = 'Player';
    todolistLabel.textContent = 'To do List';
  }
  
  seeQuotes();
  showDate();
  weatherEnter.classList.toggle('weather_enter');
  getWeather();

  
}



// End Translation


// Start Configuration


const closePopup = document.querySelectorAll('.close-popup');
const closeTodo = document.querySelectorAll('.close-todo');


const imputTime = document.querySelector('.imput-time');
const imputcalendarDay = document.querySelector('.imput-date');
const imputQuote = document.querySelector('.imput-quote');
const imputWeather = document.querySelector('.imput-weather');
const imputPlayer = document.querySelector('.imput-player');
const imputToDo = document.querySelector('.imput-to-do');
const imputGreeting = document.querySelector('.imput-greeting');
let imputTimeValue = false;
let imputcalendarDayValue = false;
let imputQuoteValue = false;
let imputWeatherValue = false;
let imputPlayerValue = false;
let imputToDoValue = false;
let imputGreetingValue = false;

// imputTime.checked = false;

const quoteWrapper = document.querySelector('.quote-wrapper');
const greetingContainer = document.querySelector('.greeting-container');
const openToDo = document.querySelector('.open-todo');
const toDo = document.querySelector('.todo');
const popup = document.querySelector('.popup');

  closePopup.forEach(element => {
    element.addEventListener('click', () => {
      popup.classList.toggle('popup-active');
  });
  });

  closeTodo.forEach(element => {
    element.addEventListener('click', () => {
      toDo.classList.toggle('todo-active');
  });
  });

  imputTime.addEventListener('change', () => {
    changeTimeVisible();
});

  function changeTimeVisible() {
    imputTimeValue = !imputTimeValue;
    time.classList.toggle('hide');
    setTimeout(() => time.classList.toggle('hide-absolute'), 2000); 
  }
  
  imputcalendarDay.addEventListener('change', () => {
    changecalendarDayVisible();
});

  function changecalendarDayVisible() {
    imputcalendarDayValue = !imputcalendarDayValue;
    calendarDay.classList.toggle('hide');
    setTimeout(() => calendarDay.classList.toggle('hide-absolute'), 2000); 
  }


  imputQuote.addEventListener('change', () => {
    changeQuoteVisible();
  });
  
  function changeQuoteVisible() {
    imputQuoteValue = !imputQuoteValue;
    quoteWrapper.classList.toggle('hide')
  };


  imputWeather.addEventListener('change', () => {
    // weatherEnter.classList.toggle('hide');
    changeWeatherVisible();
  });

  function changeWeatherVisible() {
    imputWeatherValue = !imputWeatherValue;
    weatherEnter.classList.toggle('hide');
  };

  imputPlayer.addEventListener('change', () => {
    changePlayerVisible();
});

  function changePlayerVisible() {
    imputPlayerValue = !imputPlayerValue;
    player.classList.toggle('hide');
  };


   imputToDo.addEventListener('change', () => {
    changeToDoVisible();
   });

   function changeToDoVisible() {
    imputToDoValue = !imputToDoValue;
    openToDo.classList.toggle('hide');
    toDo.classList.toggle('hide');
  }


  imputGreeting.addEventListener('change', () => {
    changeGreetingVisible();
});

  function changeGreetingVisible() {
    imputGreetingValue = !imputGreetingValue;
    setTimeout(() => greetingContainer.classList.toggle('hide-absolute'), 2000); 
    greetingContainer.classList.toggle('hide');
  }



// End Configuration

// Start Task

const todoArray = [];

const imputTodo = document.querySelector('.imput-todo');
const ulTodo = document.querySelector('.ul');




imputTodo.addEventListener('change', (e) => {
  addliTodo(e.target.value);
  e.target.value = '';
})


function addliTodo(task) {
  const liTodo = document.createElement('li');
  const divTodo = document.createElement('div');
  const divTodobtn = document.createElement('div');

  liTodo.classList.add('li');
  divTodo.classList.add('text-todo');
  divTodo.textContent = `${task}`;
  divTodobtn.classList.add('close-btn-todo');
  ulTodo.append(liTodo);
  liTodo.append(divTodo);
  liTodo.append(divTodobtn);

  todoArray.push(task);
};

ulTodo.addEventListener('click', (e) => {
  const numberliTodo = e.target.closest(".li");
  const indexliTodo = Array.from(ulTodo.children).indexOf(numberliTodo);
  if (e.target.className === "close-btn-todo") {
      const inddel = ulTodo.querySelector(`li:nth-child(${indexliTodo+1})`);
       ulTodo.removeChild(inddel);
       todoArray.splice(indexliTodo, 1);
  }
});

// End Task

// START greeting and save Configuration

const imputEnglish = document.querySelector('.imput-english');
const imputRussian = document.querySelector('.imput-russian');

const imputGithub = document.querySelector('.imput-github');
const imputUnsplash = document.querySelector('.imput-unsplash');
const imputFlickr = document.querySelector('.imput-flickr');



function getTimeOfDay() {
  const hours = date.getHours();
  return Math.floor(hours/6)
};

function showGreeting() {
      greetingUser.textContent = `${timeOfDayArray[indextimeOfDayArray][getTimeOfDay()]}`; 
};

function setLocalStorage() {
    localStorage.setItem('nameNew', nameImput.value);
    localStorage.setItem('cityNameNew', cityName);
    localStorage.setItem('todoArrayNew', todoArray);
    localStorage.setItem('languageValueNew', languageValue);
    localStorage.setItem('BackgroundsourseNew', BackgroundsourseValue);

    localStorage.setItem('imputTimeNew', imputTimeValue);
    localStorage.setItem('imputcalendarDayNew', imputcalendarDayValue);
    localStorage.setItem('imputQuoteNew', imputQuoteValue);
    localStorage.setItem('imputWeatherNew', imputWeatherValue);
    localStorage.setItem('imputPlayerNew', imputPlayerValue);
    localStorage.setItem('imputToDoNew', imputToDoValue);
    localStorage.setItem('imputGreetingNew', imputGreetingValue);


// value: "russian" formInputlanguage.target.value
  };

  window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {

  popup.classList.toggle('popup-active');
  toDo.classList.toggle('todo-active');

    if(localStorage.getItem('nameNew')) {
        nameImput.value = localStorage.getItem('nameNew');
    };

    if(localStorage.getItem('todoArrayNew')) {
        const temporaryArray = localStorage.getItem('todoArrayNew').split(',');
        Array.from(temporaryArray).forEach(element => {
          addliTodo(element);
        });
    };

    if(localStorage.getItem('languageValueNew') === 'russian') {
      changeLanguage('russian');
      imputRussian.checked = true;
    } else {
      imputEnglish.checked = true;
    }
    
    if(localStorage.getItem('BackgroundsourseNew') === 'unsplash') {
      changeBackgroundsourse('unsplash');
      imputUnsplash.checked = true;
    } else if (localStorage.getItem('BackgroundsourseNew') === 'flickr') {
      changeBackgroundsourse('flickr');
      imputFlickr.checked = true;
    } else {
      changeBackgroundsourse('github');
      imputGithub.checked = true;
    }
    
    if(localStorage.getItem('imputTimeNew') === 'true') {
      imputTime.checked = true;
      changeTimeVisible();
    } else {
      imputTime.checked = false;
    }

    if(localStorage.getItem('imputcalendarDayNew') === 'true') {
      imputcalendarDay.checked = true;
      changecalendarDayVisible();
    } else {
      imputcalendarDay.checked = false;
    }
// 
    if(localStorage.getItem('imputQuoteNew') === 'true') {
      imputQuote.checked = true;
      changeQuoteVisible();
    } else {
      imputQuote.checked = false;
    }
// 
    if(localStorage.getItem('imputWeatherNew') === 'true') {
      imputWeather.checked = true;
      changeWeatherVisible();
    } else {
      imputWeather.checked = false;
    }
// 
    if(localStorage.getItem('imputPlayerNew') === 'true') {
      imputPlayer.checked = true;
      changePlayerVisible();
    } else {
      imputPlayer.checked = false;
    }
// 
    if(localStorage.getItem('imputToDoNew') === 'true') {
      imputToDo.checked = true;
      changeToDoVisible();
    } else {
      imputToDo.checked = false;
    }
// 
    if(localStorage.getItem('imputGreetingNew') === 'true') {
      imputGreeting.checked = true;
      changeGreetingVisible();
    } else {
      imputGreeting.checked = false;
    }

  };

  window.addEventListener('load', getLocalStorage);

// END greeting and save Configuration



