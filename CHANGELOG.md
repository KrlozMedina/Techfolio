# Changelog

## [4.0.0](https://github.com/KrlozMedina/Techfolio/compare/techfolio-v3.1.0...techfolio-v4.0.0) (2026-03-08)


### ⚠ BREAKING CHANGES

* **styles:** Renamed and restructured CSS variables. Existing components must update variable references.
* **projects:** Project API enums and ObjectIds updated. Clients must update integration accordingly.

### Features

* **auth:** add RBAC roles and JWT tokens for users ([d908eb7](https://github.com/KrlozMedina/Techfolio/commit/d908eb795f47b4db43071deafdfe9b23f615c0f0))
* **categories:** add categories API with models, DTOs, mappers and services ([9dfb2af](https://github.com/KrlozMedina/Techfolio/commit/9dfb2af736931c5b684b896256ef3277fad83f33))
* **category-api:** change category JSON response structure ([1f4bf97](https://github.com/KrlozMedina/Techfolio/commit/1f4bf97b010e1eede4123d6a9b2b05bc4b69189c))
* **category-api:** change category JSON response structure ([1c6a489](https://github.com/KrlozMedina/Techfolio/commit/1c6a489937a98c4bd0632544c6447b93bbaa3bbb))
* **category-api:** change category JSON response structure ([897f3b0](https://github.com/KrlozMedina/Techfolio/commit/897f3b087757004f367a2fb99d3edf88cadbff75))
* **features:** add features API with models, DTOs, mapper and routes ([570a267](https://github.com/KrlozMedina/Techfolio/commit/570a26719741bd5f952e3d1d07d222957293101a))
* **features:** implement features API with models, DTOs, mapper and routes ([470e733](https://github.com/KrlozMedina/Techfolio/commit/470e7334de5d52b89cc196a9df33977c88d214f8))
* **home:** update main portfolio page with components and styles ([fbe53e3](https://github.com/KrlozMedina/Techfolio/commit/fbe53e3c4378dbdec0e25968cca588920ee23c4d))
* **projects:** add filters, summary endpoint and get-by-slug ([9bb6e31](https://github.com/KrlozMedina/Techfolio/commit/9bb6e31f5bccfa10e759f564200d069852449b2b))
* **projects:** add projects page with modal, slug route and i18n ([2aa844a](https://github.com/KrlozMedina/Techfolio/commit/2aa844a581332fd29dbbc623b610cf655ce0f607))
* **projects:** add projects page with modal, slug route and i18n ([3a84830](https://github.com/KrlozMedina/Techfolio/commit/3a8483099c2d3037d03e6b6076bedab58c352ebc))
* **projects:** implement full projects API with models, DTOs, mapper, routes, enums and ObjectIds ([d7f1408](https://github.com/KrlozMedina/Techfolio/commit/d7f1408bd4381b8761ff5c903a79b624c053a599)), closes [#60](https://github.com/KrlozMedina/Techfolio/issues/60)
* **rbac:** implement role-based access control ([eb7b2cd](https://github.com/KrlozMedina/Techfolio/commit/eb7b2cdb6c03590462f7da0fc59fdbd59f0be402))
* **styles:** add design tokens and light/dark theme variables ([6e00f9b](https://github.com/KrlozMedina/Techfolio/commit/6e00f9b65348c68a1394ca624af4cf996c6d227d))
* **success-case:** add success-case API with models, DTOs and services ([5fae0d9](https://github.com/KrlozMedina/Techfolio/commit/5fae0d914e202e4ded6ad039c6bb20c0d378303a))
* **technologies:** add technologies API with models, DTOs, mapper and routes ([adc7964](https://github.com/KrlozMedina/Techfolio/commit/adc7964e13eaf71e1b9ac7909bdb76b97c2d1658))
* **ui:** update loading, error and not-found pages and validate metadata ([395952d](https://github.com/KrlozMedina/Techfolio/commit/395952d7875da7b6160e37b44b40df9c9ffa6634))


### Bug Fixes

* **projects:** rename Projects.model.ts to project.model.ts for Vercel compatibility ([dec3e04](https://github.com/KrlozMedina/Techfolio/commit/dec3e047b01e06c8f5dbcaa25599cd4f10b4a608))

## [3.1.0](https://github.com/KrlozMedina/Techfolio/compare/techfolio-v3.0.0...techfolio-v3.1.0) (2026-01-02)


### Features

* **i18n:** add multi-language support (es/en) ([cd4bd78](https://github.com/KrlozMedina/Techfolio/commit/cd4bd78fbfbafd51853c6e91790c4eec34d7b9a6))


### Bug Fixes

* **build:** fail build in vercel ([d429453](https://github.com/KrlozMedina/Techfolio/commit/d429453ae7511ec7e1b51e00c6e05236b714eaa6))
* **build:** fix module resolution error in AuthLayout ([b4c9ef7](https://github.com/KrlozMedina/Techfolio/commit/b4c9ef76cfa7a4530a97d83d305963f50058fb7f))
* **build:** fix module resolution error in AuthLayout ([e15768c](https://github.com/KrlozMedina/Techfolio/commit/e15768c727093d90b6ffdcb556368f74277257ae))
* **i18n:** fix compilation errors caused by i18n implementation ([b7a026a](https://github.com/KrlozMedina/Techfolio/commit/b7a026afd2aff8b9ee24ad785cf6e24907646e67))
* **vercel:** fix Vercel build compilation errors ([aeb223b](https://github.com/KrlozMedina/Techfolio/commit/aeb223bf4f7042966d8bc079e278ef8ca7de48f8))

## [3.0.0](https://github.com/KrlozMedina/Techfolio/compare/techfolio-v2.2.0...techfolio-v3.0.0) (2025-12-24)


### ⚠ BREAKING CHANGES

* test for release-please
* change file for dev
* modify files release-please for dev and main
* modify release-please for dev and main
* release-please.yml for dev and main

### Features

* add user profile page ([1fa4df5](https://github.com/KrlozMedina/Techfolio/commit/1fa4df5df5aaab869c90d52da7be66e1f0c438b9))
* **api-v2:** implementación de CRUD con filtros y soporte de idioma en la API de proyectos ([8f49600](https://github.com/KrlozMedina/Techfolio/commit/8f49600feb72114c592935a4b4d26e3e5145e0ac))
* **auth, menu, templates:** protección de rutas API, menú adaptativo y asignación de templates ([f64f0ff](https://github.com/KrlozMedina/Techfolio/commit/f64f0ffbd1e78147925b4c98f3bf117fb2e08291))
* **auth:** creación de middleware para protección de rutas y validación de token ([efa9b8a](https://github.com/KrlozMedina/Techfolio/commit/efa9b8ab37195711d679206ff2b44854f740a093))
* **layout, components:** creación de header, footer, modificación de sidebar y nuevo template ([15bcc0e](https://github.com/KrlozMedina/Techfolio/commit/15bcc0e35b3fc0bb7888a260520ee911cef07398))
* **middleware, ui:** configuración dinámica de middleware y avatares para páginas de estado ([0cc03ee](https://github.com/KrlozMedina/Techfolio/commit/0cc03eebb7d17cb4f314c3927021ef414a14b348))
* **release:** actualiza el manifiesto de Release Please para manejar versiones específicas por rama ([b13f1f3](https://github.com/KrlozMedina/Techfolio/commit/b13f1f32a1785400dfaf7073d1c2749232ca919c))


### Bug Fixes

* **update libraries:** update libraries and resolve pnpm build ([80bef52](https://github.com/KrlozMedina/Techfolio/commit/80bef52f6efc99687e458c93c57a0854232fd1d1))


### Miscellaneous Chores

* change file of workflow for dev ([569c578](https://github.com/KrlozMedina/Techfolio/commit/569c5785b587b2b5add5c08e5d7447716f70a8d6))
* modify file release-please for dev, test of versions ([805b757](https://github.com/KrlozMedina/Techfolio/commit/805b75760569b0569739aa94936a0a3b287f5263))
* modify files .github ([e601834](https://github.com/KrlozMedina/Techfolio/commit/e60183476ee95bdd473a3debbb7dbb205e4e4820))
* modify files github ([b697309](https://github.com/KrlozMedina/Techfolio/commit/b697309315ed13529f0b3e20c6d74451cb19a2b6))
* modify files of github ([42f6138](https://github.com/KrlozMedina/Techfolio/commit/42f6138c31ddb853a0baa1d0f4323a3f95e793d9))

## [2.2.0](https://github.com/KrlozMedina/Techfolio/compare/v2.1.0...v2.2.0) (2025-12-24)


### Features

* **auth, menu, templates:** protección de rutas API, menú adaptativo y asignación de templates ([f64f0ff](https://github.com/KrlozMedina/Techfolio/commit/f64f0ffbd1e78147925b4c98f3bf117fb2e08291))
* **layout, components:** creación de header, footer, modificación de sidebar y nuevo template ([15bcc0e](https://github.com/KrlozMedina/Techfolio/commit/15bcc0e35b3fc0bb7888a260520ee911cef07398))
* **middleware, ui:** configuración dinámica de middleware y avatares para páginas de estado ([0cc03ee](https://github.com/KrlozMedina/Techfolio/commit/0cc03eebb7d17cb4f314c3927021ef414a14b348))


### Bug Fixes

* **update libraries:** update libraries and resolve pnpm build ([80bef52](https://github.com/KrlozMedina/Techfolio/commit/80bef52f6efc99687e458c93c57a0854232fd1d1))

## [2.1.0](https://github.com/KrlozMedina/Techfolio/compare/v2.0.0...v2.1.0) (2025-05-11)


### Features

* **api-v2:** implementación de CRUD con filtros y soporte de idioma en la API de proyectos ([8f49600](https://github.com/KrlozMedina/Techfolio/commit/8f49600feb72114c592935a4b4d26e3e5145e0ac))
* **auth:** creación de middleware para protección de rutas y validación de token ([efa9b8a](https://github.com/KrlozMedina/Techfolio/commit/efa9b8ab37195711d679206ff2b44854f740a093))

## [2.0.0](https://github.com/KrlozMedina/Techfolio/compare/v1.0.0...v2.0.0) (2025-05-02)


### ⚠ BREAKING CHANGES

* test for release-please
* change file for dev
* modify files release-please for dev and main
* modify release-please for dev and main
* release-please.yml for dev and main

### Features

* add user profile page ([1fa4df5](https://github.com/KrlozMedina/Techfolio/commit/1fa4df5df5aaab869c90d52da7be66e1f0c438b9))
* **release:** actualiza el manifiesto de Release Please para manejar versiones específicas por rama ([b13f1f3](https://github.com/KrlozMedina/Techfolio/commit/b13f1f32a1785400dfaf7073d1c2749232ca919c))


### Miscellaneous Chores

* change file of workflow for dev ([569c578](https://github.com/KrlozMedina/Techfolio/commit/569c5785b587b2b5add5c08e5d7447716f70a8d6))
* modify file release-please for dev, test of versions ([805b757](https://github.com/KrlozMedina/Techfolio/commit/805b75760569b0569739aa94936a0a3b287f5263))
* modify files .github ([e601834](https://github.com/KrlozMedina/Techfolio/commit/e60183476ee95bdd473a3debbb7dbb205e4e4820))
* modify files github ([b697309](https://github.com/KrlozMedina/Techfolio/commit/b697309315ed13529f0b3e20c6d74451cb19a2b6))
* modify files of github ([42f6138](https://github.com/KrlozMedina/Techfolio/commit/42f6138c31ddb853a0baa1d0f4323a3f95e793d9))
