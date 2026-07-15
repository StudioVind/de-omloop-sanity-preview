# De Omloop – Sanity live preview

Testwebsite voor De Omloop met:

- inhoud uit Sanity;
- een ingebouwde Sanity Studio op `/studio`;
- Presentation Tool met live concept-preview;
- klik-op-de-pagina-om-het-veld-te-openen;
- automatische verversing na publiceren.

## Online instellen

Zet deze variabelen in Vercel:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=meb1vaxj
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://jouw-vercel-adres.vercel.app
NEXT_PUBLIC_STUDIO_URL=https://jouw-vercel-adres.vercel.app/studio
SANITY_API_READ_TOKEN=<Sanity Viewer token>
```

De `SANITY_API_READ_TOKEN` hoort uitsluitend in Vercel en nooit in GitHub.

## Lokaal

Kopieer `.env.example` naar `.env.local`, vul het Viewer-token in en start met:

```bash
npm install
npm run dev
```
