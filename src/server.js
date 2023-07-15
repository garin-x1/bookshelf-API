import Hapi from '@hapi/hapi'
import { routes } from './routes.js'

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })
  server.route(routes)
  await server.start()
  console.log(`Server ini berjalan di ${server.info.uri}`)
}
init()
