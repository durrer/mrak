function doGet() {
  const htmlTemplate = HtmlService.createTemplateFromFile("index")
  
  const htmlService = htmlTemplate
  .evaluate()
  .addMetaTag("viewport", "width=device-width, initial-scale=1.0")

return htmlService
}

function AddRecord(rec) {
  var url = "https://docs.google.com/spreadsheets/d/1NVHMj44sriICkip6XhyR4Ds9S1oFJaxxStilsUrkXNA/edit#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  var webAppSheet = ss.getSheetByName("currentData");
  webAppSheet.appendRow([
    new Date(),
    rec.user,
    rec.firstName,
    rec.surname,
    rec.subject,
    rec.dodavatel,
    rec.rozpocet,
    rec.polozka,
    rec.price,
    rec.dph,
    rec.date,
  ]);
}

function getBudgets(){
  const url = "https://docs.google.com/spreadsheets/d/1W-3u3OHTQywjlKl4PZosCBOVSORMrJ9T2bscEPzD01g/edit#gid=0";
  const ss = SpreadsheetApp.openByUrl(url);
  const sheets = ss.getSheets();

  const rozpocty = sheets.map(sheet => {
    const numberOfCols = 2;
    const rows = sheet.getRange(1, 1, sheet.getLastRow(), numberOfCols).getValues();

    return [sheet.getName(), rows.map(r => ({ name: r[0], price: r[1] }))];
  });

  return Object.fromEntries(rozpocty);
}

function getUser(){
  const activeUser = Session.getActiveUser().getEmail();
  return activeUser;
}

function getSuppliers(){
  /*
  const url1 = "https://docs.google.com/spreadsheets/d/1qLVby3hURGmm8tu3V521oEMvopACx51O865D9stuAkQ/edit#gid=0";
  const ss1 = SpreadsheetApp.openByUrl(url1);
  const sheet1 = ss1.getSheetByName("currentData");
  const rows1 = sheet1.getRange(1, 1, sheet1.getLastRow()).getValues();
  const res1 = rows1.map(r => ({ name: r[0]}));
*/

  const url2 = "https://docs.google.com/spreadsheets/d/1NVHMj44sriICkip6XhyR4Ds9S1oFJaxxStilsUrkXNA/edit#gid=0";
  const ss2 = SpreadsheetApp.openByUrl(url2);
  const sheet2 = ss2.getSheetByName("currentData");
  const rows2 = sheet2.getRange(1, 6, sheet2.getLastRow()).getValues();
  const res2 = rows2.map(r => ({ name: r[0]}));
 
  return res2;
}

function getMyRecords(){
  const url = "https://docs.google.com/spreadsheets/d/1NVHMj44sriICkip6XhyR4Ds9S1oFJaxxStilsUrkXNA/edit#gid=0";
  const ss = SpreadsheetApp.openByUrl(url);
  const sheet = ss.getSheetByName("currentData");
  const rows = sheet.getRange(1,1,sheet.getLastRow(),11).getValues();
  const res = rows.map(r => ({ 
    item: r[4],
    price: r[8]
  }));
  return res;
}