// Lightweight placeholder shader reference for future custom particle materials.
// Current production scene uses instanced meshes for browser compatibility and low draw calls.
float softPulse(float time, float offset) {
  return 0.5 + 0.5 * sin(time + offset);
}
