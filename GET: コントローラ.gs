// 送られてきた１テキストを処理する。複数のテキストはpostで処理する
function doGet(e) {
  // デバッグモード時はデータを保存する
  if(__property("DEBUG").value == "true")
    __output_sheet_debug(JSON.stringify(e));

  try {
    return __output_api(
      (!e || !e.parameter || !Object.keys(e.parameter).length)

      // データが存在しない場合
      ? {result: false, message: `データが存在しません。\n${JSON.stringify(e)}`}

      // データが正しい時に、後述の通り処理される
      : (e.parameter.extension)

        // 拡張機能を開いた時の履歴を取得する
        ? JSON.parse(__property("before").value)

        // 翻訳処理を実施し、結果を取得する
        : __main(e.parameters)
    );
  } catch(e) {
    return __output_api({result: false, message: `データフォーマットが不正です。\n${JSON.stringify(e)}`});
  }
}