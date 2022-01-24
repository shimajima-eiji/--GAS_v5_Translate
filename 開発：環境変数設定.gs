// 新エディタで作成する場合、GUIでプロパティを追加できないらしく不便なので、開発専用の関数を用意した。
// 他プロジェクトでも使いまわそう。

/* 開発中に間違えて実行すると悲惨なので、コメントアウトしておく(1敗)
function initialize() {
  property("SSID", "spreadsheet_id", true)
  property("SSNAME", "spreadsheet_name", true);
  property("API_COUNTER", "0", true);
}
// */

const GUARD_KEYS = [
  "SSID",
  "SSNAME"
];

function property(key, value, force_flag=false) {
  let message = 
  // 変えたり見られてはいけないキーが含まれていた場合、処理を中断する
  // force_flagはリリース時には削除しておく
  // (force_flag == false && GUARD_KEYS.includes(key) === true )
  (GUARD_KEYS.includes(key) === true )
  ? "[Skip] key is protected."

  // [stop]keyもvalueもない
  : (key == undefined && value == undefined) 
  ? "[Stop:環境変数設定.property] Required key(get). Optional value(set)"

  // [get]keyだけの場合
  : (key != undefined && value == undefined)
  ? PropertiesService.getScriptProperties().getProperty(key)

  // [set]keyとvalueが存在する場合
  : (key != undefined && value != undefined)
  ? true
  
  // [stop]keyがなくてvalueがあるなど、想定外あるいは不正な処理の場合
  : "[Stop:環境変数設定.property] Illegal pattern.";
  
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
  Logger.log("開発：環境変数設定.gs/property: " + message);
  return {
    result: result,
    value: message
  };
}