# SHADOW PROTOCOL

Robot warfare game (TITAN-07) built with Three.js (r128 from cdnjs). Single file: `index.html`.

- Level 1: Operation Ironfall (hand-built, five zones, Heavy Sentinel boss, extraction).
- Levels 2-100: generated variations of one arena (data-driven), not hand-designed maps.
- Procedural robot and environment models; synthesized audio.

## Run
Open `index.html` in a modern browser (internet needed for Three.js). No build step.

## Deploy (Vercel)
Framework Preset: Other. No build command. Output directory empty. Root Directory: repository root.

## Headless smoke test
Runs the real game logic (stubbed renderer) through Level 1 from deployment to extraction, boss phases, retry, and a procedural level:

    cd tests && npm install && node run.js

It prints state checks and any runtime errors. It does not test visuals, audio or touch input.

## Icons
`favicon.svg` is the master (obsidian #080B0F, titanium #AEBBC7, cyan #43D9F5). `favicon-16x16.png`, `favicon-32x32.png`, `favicon.ico` (16/32/48) and `apple-touch-icon.png` (180x180) are rendered from it. They are linked from the `<head>` of `index.html`, so they load before WebGL starts. The single-file artifact build (`titan-warfare.html`) intentionally has no icon links.

## TITAN-07 torso (Part 1)
`mech()` builds the player mech; the torso is a named modular assembly under `TorsoRoot`: InternalChassis, ChestArmor, CentralReactor, Left/RightSideArmor, AbdominalAssembly, RearArmor, CoolingSystem, Left/RightShoulderMount, WaistMount (plus HeadAssembly, WeaponMount and ShoulderArmor for later parts). Attachment nodes are exposed as `PH.nodes.*`; the arm roots are children of the shoulder mounts. Checks: `tests/torso_hierarchy.js`, `tests/torso_geometry.js` (run with `TEST=... node run.js`), views via `tests/torso_views.py`.
