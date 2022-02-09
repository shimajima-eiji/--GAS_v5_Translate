function __main(p, method = "GET") {
  // 初期値を設定
  if(!p) return debug_doPost();

  if(p.source == undefined) p.source="ja";
  if(p.target == undefined) p.target="en";
  if(p.by == undefined) p.by = "(" + method + ")No Data";

  // try-catchに入る前に初期値を設定しておく
  p.translate = p.text;
  p.result = false;

  // API制限を確認。APIカウンター変数を書き換えないのでCONSTにする
  let api_counter = parseInt(__property("API_COUNTER").value);
  let loop = (typeof(p.text) == "string" ) ? [p.text] : p.text;

  let result = loop.map(word => {
    // API制限だったり、翻訳に失敗した場合は翻訳したい文字をそのまま転記するため、初期値としておく
    let translate = word;

    // LanguageAPIの実行失敗を受けるためのtry-catch
    try{
      api_counter++;
      if(api_counter > 5000) throw '[GAS-Translate/GetPost.gs]API制限のため、処理を中断しました。';

      // 翻訳実行
      translate = LanguageApp.translate(word, p.source, p.target)
      __output_sheet_logging(word, translate, p.by);
      p.result = true

    } catch(e) {}
    return translate;
  });
  if(typeof(p.text) === String ) {
    p.translate = result[0];

    // 今回の結果を前回値として保存する
    __property("before", JSON.stringify({
      text: p.text,
      translate: p.translate,
    }));

  } else {
    p.translate = result;
  }

  // 翻訳カウンターを記録しておく
  __property("API_COUNTER", api_counter);
}
