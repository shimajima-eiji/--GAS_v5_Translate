function doGet(e) {
  let p = e.parameter;
  if(p.source == undefined) p.source="en";
  if(p.target == undefined) p.target="en";

  p.translate = LanguageApp.translate(p.text, p.source, p.target);
  return ContentService.createTextOutput(JSON.stringify(p));
}