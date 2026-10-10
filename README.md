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
