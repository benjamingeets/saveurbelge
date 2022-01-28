import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Shop from 'App/Models/Shop'

export default class ShopSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const shop = new Shop
    shop.name="Le shop"
    shop.description="very nice"
    shop.addressCity="Tournai"
    shop.addressNumber="30"
    shop.addressStreet="Rue du trian"
    shop.addressPostcode="7500"
    shop.ownerId="10"
    shop.sector="1"
    shop.optionAcceptLocalCurrency=true
    shop.categories=["1",'2']
    await shop.save()
  }
}
