// 送られてきた複数のテキストを処理する。単一のテキストはgetで処理する
function doPost(e) {
  // デバッグモード時はデータを保存する
  if(__property("DEBUG").value == "true")
    __output_sheet_debug(e);

  return __output_api(
    (!e || !e.postData || !e.postData.contents || JSON.parse(e.postData.contents).length == 0)

    // おそらくないはず
    ? {result: false, message: "データフォーマットが不正です。"}

    // 翻訳処理を実施した結果を取得
    : __main(JSON.parse(e.postData.contents)[0], "POST")
  );
}
