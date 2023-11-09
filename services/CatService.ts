const getRandomCat = () => {
  return fetch('https://cataas.com/cat?json=true&type=medium');
};

const CatService = {
  getRandomCat,
};

export default CatService;
