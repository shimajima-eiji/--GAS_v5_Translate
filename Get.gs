// 送られてきた１テキストを処理する。複数のテキストはpostで処理する
function doGet(e) {
  const p = e.parameter;
  if(p.source == undefined) p.source="en";
  if(p.target == undefined) p.target="en";

  // try-catchに入る前に初期値を設定しておく
  p.translate = p.text;
  p.result = false;

  const API_COUNTER = parseInt(property("API_COUNTER").message);
  try{
    if(API_COUNTER > 5000) throw '[GAS-Translate/GetPost.gs]API制限のため、処理を中断しました。';

    // 翻訳実行
    p.translate = LanguageApp.translate(p.text, p.source, p.target);
    p.result = true;

    // 翻訳カウンターを回して結果を記録しておく
    property("API_COUNTER", API_COUNTER + 1);
    output_sheet(p.text, p.translate);
    
  } catch(e) {
    // エラーメッセージを格納する
    p.error = e;
  }

  return output_api(p);
}