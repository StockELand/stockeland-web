export const BASE_URL = "http://localhost:8080";

export const API = {
  PREDICT: {
    START: `${BASE_URL}/predict`,
    DATA: `${BASE_URL}/predict`,
    PROGRESS: `${BASE_URL}/event/predict/progress`,
    LOGS: `${BASE_URL}/predict/logs`,
    STATUS: `${BASE_URL}/predict/status`,
  },
  PARSE: {
    START: `${BASE_URL}/parse`,
    DATA: `${BASE_URL}/parse`,
    PROGRESS: `${BASE_URL}/event/parse/progress`,
    LOGS: `${BASE_URL}/parse/logs`,
    STATUS: `${BASE_URL}/parse/status`,
  },
  STOCK: {
    ALL: `${BASE_URL}/stock/all`,
    PREDICTIONS: `${BASE_URL}/stock/predictions`,
  },
};
