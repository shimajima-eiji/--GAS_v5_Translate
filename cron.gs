function __debug_API_count() {
  Logger.log(__property("API_COUNTER"));
}
function __cron_clear_API_count() {
  __property("API_COUNTER", "0");
}
