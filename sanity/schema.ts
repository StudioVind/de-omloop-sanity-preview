import {defineArrayMember, defineField, defineType} from 'sanity'

export const sitePage = defineType({
  name: 'sitePage',
  title: 'Website-inhoud',
  type: 'document',
  fields: [
    defineField({name: 'internalTitle', title: 'Naam in het beheer', type: 'string'}),
    defineField({
      name: 'hero', title: 'Bovenkant van de homepage', type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Kleine bovenregel', type: 'string'}),
        defineField({name: 'titleLine1', title: 'Kop – regel 1', type: 'string'}),
        defineField({name: 'titleLine2', title: 'Kop – regel 2', type: 'string'}),
        defineField({name: 'text', title: 'Introductietekst', type: 'text', rows: 3}),
        defineField({
          name: 'image', title: 'Grote afbeelding', type: 'image', options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Beschrijving voor toegankelijkheid', type: 'string'})],
        }),
      ],
    }),
    defineField({
      name: 'introduction', title: 'Ons verhaal', type: 'object',
      fields: [
        defineField({name: 'label', title: 'Kleine bovenregel', type: 'string'}),
        defineField({name: 'title', title: 'Kop', type: 'string'}),
        defineField({name: 'emphasis', title: 'Schuingedrukte kopregel', type: 'string'}),
        defineField({name: 'text', title: 'Tekst', type: 'text', rows: 4}),
        defineField({name: 'noteTitle', title: 'Titel van het briefje', type: 'string'}),
        defineField({name: 'noteText', title: 'Tekst op het briefje', type: 'text', rows: 3}),
      ],
    }),
    defineField({
      name: 'workshop', title: 'Werkplaats', type: 'object',
      fields: [
        defineField({name: 'label', title: 'Kleine bovenregel', type: 'string'}),
        defineField({name: 'title', title: 'Kop', type: 'string'}),
        defineField({name: 'text', title: 'Introductietekst', type: 'text', rows: 3}),
        defineField({
          name: 'services', title: 'Diensten', type: 'array',
          of: [defineArrayMember({
            type: 'object',
            fields: [
              defineField({name: 'title', title: 'Naam', type: 'string'}),
              defineField({name: 'description', title: 'Omschrijving', type: 'text', rows: 2}),
              defineField({name: 'pricePrefix', title: 'Tekst vóór de prijs', type: 'string'}),
              defineField({name: 'price', title: 'Prijs', type: 'string'}),
            ],
            preview: {select: {title: 'title', subtitle: 'price'}},
          })],
        }),
      ],
    }),
    defineField({
      name: 'ride', title: 'Fietsrit', type: 'object',
      fields: [
        defineField({name: 'label', title: 'Kleine bovenregel', type: 'string'}),
        defineField({name: 'title', title: 'Kop', type: 'string'}),
        defineField({name: 'text', title: 'Uitleg', type: 'text', rows: 4}),
        defineField({name: 'date', title: 'Volgende rit', type: 'string'}),
        defineField({name: 'distance', title: 'Afstand', type: 'string'}),
        defineField({name: 'elevation', title: 'Hoogtemeters', type: 'string'}),
      ],
    }),
    defineField({
      name: 'booking', title: 'Afspraak maken', type: 'object',
      fields: [
        defineField({name: 'label', title: 'Kleine bovenregel', type: 'string'}),
        defineField({name: 'title', title: 'Kop', type: 'string'}),
        defineField({name: 'text', title: 'Uitleg', type: 'text', rows: 3}),
      ],
    }),
    defineField({
      name: 'contact', title: 'Contactgegevens', type: 'object',
      fields: [
        defineField({name: 'address', title: 'Adres', type: 'text', rows: 2}),
        defineField({name: 'openingHours', title: 'Openingstijden', type: 'text', rows: 2}),
        defineField({name: 'email', title: 'E-mailadres', type: 'string'}),
        defineField({name: 'phone', title: 'Telefoonnummer', type: 'string'}),
      ],
    }),
  ],
  preview: {select: {title: 'internalTitle'}},
})

export const schemaTypes = [sitePage]
