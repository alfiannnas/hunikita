
import express, {Router} from "express" 
import { PORT } from "@constant"
import { Route } from "@route/index.ts"
import cors from "cors"
import 'reflect-metadata';

async function main() {
  const app = express()
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); 
  app.use(cors())

  await Route.register(app)
  function getRegisteredRoutes(router: Router): string[] {
    const routes: string[] = [];
  
    router.stack.forEach((layer) => {
      if (layer.route) {
        routes.push(Object.keys(layer.route.methods).join(', ') + ' ' + layer.route.path);
      } else if (layer.name === 'router' && layer.handle.stack) {
        routes.push(...getRegisteredRoutes(layer.handle));
      }
    });
  
    return routes;
  }
  
  
  // Example usage
  const registeredRoutes = getRegisteredRoutes(app._router);
  registeredRoutes.forEach((route) => {
    console.log(route);
  });
  
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
  
}


main()