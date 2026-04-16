import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const config = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "CinematicWeather_1/**",
      "chrome-shot-profile/**",
      "chrome-shot-profile-2/**",
      "preview-shots/**",
      "snapbooth/**",
    ],
  },
  ...coreWebVitals,
  ...typescript,
];

export default config;
