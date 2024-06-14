precision highp float;

uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;

// 2D rotation function
mat2 rot2D(float a) {
    return mat2(cos(a), -sin(a), sin(a), cos(a));
}

// Custom gradient - https://iquilezles.org/articles/palettes/
vec3 palette(float t) {
    return .5+.5*cos(6.28318*(t+vec3(.3,.416,.557)));
}

// Octahedron SDF - https://iquilezles.org/articles/distfunctions/
float sdOctahedron(vec3 p, float s) {
    p = abs(p);
    return (p.x+p.y+p.z-s)*0.57735027;
}

float sdTorus( vec3 p, vec2 t ){
  vec2 q = vec2(length(p.xz)-t.x,p.y);
  return length(q)-t.y;
}

vec3 palette3(in float t){
    vec3 a = vec3(0.5, 0.5, 0.5	);
    vec3 b = vec3(0.5, 0.5, 0.5	);
    vec3 c = vec3(2.0, 1.0, 1.0	);
    vec3 d = vec3(0.50, 0.20, 0.25);
    return a + b*cos( 6.28318*(c*t+d) );
}

vec3 palette1( in float t){
    vec3 a = vec3(0.5, 0.5, 0.5	);
    vec3 b = vec3(0.5, 0.5, 0.5	);
    vec3 c = vec3(1.0, 1.0, 1.0	);
    vec3 d = vec3(0.0, 0.33, 0.66);
    return a + b*cos( 6.28318*(c*t+d) );
}

vec3 palette2( in float t){
    vec3 a = vec3(0.5, 0.5, 0.5	);
    vec3 b = vec3(0.5, 0.5, 0.5	);
    vec3 c = vec3(1.0, 0.7, 0.4);
    vec3 d = vec3(0.00, 0.15, 0.20);
    return a + b*cos( 6.28318*(c*t+d) );
    // return vec3(0.7, 0.7, 0.56);
}


// Twisting column effect
float sdTwistedColumn(vec3 p, float twist) {
    float angle = twist * p.z;
    mat2 rot = mat2(cos(angle), sin(angle), -sin(angle), cos(angle));
    p.xy = rot * p.xy;
    return length(p.xy) - 0.1;
}

// Scene composition
float map(vec3 p) {
    p.z += uTime * 0.1; // Forward movement

    // Repeat the space in a grid
    p.xy = fract(p.xy) - 0.5;
    p.z = mod(p.z, 0.5) - 0.25;

    float torusDist = sdTorus(p, vec2(0.3, 0.1)); // Torus with major radius 0.3 and minor radius 0.1
    float columnDist = sdTwistedColumn(p, 5.0); // Twisting column with high twist factor

    // Union operation for interesting intersections
    return min(torusDist, columnDist);
}


// // Scene distance
// float map(vec3 p) {
//     p.z += uTime * .1; // Forward movement
    
//     // Space repetition
//     p.xy = fract(p.xy) - .5;     // spacing: 1
//     p.z =  mod(p.z, .25) - .125; // spacing: .25
    
//     return sdOctahedron(p, .15); // Octahedron
// }


// Calculate color based on position
vec3 getColor(vec3 p) {
    float d = map(p);
    vec3 color = 0.5 + 0.5 * cos(uTime + p.xyx + vec3(0, 2, 4));
    return mix(vec3(0.1, 0.2, 0.5), vec3(1.0, 0.7, 0.3), smoothstep(0.0, 1.0, d));
}

void main() {

    // TODO, check if this calculation is correct, idk how....
    // vec2 uv = (gl_FragCoord.xy - uResolution.xy) / uResolution.y;
    vec2 uv = vUv * 2.0 - 1.0;

    // circular motion
    vec2 m = vec2(cos(uTime*.5), sin(uTime*.5));

    // Initialization
    vec3 ro = vec3(0., 0., -3.);         // ray origin
    vec3 rd = normalize(vec3(uv, 1.)); // ray direction
    vec3 col = vec3(0.);               // final pixel color

    float t = 0.; // total distance travelled

    int i; // Raymarching
    for (i = 0; i < 80; i++) {

        vec3 p = ro + rd * t; // position along the ray
        
        p.xy *= rot2D(t*.15 * m.x);     // rotate ray around z-axis

        p.y += sin(t*(m.y+1.)*.5)*.35;  // wiggle ray

        float d = map(p);     // current distance to the scene

        // d = tan(d * 8. + uTime) / 8.;
        // d = abs(d);
        // d = pow(0.01 / d, 1.2);
        
        t += d;               // "march" the ray

        if (d < .001 || t > 100.) break; // early stop
    }

    // Coloring
    col = palette2(t*.04 + float(i)*.2);
    // col = getColor(col);
    gl_FragColor = vec4(col, 1);
}



