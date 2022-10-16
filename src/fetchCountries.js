// - Створорюємо посилання на об'єкт з БЕКЕНДУ, з якого будемо отримувати дані-------
// виконуємо перевірка статусу відповіді і перетворюємо дані у правильний формат,
//  або явне створення помилки, щоб обробити невдалий HTTP-запит в блоці catch().

export function fetchCountries(inputValue) {
  return fetch(
    `https://restcountries.com/v2/name/${inputValue}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

// export async function fetchCountries(inputValue) {
//   const response = await fetch(
//     `https://restcountries.com/v2/name/${inputValue}?fields=name,capital,population,flags,languages`
//   );
//   if (!response.ok) {
//     throw new Error(response.status);
//   }
//   return await response.json();
// }





        // ПОЯСНІТЬ БУДЬ ЛАСКА, ЧИМ ВІДРІЗНЯЮТЬСЯ ЦІ ДВА КОДИ!?
      //     ДЯКУЮ!!!
