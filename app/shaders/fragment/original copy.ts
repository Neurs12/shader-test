const fragmentShader = `
precision mediump float;
uniform float uTime;

void main() {
    gl_FragColor = vec4(0.12156862745, 0.31764705882, 1.0, 1.0);
}
`;

export default fragmentShader;