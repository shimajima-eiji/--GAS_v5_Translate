// 送られてきた複数のテキストを処理する。単一のテキストはgetで処理する
function doPost(e) {
  const contents = JSON.parse(e.postData.contents)
  if(contents.source == undefined) contents.source="ja";
  if(contents.target == undefined) contents.target="en";
  if(contents.by == undefined) contents.by="(POST)No Data";

  // try-catchに入る前に初期値を設定しておく
  contents.translate = [];
  contents.result = false;

  let api_counter = parseInt(property("API_COUNTER").value);

  // contents.textでmapが実行された場合に実施
  try {
    contents.translate = contents.text.map(word => {
      
      // LanguageAPIの実行失敗を受けるためのtry-catch
      try{
        api_counter++;
        if(api_counter > 5000) throw '[GAS-Translate/GetPost.gs]API制限のため、処理を中断しました。';

        translate = LanguageApp.translate(word, contents.source, contents.target)
        output_sheet(word, translate, contents.by);
        contents.result = true

      // API制限だったり、翻訳に失敗した場合は翻訳したい文字をそのまま転記する
      } catch(e) {
        translate = word;
      }

      return translate;

    });

  // contents.textが配列ではない場合
  } catch(e) {

  }

  property("API_COUNTER", api_counter);
  return output_api(contents)
}
