export const getApiBaseUrl = () => {
  //const environment = process.env.ENVIRONMENT;
  const environment = "development";
  console.log(environment);
  if (environment === "production") {
    console.log('prod');
    return "https://visionaid-stats-ng.vercel.app";
  } else {
    console.log('dev');
    return "http://localhost:3000";
    
  }

};
