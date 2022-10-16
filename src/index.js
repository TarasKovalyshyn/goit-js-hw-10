// --------------------Імпортуємо усі необхідні файли-----------------------
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { refs } from './refs';
const DEBOUNCE_DELAY = 300;

// -----Додаємо слухача подій на INPUT та Debounce на обробнику події--------------------

refs.input.addEventListener('input', debounce(OnInputValue, DEBOUNCE_DELAY));

// -------------Стоврюємо функцію для отримання значення з Input------------------------
// Якщо таке введене значення існує, то ми його опрацьовуємо, якщо ні, 
// за допомогою "Notify" додаємо повідомлення про помилку

function OnInputValue(e) {
  e.preventDefault();
  const inputValue = e.target.value.trim();
  if (inputValue) {
    fetchCountries(inputValue)
      .then(response => inputValueSetings(response))
      .catch(() => Notify.failure('Oops, there is no country with that name'));
  } else {
    clearMarkup();
  }
}
// ------------------Додаємо умову пошуку ----------------------------
// Якщо у відповіді бекенд повернув більше ніж 10 країн, в інтерфейсі з'являється повідомлення про те, що назва повинна бути специфічнішою.
// Якщо бекенд повернув від 2-х до 10-и країн, під тестовим полем відображається список знайдених країн.
// Якщо результат запиту - це масив з однією країною, в інтерфейсі відображається розмітка картки з даними про країну.
function inputValueSetings(response) {
  response.length < 2 && createCartInfo(response);
  response.length < 11 && response.length > 1 && createList(response);
  response.length > 10 &&
    Notify.info('Too many matches found. Please enter a more specific name.');
}
// -Cтворюємо розмітку для відображення списку пошуку країн(мінімалізована розмітка) і додадаємо в DOM----------------------------
function createList(response) {
  clearMarkup();
  let markup = response.map(({ name, flags: { svg } }) => {
    return `
      <li class="country-list__item">
        <img class="country-list__flag" src="${svg}" alt="Flag of mp${name}"/>
        <p class="country-list__name">${name}</p>
      </li>`;
  });
  refs.countryList.insertAdjacentHTML('beforeend', markup.join(''));
}
// - Розгладжуємо масив за допомогою "map"-------------------------------
// -Створюємо розгорнуту розмітку для картки і додаємо в DOM-----------------------------
function createCartInfo(response) {
  clearMarkup();
  let markup = response.map(
    ({ name, capital, population, flags: { svg }, languages }) => {
      return `
        <ul class="country-info__list">
          <li class="country-info__item">
            <img class="country-info__flag" src='${svg}' alt='flag' />
            <span class="country-info__name">${name}</span>
          </li>
          <li class="country-info__item">
            <h2 class="country-info__title">Capital:</h2><p class="country-info__text">${capital}</p>
          </li>
          <li class="country-info__item">
            <h2 class="country-info__title">Population:</h2><p class="country-info__text">${population}</p>
          </li>
          <li class="country-info__item">
            <h2 class="country-info__title">Languages:</h2><p class="country-info__text">${languages[0].nativeName}
          </li>
        </ul>`;
    }
  );
  refs.countryInfo.innerHTML = markup
}
//  ---- ФУНКЦІЯ ДЛЯ ОЧИЩЕННЯ РОЗИІТКИ------
function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
