function doGet(e) {
  return HtmlService.createHtmlOutput("✅ Web App is running...");
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents); // Parse JSON from fetch()

    // Append name, score, timestamp
    sheet.appendRow([data.name || '', data.score || '', new Date()]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Data saved successfully" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
