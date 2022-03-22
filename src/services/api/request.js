const get_objects_from_API = async function(page_number) {
  let data;
  const response = await fetch(
      'https://www.rijksmuseum.nl/api/nl/collection?key=vU9Ifyh5&imgonly=true&p=' +
      page_number);
  if (response.status == 200) {
    data = response.json();
    console.log('is ok');

  } else {
    new Error(response.statusText);
    console.log(response.statusText);
  }
  return data;
};

const get_description_from_api =
    async function(object_number) {
  let data;
  const response = await fetch(
      'https://www.rijksmuseum.nl/api/nl/collection/' + object_number +
      '?key=vU9Ifyh5');
  if (response.status == 200) {
    data = response.json();
    console.log('is ok');

  } else {
    new Error(response.statusText);
    console.log(response.statusText);
  }
  return data;
}

export {
  get_objects_from_API, get_description_from_api
}