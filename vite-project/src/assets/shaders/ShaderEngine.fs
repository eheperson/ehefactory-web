uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

void main() {
  float distort = 3.0 * vDisplacement * u_intensity;
  
  vec3 color = vec3(abs(vUv - 0.5) * 1.0  * (1.0 - distort), 0.5); 

  // vec3 finalColor = color * 0.5;
  vec3 finalColor = color * 2.0;

  gl_FragColor = vec4(finalColor, 1.0);
}
