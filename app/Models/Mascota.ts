import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Mascota extends BaseModel {
  @column({ isPrimary: true }) public codigo_animal: number
  @column() public nombre_animal: string
  @column() public especie: number
  @column() public raza: number
  @column() public genero: number
  @column() public edad: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
