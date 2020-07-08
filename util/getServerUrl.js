const getServerUrl = () => {
  console.log(process.env);
  return process.env.API_URL;
};

export default getServerUrl;
