const APIRM = 'https://v3.football.api-sports.io/fixtures?team=541&next=4';
const APIVE = 'https://v3.football.api-sports.io/fixtures?team=2379&last=5';
const contentRM = null || document.querySelector('#contentRM');
const contentVE = null || document.querySelector('#contentVE');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ee4499840ed41153ba54c1d5e534edd5',
		'X-RapidAPI-Host': 'v3.football.api-sports.io'
	}
};


async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const juegos = await fetchData(APIRM);
        console.log(juegos.response);
        let view = `
        ${juegos.response.map(juego => `
        <div class="group relative">
           <div
             class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
             <img src="${juego.league.logo}" alt="${juego.league.name}" class="w-full">
           </div>
           <div class="mt-4">
             <h3 class="text-lg text-black-700">
               <span aria-hidden="true" class="absolute inset-0"></span>
               ${juego.teams.home.name} vs ${juego.teams.away.name}
             </h3>
             <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
             ${juego.fixture.date}
             ${juego.fixture.venue.name}
             ${juego.fixture.venue.city}
             </p>
           </div>
         </div>
         `).join('')}
        `;
        contentRM.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();

(async () => {
  try {
      const juegos = await fetchData(APIVE);
      console.log(juegos.response);
      let view = `
      ${juegos.response.map(juego => `
      <div class="group relative">
         <div
           class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
           <img src="${juego.league.logo}" alt="${juego.league.name}" class="w-full">
         </div>
         <div class="mt-4">
           <h3 class="text-lg text-black-700">
             <span aria-hidden="true" class="absolute inset-0"></span>
             ${juego.teams.home.name} ${juego.goals.home} vs ${juego.teams.away.name} ${juego.goals.away}
           </h3>
           <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
           ${juego.fixture.date}
           ${juego.fixture.venue.name}
           ${juego.fixture.venue.city}
           </p>
         </div>
       </div>
       `).slice(1, undefined).join('')}
      `;
      contentVE.innerHTML = view;
  } catch (error) {
      console.log(error);
  }
})();
