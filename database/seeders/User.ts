import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const user = new User()
    user.password="secret"
    user.email="geets@tuta.io"
    user.firstName="benjamin"
    user.lastName="geets"
    user.status=5
    await user.save()
  }
}
