import headerStyles from '@/styles/Header.module.css'
const Header = () =>{
  
return(
  
 <div>

<h1 className = {headerStyles.title} >
  <span>Kareem's </span>Website
</h1>
<p className={headerStyles.description}>Welcome To My Website</p>

 </div>
)
}
export default Header