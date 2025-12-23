import React from 'react';

export const Privacy = () => (
  <div className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
    <h1>Privacybeleid</h1>
    <p>Laatst bijgewerkt: Vandaag.</p>
    <p>Wij geven om je data. Punt.</p>
    
    <h3>Welke data verzamelen we?</h3>
    <ul>
      <li>De URL die je invult.</li>
      <li>De antwoorden die je geeft in de wizard.</li>
      <li>Betalingsstatus (via onze provider, wij slaan geen CC gegevens op).</li>
    </ul>

    <h3>Wat doen we ermee?</h3>
    <p>We gebruiken deze data enkel om het rapport te genereren. We verkopen je data niet aan derden.</p>
    
    <h3>Opslag</h3>
    <p>Voor de werking van de tool gebruiken we 'Local Storage' in je browser. Als je je browsergegevens wist, ben je je rapport kwijt (tenzij je de PDF hebt gedownload).</p>
  </div>
);