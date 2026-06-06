// Google Apps Script — วางโค้ดนี้ใน Google Apps Script แล้ว Deploy เป็น Web App
// วิธีใช้:
// 1. เปิด https://script.google.com → New Project
// 2. วางโค้ดนี้ทั้งหมด
// 3. แก้ SHEET_ID ให้ตรงกับ Google Sheet ของคุณ
// 4. Deploy → New Deployment → Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 5. คัดลอก URL แล้ววางใน index.html ที่ SCRIPT_URL

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // แก้ตรงนี้
const SHEET_NAME = 'Orders'; // ชื่อ sheet tab

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'ชื่อ', 'รายการอาหาร', 'หมายเหตุ']);
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
    }

    sheet.appendRow([data.timestamp, data.name, data.order, data.note || '']);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('Food Order Script is running.');
}
