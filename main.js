// @ts-nocheck
function api(collectionName, itemId) {
  const response = UrlFetchApp.fetch("https://swapi.dev/api/" + collectionName  + "/" + itemId);
  const jsonContent = JSON.parse(response.getContentText())
  return jsonContent;
}

function writeInSheet() {
  const sheet = SpreadsheetApp.getActiveSheet();
  for (var i = 1; i < 10; i++) {
    sheet.appendRow([api("planets", i), i]);
  }
}