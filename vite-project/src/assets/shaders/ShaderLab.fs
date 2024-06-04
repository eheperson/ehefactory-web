precision mediump float;

uniform vec3 uColor;
uniform float uTime;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vWave;

void main() {
    float wave = vWave * 0.5;
    vec3 texture = texture2D(uTexture, vUv + wave).rgb;
    vec3 color = sin(vUv.x + uTime)*uColor;
    gl_FragColor = vec4(texture, 1.0);
}