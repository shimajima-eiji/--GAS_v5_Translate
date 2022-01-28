function output_api(json) {
  return ContentService
    .createTextOutput(
      JSON.stringify(json)
    )
    .setMimeType(ContentService.MimeType.JSON);
}

// add_valueがJSONである場合、予めJSON.stringfyに掛けておくと、より詳細な内容にまで踏み込める
function output_sheet(text = "", translate = "", by = ""){
  const SSID = property("SSID").value;
  const SSNAME = property("SSNAME").value;
  const SHEET = SpreadsheetApp.openById(SSID).getSheetByName(SSNAME);

  message = "[Skip] Not found [Spread-Sheet ID] or [Spread-Sheet Name] or [value(String)].";
  if (SHEET != null) {
    SHEET.appendRow([new Date(), text, translate, by]);
    message = "[COMPLETE]add data";
  }

  Logger.log("output.gs/output_sheet: " + message);
  return message;
}