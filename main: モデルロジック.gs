function __main(p, method = "GET") {
  // 受け取ったパラメータにtextが存在しない場合はやらない
  if(!p.text || !p.text.length) return {result: false, message: `翻訳したい単語は必須です。\n${JSON.stringify(p)}`}

  // 初期値を設定
  // parametersの場合は複数(配列=object)で渡ってくるが、text以外は全て同じ言語に翻訳する想定
  // 一括翻訳時、テキスト毎に翻訳言語を変えたい場合に対応
  let multi_pattern_flag = (() => {
    let result = false;

    // 入力がなければ初期値を入れる
    if(p.source == undefined) p.source = "ja";
    if(typeof(p.source) == "object" && p.text.length > p.source.length) p.source = p.source[0]

    if(p.target == undefined) p.target = "en";
    if(typeof(p.target) == "object" && p.text.length > p.target.length) p.target = p.target[0]

    // sourceやtargetと違いbyは変更することはないはずなので統一する
    if(p.by == undefined) p.by = "(" + method + ")No Data";
    if(typeof(p.by) == "object" && p.by.length > 0) p.by = p.by[0]

    // sourceとtargetが初期値ではない場合
    // テキスト数と翻訳指定数が一致している場合、指定に従い翻訳する
    if(typeof(p.source) == "object"
    && typeof(p.target) == "object"
    && p.text.length == p.source.length
    && p.text.length == p.target.length
    && typeof(p.by) == "object")
      result = true;
    return result;
  })();

  // API制限を確認。APIカウンター変数を書き換えないのでCONSTにする
  // メイン処理のtry-catch用に初期値を設定する
  let api_counter = parseInt(__property("API_COUNTER").value);
  let result = false;
  let text = (typeof(p.text) == "object") ? p.text :[p.text];
  p.translates = text.map((word, index) => {
    // API制限だったり、翻訳に失敗した場合は翻訳したい文字をそのまま転記するため、wordを保持する
    let translate = word;

    // LanguageAPIの実行失敗を受けるためのtry-catch
    try{
      api_counter++;
      if(api_counter > 5000) throw '[GAS-Translate/GetPost.gs]API制限のため、処理を中断しました。';

      let source = (multi_pattern_flag) ? p.source[index] : p.source;
      let target = (multi_pattern_flag) ? p.target[index] : p.target;
      // 翻訳実行
      translate = LanguageApp.translate(word, source, target)
      __output_sheet_logging(word, translate, p.by);
      result = true

    } catch(e) {
      return word;
    }
    return translate;
  });

  // 出力用にデータクレンジング
  p.result = result;
  p.translate = (typeof(p.text) == "object") ? p.translates.join("\n") :p.translates[0];

  // 今回の結果を前回値として保存する
  __property("before", JSON.stringify({
    text: text.join("\n"),
    translate: p.translate,
  }));

  // 翻訳カウンターを記録しておく
  __property("API_COUNTER", api_counter);
  return p;
}
