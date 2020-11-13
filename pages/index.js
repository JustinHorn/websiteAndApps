import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Document, Page, pdfjs } from "react-pdf";
import { loadPDFDoc, listDocFields, createObjectURL } from "helper/pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const isServer = () => typeof window === "undefined";

function Home() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const [l, setL] = useState("");
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  useEffect(async () => {
    const pdfDoc = await loadPDFDoc("anmeldung.pdf");
    listDocFields(pdfDoc);

    const fields = pdfDoc.getForm().getFields();
    const textField = pdfDoc
      .getForm()
      .getTextField("Familienstand 1oder 1 und 2Row1");
    ref1.current = textField;
    ref2.current = pdfDoc;
  }, []);

  const [v, setV] = useState("");

  return (
    <div className={styles.container}>
      <Head>
        <title>Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <input type="text" value={v} onChange={(e) => setV(e.target.value)} />
      <button
        onClick={async (e) => {
          ref1.current.setText(v);

          const objUrl = await createObjectURL(ref2.current);

          const a = document.createElement("a");
          a.href = objUrl;
          a.click();
        }}
      >
        create
      </button>

      <main className={styles.main}>
        <a id="my_iframe" href={l}>
          Download
        </a>

        <h1>Hi!</h1>
        <button onClick={() => setPageNumber(pageNumber + 1)}>nextPage</button>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export default Home;
