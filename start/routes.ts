/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.group(()=> {
  Route.post('/registro-mascotas','MascotasController.setRegistrarMascotas')

  Route.get('/listar-mascotas', 'MascotasController.getListarMascotas')
  Route.get('/filtro-especie/:search','MascotasController.filtroPorEspecie')
  Route.get('/filtro-menor-8','MascotasController.filtroMenor8')

  Route.put('/actualizar-mascota/:id','MascotasController.actualizarMascota')
  Route.delete('/eliminar-mascota/:id','MascotasController.eliminarMascota')



}).prefix('/mascotas')