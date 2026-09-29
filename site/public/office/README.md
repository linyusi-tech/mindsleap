# MindsLeap office viewer

Published at `/office` through the existing Next.js static rewrite. All modules, the GLB, and images are served from this directory; no third-party runtime CDN.

The scene is a proportional estimate (40 source pixels per metre; 3 m ceiling), not surveyed geometry. The five indoor renders share the same Blender model. The viewer supports seven camera presets, orbit/pan/zoom, material and ceiling toggles, source-plan comparison and GLB/screenshot download.

- `MindsLeap-office-v1.blend`: editable source scene
- `MindsLeap-office-v1.glb`: exported scene used by the viewer
- `model-plan.json`: estimated geometric parameters
- `renders.html`: fixed-camera render gallery
- `vendor/`: Three.js 0.180.0 (MIT, see THREE-LICENSE.txt)

Furniture, microphones and materials are schematic. Free navigation has no collision detection.

Revision: restored the continuous angled island-to-column connection from the original plan. Countertop and base both join Structural_column_04.
