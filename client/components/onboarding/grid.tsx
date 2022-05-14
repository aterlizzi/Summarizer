import React from "react";
import styles from "../../styles/Onboarding.module.scss";
import Tier from "./tier";

function Grid() {
  return (
    <section className={styles.grid}>
      <Tier
        reversed={true}
        title={"Summarize Entire Page"}
        data={"hi"}
        para={
          'You can summarize entire pages of text by simply clicking the extension icon in your Google Chrome and clicking "summarize." This is the default function'
        }
        steps={[
          "Click extension icon",
          'Optionally click "sumarize entire article"',
          'Click the "Summarize" button at the bottom of window',
        ]}
        prem={false}
      />
      <Tier
        reversed={false}
        title={"Summarize Highlighted Text"}
        data={"hi"}
        para={
          "Summarize text you highlight on a webpage by simply clicking and dragging the cursor over words.  Then click “summarize highlighted” on the extension and click the summarize button. Try it on this paragraph!"
        }
        steps={[
          "Highlight desired text",
          'Click extension icon and "summarize highlighted"',
          "Click the “Summarize” button at the bottom of window",
        ]}
        prem={false}
      />
      <Tier
        reversed={true}
        title={"Summarize PDF"}
        data={"hi"}
        para={
          "You can easily summarize pdfs by clicking the pdf option on the extension and uploading your pdf. Once it’s uploaded you can press “summarize” and your pdf will be summarized."
        }
        steps={[
          "Click extension icon",
          'Click "summarize pdf" and upload valid pdf file',
          'Click the "Summarize" button at the bottom of window',
        ]}
        prem={true}
      />
      <Tier
        reversed={false}
        title={"Summarize Manual Text"}
        data={"hi"}
        para={
          "You can also submit your own text through the manual text submission. Simply click manual text, and type in the text you want to summarize. Then click summarize."
        }
        steps={[
          "Click extension icon",
          'Click "manual text submission" and type in desired text',
          'Click the "Summarize" button at the bottom of the window',
        ]}
        prem={true}
      />
    </section>
  );
}

export default Grid;
