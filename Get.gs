// 送られてきた１テキストを処理する。複数のテキストはpostで処理する
function doGet(e) {
  const p = e.parameter;

  // 翻訳処理用
  if(! p.extension) {

    if(p.source == undefined) p.source="en";
    if(p.target == undefined) p.target="en";
    if(p.by == undefined) p.by="(GET)No Data";

    // try-catchに入る前に初期値を設定しておく
    p.translate = p.text;
    p.result = false;

    const API_COUNTER = parseInt(property("API_COUNTER").value);
    try{
      if(API_COUNTER > 5000) throw '[GAS-Translate/GetPost.gs]API制限のため、処理を中断しました。';

      // 翻訳実行
      p.translate = LanguageApp.translate(p.text, p.source, p.target);
      p.result = true;

      // 翻訳カウンターを回して結果を記録しておく
      property("API_COUNTER", API_COUNTER + 1);
      output_sheet(p.text, p.translate, p.by);

      // 
      let toJson = '{'
      + '"text": "' + p.text + '",'
      + '"translate": "' + p.translate + '"'
      + '}'
      property("before", toJson);
      
    } catch(e) {
      // エラーメッセージを格納する
      p.error = e;
    }

    return output_api(p);

  // 拡張機能を開いた時の履歴
  } else {
    return output_api(JSON.parse(property("before").value));
  }
}