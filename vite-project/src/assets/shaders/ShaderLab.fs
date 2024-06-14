precision highp float;

uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;

vec3 palette( in float t){
    vec3 a = vec3(0.5, 0.5, 0.5	);
    vec3 b = vec3(0.5, 0.5, 0.5	);
    vec3 c = vec3(1.0, 1.0, 1.0	);
    vec3 d = vec3(0.0, 0.33, 0.66);
    return a + b*cos( 6.28318*(c*t+d) );
}


float opSmoothUnion( float d1, float d2, float k ) {
    // basic union is: return min(d1, d2);
    float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k*h*(1.0-h);
}

float smin( float a, float b, float k ) {
    // smooth min
    return opSmoothUnion(a, b, k);
}

float opSmoothSubtraction( float d1, float d2, float k ) {
    // basic subtraction is: return max(-d1, d2);
    float h = clamp( 0.5 - 0.5*(d2+d1)/k, 0.0, 1.0 );
    return mix( d2, -d1, h ) + k*h*(1.0-h);
}

float opSmoothIntersection( float d1, float d2, float k ) {
    // basic intersection is: return max(d1, d2);
    float h = clamp( 0.5 - 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) + k*h*(1.0-h);
}

mat2 Rot2D(float angle){
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

mat3 Rot3D(vec3 axis, float angle){
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;

    return mat3(
        oc * axis.x * axis.x + c, 
        oc * axis.x * axis.y - axis.z * s, 
        oc * axis.z * axis.x + axis.y * s,
        oc * axis.x * axis.y + axis.z * s,
        oc * axis.y * axis.y + c, 
        oc * axis.y * axis.z - axis.x * s,
        oc * axis.z * axis.x - axis.y * s,
        oc * axis.y * axis.z + axis.x * s,
        oc * axis.z * axis.z + c
    );
}

vec3 Rot3D_Rodrigues(vec3 p, vec3 axis, float angle){
    return mix(dot(p, axis) * axis, p, cos(angle)) 
        + cross(axis, p) * sin(angle) ;
        // + p * dot(p, 1.0 - cos(angle));
}

float sdSphere( vec3 p, float s ){
  return length(p)-s;
}

float sdBox( vec3 p, vec3 b ){
  vec3 d = abs(p) - b;
  return length(max(d,0.0)) + min(max(d.x,max(d.y,d.z)),0.0);
}


float map(vec3 p) {
    vec3 sdSpherePos = vec3(sin(uTime ) * 3., 0., .5); // sphere position
    float sphere = sdSphere(p - sdSpherePos, .5); //  sphere SDF

    vec3 q = p; // original position
    q.y -= uTime * .4; // move the pattern

    p.z -= uTime * .4; // repeat the pattern

    q = fract(p) - 0.5; // repeat the pattern
    
    q.xy *= Rot2D(uTime); // rotate around z-axis

    float box = sdBox(q, vec3(.1)); // cube SDF

    float ground = p.y + 2.;

    // return opSmoothSubtraction(sphere, box, .1);
    // return opSmoothUnion(sphere, box, .1);
    // return opSmoothIntersection(sphere, box, .1);    
    // return smin(sphere, box, .2);
    return smin(ground, smin(sphere, box, 2.), 1.);
}

void main() {
    // vec2 fragCoord = gl_FragCoord.xy / uResolution;
    vec2 uv = vUv * 2. - 1.;

    // initialization
    vec3 ro = vec3(0., 0., -3.); // ray origin, position of the camera
    vec3 rd = normalize(vec3(uv, 1.)); // ray direction
    vec3 col = vec3(0.); // final pixel color

    float t = 0.; // total distance traveled by the ray

    // total number of iterations
    int iterCount = 100;

    // raymarching
    for (int i = 0; i < iterCount; i++) {
        vec3 p = ro + rd * t;

        // distance function
        float d = map(p);


        // increment the total distance traveled by the ray: march the ray
        t += d;


        col = vec3(i) / float(iterCount);


        // early stop conditions: 
        //      if the distance is less than a threshold 
        //      or the total distance traveled by the ray is greater than a threshold
        if (d < .001 || t > 100.)
            break;
    }

    // coloring ( color based on the distance)
    // col = vec3(t * .2);
    col = vec3(1.) - col;
    // col = palette(t * uTime * .2);
    gl_FragColor = vec4(col, 1.);
}