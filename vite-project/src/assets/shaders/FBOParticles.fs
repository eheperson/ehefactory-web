uniform vec3 uParticleColorClose;
uniform vec3 uParticleColorFar;
varying float vDistance;

void main() {
  vec3 color = uParticleColorClose;
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 - strength;
  strength = pow(strength, 3.0);

  color = mix(color, uParticleColorFar, vDistance * 0.5);
  color = mix(vec3(0.0), color, strength);
  gl_FragColor = vec4(color, strength);
}


// void main() {
//   vec3 color = vec3(0.34, 0.53, 0.96);
//   gl_FragColor = vec4(color, 1.0);
// }
