#ifdef GL_ES
precision mediump float;
#endif

uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

#include "../lygia/space/ratio.glsl"
#include "../lygia/math/decimate.glsl"
#include "../lygia/draw/circle.glsl"

void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = vUv;
    color = vec3(st.x,st.y,abs(sin(uTime)));
    color = decimate(color, 20.);
    color += circle(st, .5, .1);
    
    gl_FragColor = vec4(color, 1.0);
}