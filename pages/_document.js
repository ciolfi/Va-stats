/* This file is used to modify the DOM structure
of the app. It plays a key role in allowing proper
function of the Student Registration confirmation modal */

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <link rel="stylesheet" href="..." /> */}

        <link rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin="true" />
          
        <link rel='preload'
          as='style'
          href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap' />

        <link rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap'
          media='print'
          onLoad="this.media='all'" />

        <noscript>
          <link rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap' />
        </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* MODAL WRAPPER BELOW: INSERTS A DOM NODE */}
        <div id="modal-root"></div>
      </body>
    </Html>
  );
}
