import randomColor from "randomcolor";

export const getDeterministicRandomCoursColor = (sigle: string): string =>
  randomColor({
    seed: sigle,
    luminosity: "bright",
  });

export const getDeterministicRandomBorderCoursColor = (sigle: string): string =>
  randomColor({
    seed: sigle,
    luminosity: "dark",
  });
