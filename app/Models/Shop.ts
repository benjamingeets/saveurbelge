import { DateTime } from 'luxon'
import { column, beforeSave, BaseModel, beforeCreate, afterFind } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
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
      shop.longitude = "att"
      shop.latitude = "att"
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
