import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";

export const fetchLocalFile = async (path) => {
  return await (await fetch("/" + path)).arrayBuffer();
};

export const loadPDFDoc = async (path) => {
  const pdfbytes = await fetchLocalFile(path);
  return await PDFDocument.load(pdfbytes);
};

export const listDocFields = (pdfDoc) => {
  const fields = pdfDoc.getForm().getFields();

  fields.forEach((field) => {
    const type = field.constructor.name;
    const name = field.getName();
    console.log(`${type}: ${name}`);
  }, []);
};

export const addPageAndText = async (pdfDoc) => {
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const page = pdfDoc.addPage();

  // Get the width and height of the page
  var { width, height } = page.getSize();

  // Draw a string of text toward the top of the page
  const fontSize = 30;
  page.drawText("Creating PDFs in JavaScript is awesome!", {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  });
};

export const addTextToExistingPage = async (pdfDoc) => {
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Get the width and height of the first page
  var { width, height } = firstPage.getSize();

  // Draw a string of text diagonally across the first page
  firstPage.drawText("This text was added with JavaScript!", {
    x: 5,
    y: height / 2 + 300,
    size: 50,
    font: helveticaFont,
    color: rgb(0.1, 0.1, 0.1),
    rotate: degrees(-45),
  });
};

export const createObjectURL = async (pdfDoc) => {
  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  return URL.createObjectURL(blob);
};
