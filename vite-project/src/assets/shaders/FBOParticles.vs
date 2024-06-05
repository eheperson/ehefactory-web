uniform sampler2D uPositions;
uniform float uTime;
uniform float uRadius;

varying float vDistance;

// Source: https://github.com/dmnsgn/glsl-rotate/blob/main/rotation-3d-y.glsl.js
mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}

void main() {
  vec3 pos = texture2D(uPositions, position.xy).xyz;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;

  float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 1.5);
  float size = distanceFactor * uRadius + uRadius;
  vec3 particlePosition = position * rotation3dY(uTime * 0.3 * distanceFactor);
  vDistance = distanceFactor;

  gl_PointSize = size;
  // Size attenuation;
  gl_PointSize *= step(1.0 - (1.0/64.0), position.x) + 0.5;
}


// uniform sampler2D uPositions;
// uniform float uTime;

// void main() {
//   vec3 pos = texture2D(uPositions, position.xy).xyz;

//   vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
//   vec4 viewPosition = viewMatrix * modelPosition;
//   vec4 projectedPosition = projectionMatrix * viewPosition;

//   gl_Position = projectedPosition;

//   gl_PointSize = 3.0;
//   // Size attenuation;
//   gl_PointSize *= step(1.0 - (1.0/64.0), position.x) + 0.5;
// }
