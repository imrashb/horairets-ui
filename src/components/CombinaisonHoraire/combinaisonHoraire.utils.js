import randomColor from 'randomcolor';

export const getDeterministicRandomCoursColor = (sigle) => randomColor({
  seed: sigle,
  luminosity: 'bright',
});

export const getDeterministicRandomBorderCoursColor = (sigle) => randomColor({
  seed: sigle,
  luminosity: 'dark',
});
