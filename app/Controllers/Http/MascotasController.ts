import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mascota from 'App/Models/Mascota'

export default class MascotasController {

    public async setRegistrarMascotas({request,response}:HttpContextContract){
        const dataMascota = request.only([
            'codigo_animal','nombre_animal','especie','raza','genero','edad'
        ])
        try{
            const codigoMascota= dataMascota.codigo_animal;
            const mascotaExistente: Number = await this.getValidarMascotaExistente(codigoMascota)
            if (mascotaExistente == 0){
                await Mascota.create(dataMascota)
                response.status(200).json({"msg":"Registro completado con exito"})

            } else {
                response.status(400).json({"msg":"Error, el codigo usuario ya se encuentra registrado"})
            }

        }catch(error){
            console.log(error)
            response.status(500).json({"msg":"Error en el servidor !!"})
        }
    }

    private async getValidarMascotaExistente(codigo_animal: Number): Promise<Number>{
        const total =await Mascota.query().where({"codigo_animal":codigo_animal}).count('*').from('mascotas')
        return parseInt(total[0]["count(*)"])
       }

    public async getListarMascotas(): Promise <Mascota[]>{
        const user = await Mascota.all()
        return user;
    }

    public async filtroPorEspecie({ request }: HttpContextContract) {
        const search = request.param('search');
        const users = await Mascota.query().whereRaw('LOWER(especie) = ?', search.toLowerCase());
        
        return users;
      }
    
    public async filtroMenor8() {
        const edad= 8
        const users = await Mascota.query().where('edad', '<=', edad);
        
        return users;
      }

    public async actualizarMascota({request}:HttpContextContract){
        
        const id = request.param('id');
        const mascota = await Mascota.findOrFail(id)
        const datos = request.all();
      
        mascota .nombre_animal = datos.nombre_animal
        mascota .especie = datos.especie,
        mascota .raza = datos.raza,
        mascota .genero = datos.genero,
        mascota .edad=datos.edad

        await mascota .save()
      
        return {"mensaje":"Actualizado correctamente","estado":200};
      
    }

    public async eliminarMascota({request}: HttpContextContract){
        const id = request.param('id');
        await  Mascota.query().where('codigo_animal', id).delete();
        return{"mensaje":"Eliminado correctamente","estado":200}

    }

}
