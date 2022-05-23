import "./bootstrap"
import unpoly from 'unpoly'
import shop from "./pages/shop"
import homepage from './pages/homepage'

up.link.config.followSelectors.push('a[href]')
up.form.config.submitSelectors.push(['form'])

up.compiler('#home', () => {
homepage()
})

up.compiler('#shop',()=>{
shop()
})