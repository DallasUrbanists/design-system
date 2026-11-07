# Extraction record

- Source: DallasUrbanists/idea-map commit `f9f490e33d29a2acd7ab1ff0d02dc748002a8eb3`, Apache-2.0.
- Shared: reusable Vue controls and layouts, provider-neutral layout/tray logic,
  canonical token CSS, Figtree, synthetic map surface, reusable stories and checks.
- Retained in Idea Map: Google Maps adapter and canvas, Lordicon player and
  licensed artwork, product journey and map fixtures.
- Figtree: SIL Open Font License 1.1, included as `FIGTREE-LICENSE.txt`; its
  font assets are bundled into the stylesheet. Lucide: ISC-licensed external
  runtime package `@lucide/vue`. Microsoft Fluent Emoji samples: MIT license,
  with the license text alongside the catalog and in its static license folder.
- The static catalog also includes Storybook's MIT-licensed code and its Nunito
  Sans manager fonts under the SIL Open Font License 1.1. The static license
  directory includes their license texts and Lucide's. A conservative
  `THIRD-PARTY-NOTICES.txt` includes identified bundled manager and preview
  dependencies; its coverage still requires review before upload.
- The catalog includes the library's Apache-2.0 license and project notices.
  Its build verifies that those copies match the root `LICENSE` and `NOTICE.md`.
- Storybook 10.6.5 embeds `use-composed-ref`, whose applicable copyright notice
  could not be verified. The static build removes that helper from its manager
  and preview inputs and uses Storybook's existing MIT-licensed Radix
  compose-refs hook instead. Exact input hashes and an output scan fail the
  build on unreviewed changes. The locally served development catalog is not
  a publication artifact.
- The npm allowlist contains built ESM, declaration files, styles, README,
  Apache license, and notices; source stories and the catalog are excluded.
- Before publication review the source, built catalog, and final npm archive
  for rights, private data, provider assets and secrets. The local trial and
  installation/account files are excluded from the candidate.

The local candidate does not establish permission to publish any artifact;
review and explicit maintainer authorization are required at release.
