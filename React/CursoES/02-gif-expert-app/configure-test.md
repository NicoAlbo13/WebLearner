# Instalación y configuracion de Jest + React Testing Library
## En proyectos de React + Vite

1. Instalaciones:
```
npm install --save-dev @testing-library/react @types/jest jest-environment-jsdom
npm install --save-dev jest babel-jest @babel/preset-env @babel/preset-react 
```

2. Opcional: Si usamos Fetch API en el proyecto:
```
npm install --save-dev whatwg-fetch
```

3. Actualizar los scripts del __package.json__
```
"scripts: {
  ...
  "test": "jest --watchAll"
```

4. Crear la configuración de babel __babel.config.js__
```
module.exports = {
    presets: [
        [ '@babel/preset-env', { targets: { esmodules: true } } ],
        [ '@babel/preset-react', { runtime: 'automatic' } ],
    ],
};
```

5. Opcional, pero eventualmente necesario, crear Jest config y setup:

__jest.config.js__
```
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js']
}
```

__jest.setup.js__
```
// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- npm install whatwg-fetch
```

6. NOTA, posiblemente quitar linea "type": "module"
__package.json__
```
"version": "0.0.0",
"type": "module" //eliminar esta linea
```
(When you added ```"type": "module"``` in ```package.json```
Node treated your ```jest.config.js``` file as an ES module,
 but you were likely still using CommonJS syntax inside it [e.g module.exports])