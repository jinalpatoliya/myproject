import getConfig from "next/config";

const getServerUrl = () => {
  return getConfig().publicRuntimeConfig.API_URL;
};

export default getServerUrl;
