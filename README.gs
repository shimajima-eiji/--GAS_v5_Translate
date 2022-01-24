function check_apicounter() {
  property("API_COUNTER");
}

/*
## 経緯
GithubActionsで翻訳させると1リクエストにつきAPI制限がかかるため、これを回避するための措置が必要になった。

## 主要リンク
- [リポジトリ](https://github.com/shimajima-eiji/--GAS_v5_Translate)
- [Gdrive:ディレクトリ](https://drive.google.com/drive/my-drive)
- [Gdrive:スクリプト](https://script.google.com/home)
- [Gdrive:スプレッドシート](https://docs.google.com/spreadsheets)

## バージョン
- README: ver1.0.2022.01.17
- 開発:環境変数設定: https://github.com/shimajima-eiji/--GAS_v5_GetPost-Debug/blob/main/%E9%96%8B%E7%99%BA%EF%BC%9A%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0%E8%A8%AD%E5%AE%9A.gs

## 制限
1日につき5000リクエストの上限がある
クリアされるタイミングは不明(JSTとかUTCとか)

## 環境変数
|key|value|用途|備考|
|---|---|---|---|
|SSID|spreadsheet_id|||
|SSNAME|spreadsheet_name|||
|API_COUNTER|0|API制限監視用||

## デバッガ
### Get.gs
```
function debug_doGet() {
  const e = {}
  e.parameter = {
    text: "GASで変換するもの",
    source: "ja",
    target: "en",
    by: "GASでデバッグ中",
    extension: true  // 拡張機能からの呼び出しを想定
  };
  // property("API_COUNTER", "0");
  Logger.log(doGet(e));
}
```

## パラメータ
### doGet引数
|リクエストボディ|必須|概要|
|---|---|---|
|?text=(文字列)|Required|翻訳したいテキスト|
|&source=(en or ja)|Option(en)|翻訳したいテキストの言語|
|&target=(en or ja)|Option(en)|翻訳したい言語|

### 戻り値
JSON形式

|パラメータ|動作|出力例|
|---|---|---|
|text|get|input text|
|source|get|input source|
|target|get|input target|
|translate|get|result test|
|result|get|true / false|
|error|get|error message|

## READMEフォーマットのバージョン
ver2022.01.17
*/
