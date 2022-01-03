# Angular Graphql
![Astronauta](https://github.com/KernelWar/angular-graphql/blob/main/src/assets/astronaut.png)

Proyecto cliente angular que se conecta a una GraphQL API, contiene un módulo de login y empleados.
Consulta el repositorio de la API aquí [GraphQL API](https://github.com/KernelWar/server-graphql "GraphQL API")

### Configuración
En la ruta `src/environments` continent las variables de entorno, en el archivo `environment.ts` configure `host` y `port` por default se mira así:
```javascript
export const environment = {
  production: false,
  host: 'http://localhost',
  port: '4000'
};

```
#### Como empezar

- Desde su terminal preferida estando en la raiz del proyecto ejecute `npm install`
- Si todo va bien, ejecute `ng serve --open` para abrir el proyecto en un navegador

###Generar empaquetado
- Desde su terminal preferida estando en la raiz del proyecto ejecute `ng build`, comando que gerará un carpeta llamada `dist` que contendra el empaquetado listo para producción.
- En este caso este empaquetado se añadio al proyecto de la API para poder  tener en un mismo entorno el frondend y backend, ambos proyectos se pueden ver en producción [aquí](https://graphqldbtest.herokuapp.com "aquí")
