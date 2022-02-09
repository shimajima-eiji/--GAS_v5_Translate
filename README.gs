/*
## 経緯
GithubActionsで翻訳させると1リクエストにつきAPI制限がかかるため、これを回避するための措置が必要になった。

## 主要リンク
- [リポジトリ](https://github.com/shimajima-eiji/--GAS_v5_Translate)
  - [テンプレート](https://github.com/shimajima-eiji/--GAS_v5_Template)
- [Gdrive:ディレクトリ](https://drive.google.com/drive/my-drive)
- [Gdrive:スクリプト](https://script.google.com/home)
- [Gdrive:スプレッドシート](https://docs.google.com/spreadsheets)

## システムバージョン
ver1.0.0

## 制限
1日につき5000リクエストの上限がある
クリアされるタイミングは不明(JSTとかUTCとか)

## 環境変数
|key|value|用途|備考|
|---|-----|---|----|
|SSID|スプレッドシートID|デバッグ用シート||
|SSNAME|シート名|デバッグ用シート||
|ACCESS_TOKEN|チャネルアクセストークン|動作対象のLINEBOT||
|DEBUG|(true / false)|デバッグフラグ。デバッグシートに反映させるために使用||
|SSID_DEBUG|スプレッドシートID|デバッグ用シート||
|SSNAME_DEBUG|シート名|デバッグ用シート||
|DEBUG_ID|userId/groupId|デバッグ用アカウント。開発者の個人LINEなど||

## デバッガ
```
function debug_doGet() {
  const e = {}
  e.parameter = {
    text: "GASで変換するもの(GET)",
    source: "ja",
    target: "en",
    by: "GASでデバッグ中",
    extension: false  // 拡張機能からの呼び出しを想定
  };
  // property("API_COUNTER", "0");
  doGet(e);
}

function debug_doPost() {
  const e = {
    postData: {
      contents: JSON.stringify([{
          text: ["GASで変換するもの(POST)"],
          source: "ja",
          target: "en",
          by: "GASでデバッグ中",
          extension: true  // 拡張機能からの呼び出しを想定
        }]
      )
    }
  };
  // property("API_COUNTER", "0");
  doPost(e);
}
```

## パラメータ
### doGet / doPost
LINEの標準入力に準拠するが、他の入力にも拡張で対応できる

#### リクエスト
|キー|キー必須|デフォルト値|想定される値|概要|
|---|-------|----------|---|
|text|必須|なし|2byte String|翻訳前の単語。sourceに対応|
|source||ja|enやjaなど|翻訳する言語。textの言語を指定|
|target||en|enやjaなど|翻訳したい言語。textがtargetに変換される|

#### レスポンス
レスポンスはJSON String形式

|キー|欠損の可能性|想定される値|概要|
|---|----------|----------|----|
|text|なし|2byte String|リクエストのtext|
|source|なし|enやjaなど|リクエストのsource|
|target|なし|enやjaなど|リクエストのtarget|
|translate|なし|2byte String|翻訳後の単語。targetに対応|
|result|なし|String|true / false|
|error|あり|String|resultがfalse時のメッセージ|

## システム管理情報
| システム名称                 | 情報             |
| -------------------------- | --------------- |
| READMEフォーマットのバージョン | ver1.2022.02.09 |
| README.gs -> README.md     | https://github.com/shimajima-eiji/--GAS_v5_Template/blob/main/.github/workflows/convert_gs2md.yml |
| translate ja -> en         | https://github.com/shimajima-eiji/--GAS_v5_Template/blob/main/.github/workflows/translate_ja2en.yml |

*/