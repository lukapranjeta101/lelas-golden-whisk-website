# Bakery cutouts

Created with the built-in image generation tool from photos in `assets/cakes-lelas-golden-whisk`. Original photos are preserved. All three PNGs contain transparent alpha backgrounds.

- `pastries.png`: source `hero1.JPG`.
- `cake.png`: source `hero4.JPG`.
- `cookies.png`: source `hero9.JPG`, converted to PNG for tool compatibility.

## Prompts

Each prompt used this framing: “Use case: background-extraction. Edit target: attached bakery photograph.”

Pastries: “Extract the two crumb-topped pastries, keeping both pastries and their original textures, shape, proportions, and viewing angle. Remove the entire plate, outdoor scenery, table, and every background pixel.”

Cake: “Extract only the frontmost complete chocolate-and-cream layered cake square. Preserve its exact layers, crumb, textures, colors, and viewing angle. Remove all other slices, plate, surface, text and background.”

Cookies: “Extract the group of flower-shaped jam cookies. Preserve their exact arrangement, powdered sugar, shapes, red and amber fillings, and viewing angle. Remove the plate, countertop, and all background, including gaps between cookies.”

Each prompt ended: “Output a tightly framed photoreal cutout on a genuinely transparent alpha background, PNG. No colored backdrop, no checkerboard baked into pixels, no text, no extra props. Leave a small transparent margin around the complete subject. Do not redesign or stylize the food.”
