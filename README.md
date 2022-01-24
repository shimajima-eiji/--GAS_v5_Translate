# 翻訳API(GAS)
後述していますが、色々と使いやすいので教材として使ってます。

## 受講生へ。ここはメインブランチです。教材データは以下に置いてあります。
[受講生はfor_studentブランチに教材を置いています。](https://github.com/shimajima-eiji/--GAS_v5_Translate/tree/for_student)
https://github.com/shimajima-eiji/--GAS_v5_Translate/tree/for_student

実際に業務でも運用しているものなので、非常に参考になるはずです。

### `Step: Google Apps Scripts(GAS)で翻訳サービスを作る`
開発の余地を多く残していますが、基礎編と比べると難しいステップです。<br />
いきなり学習・改修に入る前に、まずはGASの使い方を振り返りましょう。<br />
コツは、まずは小さく作ってデバッグしていくことです。

GASのWebエディターはデバッグ機能が弱い（というか、事実上ないようなもの）なので、どうやってデバッグするか考えておきましょう。<br />
慣れていないうちはprintデバッグがおすすめです。

---

## 使い方
### リクエスト
|キー|値の概要|必須|デフォルト|
|---|----|---|-------|
|text|翻訳したい文字|必須||
|source|翻訳する言語||ja(日本語)|
|target|翻訳したい言語||en(英語)|
|by|ロギングのため、送信元を表記||(GET/POST)No Data|
|extension|true/false|||

### レスポンス
以下を追記してパラメータを返します。

|キー|値の概要|
|---|---|
|translate|textを翻訳した結果|
|result|true/false|
|error|result==falseのみ。実行に失敗した場合のメッセージ|
