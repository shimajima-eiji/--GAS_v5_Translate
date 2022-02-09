function __debug_flag() {
  let flag = (__property("DEBUG").value == "true") 
    ? "false"
    : "true";
  __property("DEBUG", flag);
}

function __debug(message) {
  // propertyからdebugを呼んでいるため、無限ループ回避のため平打ちする
  if(PropertiesService.getScriptProperties().getProperty("DEBUG") == "true") Logger.log(message);
}

/* 開発中に間違えて実行すると悲惨なので、コメントアウトしておく(1敗)
function initialize() {
  __property("SSID", "spreadsheet_id", true)
  __property("SSNAME", "spreadsheet_name", true);
  __property("SSID_DEBUG", "spreadsheet_id", true)
  __property("SSNAME_DEBUG", "spreadsheet_name", true);
  __property("API_COUNTER", "0", true);
  __property("DEBUG", "false", true);
}
// */

const GUARD_KEYS = [
  "SSID",
  "SSNAME"
];

// get/setに対応
function __property(key, value, force_flag=false) {
  let message = 

  // [stop]keyもvalueもない
  (key == undefined && value == undefined) 
  ? "[Stop:環境変数設定.property] Required key(get). Optional value(set)"

  // [get]keyだけの場合
  : (key != undefined && value == undefined)
  ? PropertiesService.getScriptProperties().getProperty(key)

  // [set]keyとvalueが存在する場合で、上書き禁止ではないもの
  : (key != undefined && value != undefined && ! GUARD_KEYS.includes(key))
  ? true
  
  // [set]keyとvalueが存在する場合で、上書き禁止の可能性があるもの
  : (key != undefined && value != undefined && GUARD_KEYS.includes(key) && force_flag)
  ? true

  // [stop]keyがなくてvalueがあるなど、想定外あるいは不正な処理の場合
  : "[Skip] key is protected."
 
  // set時のみ
  result = "Failed";
  if (message === true) {
    PropertiesService.getScriptProperties().setProperty(key, value);
    message = "[Complate:local_set] key:" +key + " / value:" + PropertiesService.getScriptProperties().getProperty(key);
    result = "Success";
  }

  // get時も実行結果としては成功なので別途判定
  if( message == PropertiesService.getScriptProperties().getProperty(key) ) {
    result = "Success";
  }

  // 入力したプロパティが表示されればOK
  __debug("開発：環境変数設定.gs/property: " + message);
  return {
    result: result,
    value: message
  };
}
