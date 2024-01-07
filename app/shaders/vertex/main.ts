const vertexMainShader = `
float vDisplacement = (getNoisePattern() - 0.1) * 3.0;

transformed += normalize(objectNormal) * vDisplacement;
`;

export default vertexMainShader;