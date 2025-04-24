// fragmentShader.glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform float uTime;
uniform vec3 uLightDir;
uniform vec3 uAmbientColor;
uniform vec3 uDiffuseColor;
uniform vec3 uSpecularColor;
uniform float uAmbientIntensity;
uniform float uSpecularPower;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

#include "../lygia/sdf/circleSDF.glsl"
#include "../lygia/generative/snoise.glsl"
#include "../lygia/generative/random.glsl"
#include "../lygia/math/smootherstep.glsl"

vec3 colorPalette(int i) {
  vec3 colors[14];
  colors[0] = vec3(0.949, 0.922, 0.541);
  colors[1] = vec3(0.996, 0.816, 0.0);
  colors[2] = vec3(0.988, 0.518, 0.0);
  colors[3] = vec3(0.929, 0.212, 0.102);
  colors[4] = vec3(0.886, 0.941, 0.953);
  colors[5] = vec3(0.702, 0.863, 0.878);
  colors[6] = vec3(0.267, 0.392, 0.631);
  colors[7] = vec3(0.125, 0.188, 0.318);
  colors[8] = vec3(1.0,  0.773, 0.78);
  colors[9] = vec3(0.953, 0.596, 0.765);
  colors[10] = vec3(0.812, 0.22,  0.584);
  colors[11] = vec3(0.427, 0.208, 0.541);
  colors[12] = vec3(0.024, 0.706, 0.69);
  colors[13] = vec3(0.294, 0.541, 0.373); 
  return colors[clamp(i, 0, 13)];
}

vec3 concentrico(vec2 st, vec2 offset, int inx, float rad, in vec3 color) {
  st -= offset;
  float edge = 0.05;
  float ruido = 0.5 * snoise(st * 10.0 + 0.2 * uTime - 40.0 * float(inx));
  float circulo1 = smootherstep(rad - edge, rad + edge, ruido + circleSDF(st));
  float circulo2 = smootherstep(rad / 5.0 - edge, rad / 5.0 + edge, ruido + circleSDF(st));
  color = mix(colorPalette(inx) + 0.5 * ruido, color, 1.0 - (circulo2 - circulo1));
  return color; 
}


void main() {
  vec3 color = vec3(0.0);
  vec2 st = vUv*0.2;

  float r = length(st);
  float theta = atan(st.y, st.x);

  for (int i = 0; i < 13; i++) {
    vec2 pos = vec2(
      0.5 * random(float(i) * 26767.0),
      0.5 * random(float(i) * 12346.0)
    );

    float ruido = snoise(st * 10.0 + uTime * 0.1 - 10.0 * float(i));
    float r = 0.6 + 0.25 * sin(uTime * 0.5 + float(i) * 1.3);

    color = concentrico(st, pos + ruido, i, r, color);
  }

  color *= 2.0;

  gl_FragColor = vec4(color, 1.0);
}
