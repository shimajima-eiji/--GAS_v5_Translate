function output_api(json) {
  let output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify(json));

  return output;
}

// add_valueがJSONである場合、予めJSON.stringfyに掛けておくと、より詳細な内容にまで踏み込める
function output_sheet(text = "", translate = "", by = ""){
  const SSID = PropertiesService.getScriptProperties().getProperty("SSID");
  const SSNAME = PropertiesService.getScriptProperties().getProperty("SSNAME");
  const SHEET = SpreadsheetApp.openById(SSID).getSheetByName(SSNAME);

  message = "[Skip] Not found [Spread-Sheet ID] or [Spread-Sheet Name] or [value(String)].";
  if (SHEET != null) {
    SHEET.appendRow([new Date(), text, translate, by]);
    message = "[COMPLETE]add data";
  }

  Logger.log("output.gs/output_sheet: " + message);
  return message;
}