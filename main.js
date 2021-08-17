// @ts-nocheck
/* USER INTERFACE */
function menu() {
  const ui = SpreadsheetApp.getUi()
  const menu =  ui.createMenu("Refresh")
  menu.addItem("Get data from API", "writeTextInSheet")
  menu.addToUi()
}
function onOpen() {
  menu()
}

/* TEXT UTILS */
function sliceContentToTable(textContent) {
    const dataTable = textContent.slice(1, textContent.length - 1).split(",")
    return dataTable
}
function selectedItemFromTable(dataTable) {
  const selectedItems = dataTable.slice(0, 12)
  selectedItems[12] = "  "
  return selectedItems
}

function clean(textContent) {
  return textContent.replaceAll("\"", "")
}

/* PROCESSING DATA */
const API_NAME = "https://swapi.dev/api/"

function api(collectionName, itemId) {
  const response = UrlFetchApp.fetch(API_NAME + collectionName  + "/" + itemId);
  const textContent = response.getContentText()
  return selectedItemFromTable(
    sliceContentToTable(clean(textContent))
  )  
}

/* WRITE DATA ON SHEET */
const sheet = SpreadsheetApp.getActiveSheet();

function getValueFromCell(cellName) {
  return sheet.getRange(cellName).getValue();
}

const collectionId = getValueFromCell('D2')
const collectionName = getValueFromCell('D1')

function writeTextInSheet() {
  const collectionData = api(collectionName, collectionId);
  collectionData.forEach(item => {
    sheet.appendRow([item]);
  });
}