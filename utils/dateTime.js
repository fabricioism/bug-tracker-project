const dayjs = require("dayjs");
require("dayjs/locale/es");

/**
 * DayJS Url Documentation: https://day.js.org/docs/en/i18n/instance-locale
 */

export const formatDateTime = (value) => {
  return dayjs(value).locale("en").format("D/MMMM/YYYY");
};
