import { DateTime } from 'luxon'
import { column, beforeSave, BaseModel, beforeCreate, afterFind } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import axios from 'axios'
import utf8 from 'utf8'
export default class Shop extends BaseModel {
  public static selfAssignPrimaryKey = true
  @column({ isPrimary: true })
  public id: string

  @column()
  public latitude:string

  @column()
  public longitude:string

  @column()
  public ownerId:string

  @column()
  public logo:string

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
  public description:string

  @column()
  public addressNumber:string

  @column()
  public addressStreet:string

  @column()
  public addressCity:string

  @column()
  public addressPostcode:string

  @column()
  public phone:string

  @column()
  public optionIsProductor:boolean

  @column()
  public optionIsBio:boolean

  @column()
  public optionAcceptLocalCurrency:boolean

  @column()
  public instagramUsername:string

  @column()
  public sector:string

  @column()
  public categories:any

  @column()
  public facebookUsername:string

  @column()
  public websiteUrl:string

  @column()
  public status:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @beforeCreate()
  public static assignUuid(shop: Shop) {
    shop.id = uuidv4()
  }
  @beforeSave()
  public static async hashPassword(shop: Shop) {
    if (shop.$dirty.addressNumber ||
      shop.$dirty.addressStreet ||
      shop.$dirty.addressPostcode ||
      shop.$dirty.addressCity) {
      const {data} = await axios.get(utf8.encode(`https://nominatim.openstreetmap.org/search?street=${shop.$dirty.addressNumber ? shop.$dirty.addressNumber : shop.addressNumber}%20${shop.$dirty.addressStreet ? shop.$dirty.addressStreet : shop.addressStreet}&city=${shop.$dirty.addressCity ? shop.$dirty.addressCity : shop.addressCity}&country=belgique&format=json`))
      if(data[0]){
        shop.longitude = data[0].lon
        shop.latitude = data[0].lat
      }
    }
    if(shop.$dirty.categories){
      shop.categories = JSON.stringify(shop.$dirty.categories)
    }
  }
  @afterFind()
  public static dsqdsq(shop:Shop){
    shop.categories = JSON.parse(shop.categories)
  }
}
