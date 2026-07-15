'use client'

import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {dataset, projectId, siteUrl} from './sanity/env'
import {schemaTypes} from './sanity/schema'

export default defineConfig({
  name: 'default',
  title: 'De Omloop – websitebeheer',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        origin: siteUrl,
        previewMode: {enable: '/api/draft-mode/enable'},
      },
    }),
  ],
  schema: {types: schemaTypes},
})
