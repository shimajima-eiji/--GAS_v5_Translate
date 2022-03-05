// 送られてきた複数のテキストを処理する。単一のテキストはgetで処理する
function doPost(e) {
  // デバッグモード時はデータを保存する
  if(__property("DEBUG").value == "true")
    __output_sheet_debug(e.parameter);

  try{
    const contents = JSON.parse(e)
    return __output_api(
      (!e || !e.postData || !e.postData.contents || JSON.parse(e.postData.contents).length == 0)

      // データが存在しない場合
      ? {result: false, message: `データが存在しません。\n${JSON.stringify(e)}`}

      // 翻訳処理を実施した結果を取得
      : __main((Array.isArray(contents) ? contents[0] : contents), "POST")
    );
  } catch(e) {
    return __output_api({result: false, message: "データフォーマットが不正です。"});
  }
}
