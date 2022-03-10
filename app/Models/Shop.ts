import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import utf8 from 'utf8'
import axios from 'axios'
export default class Shop extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['name'],
    allowUpdates: true,
  })
  public slug: string

  @column()
  public street:string

  @column()
  public city:string

  @column()
  public latitude:string

  @column()
  public ip:string

  @column()
  public longitude:string

  @column()
  public phone:string

  @column()
  public title:string

  @column()
  public logo:string

  @column()
  public website:string
  
  @column()
  public facebook:string

  @column()
  public instagram:string

  @column()
  public description:string

  @column()
  public isBio:boolean

  @column()
  public isProductor:boolean

  @column()
  public acceptLocalCurrency:boolean
  
  @column()
  public email:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async getPosition(shop: Shop) {
    if (shop.$dirty.city || shop.$dirty.street) {
      const {data} = await axios.get(utf8.encode(`https://nominatim.openstreetmap.org/search?street=${shop.$dirty.street ? shop.$dirty.street : shop.street}&city=${shop.$dirty.city ? shop.$dirty.city : shop.city}&country=belgique&format=json`))
      if(data[0]){
        shop.longitude = data[0].lon
        shop.latitude = data[0].lat
      }
    }
  }
}
