ymaps.ready(init);
let myMap;
let carLocation;

function init() {
  myMap = new ymaps.Map(
    'map',
    {
      center: [55.753215, 37.622504], // Москва
      zoom: 11,
    },
    {
      balloonMaxWidth: 200,
      searchControlProvider: 'yandex#search',
    }
  );

  // Обработка события, возникающего при щелчке
  // левой кнопкой мыши в любой точке карты.
  // При возникновении такого события откроем балун.
  myMap.events.add('click', function (e) {
    console.log(e.get('coords'));

    if (carLocation) {
      myMap.geoObjects.remove(carLocation);
    }
    carLocation = new ymaps.Placemark(
      e.get('coords'),
      {
        balloonContent: 'car',
      },
      {
        preset: 'islands#circleIcon',
        iconColor: '#3caa3c', // цвет нашей точки
      }
    );

    myMap.geoObjects.add(carLocation);
  });
}
