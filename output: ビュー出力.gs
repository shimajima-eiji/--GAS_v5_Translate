function __output_api(json) {
  json_string = JSON.stringify(json)
  if(__property("DEBUG").value == "true")
    __output_sheet_debug(json_string);

  return ContentService
    .createTextOutput(json_string)
    .setMimeType(ContentService.MimeType.JSON);
}

function __output_sheet_logging(text = "", translate = "", by = "") {
  return __output_sheet("SSID", "SSNAME", [text, translate, by])
}
function __output_sheet_debug(string) {
  return __output_sheet("SSID_DEBUG", "SSNAME_DEBUG", [string])
}

// add_valueがJSONである場合、予めJSON.stringfyに掛けておくと、より詳細な内容にまで踏み込める
function __output_sheet(id, name, data){
  const SSID = __property(id).value;
  const SSNAME = __property(name).value;
  const SHEET = SpreadsheetApp.openById(SSID).getSheetByName(SSNAME);

  message = "[Skip] Not found [Spread-Sheet ID] or [Spread-Sheet Name] or [value(String)].";
  if (SHEET != null) {
    data.unshift(new Date());
    SHEET.appendRow(data);
    message = "[COMPLETE]add data";
  }

  return __debug("output.gs/output_sheet: " + message);
}
