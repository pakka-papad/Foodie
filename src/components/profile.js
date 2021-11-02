import React from 'react'
import "./profile.css"
import Header from './Header'
import Footer from './Footer'
import db, { auth } from '../firebase'
import {getAuth} from "firebase/auth"
import FavouritesList from './FavouritesList'
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name : "na" ,
      piclink : "none", 
      favs : []
    };
    // Binding method
    this.componentDidMount = this.componentDidMount.bind(this);
    
  }
    async componentDidMount(){
      getAuth().onAuthStateChanged(async (user)=>{
        await db.collection("users").doc(user.uid).get()
        .then(doc => {
          console.log(doc.data())
          // console.log(this.state.name);
          this.setState(() =>({name : doc.data().displayName, piclink : doc.data().imageURL}));
        })
        await db.collection("users").doc(user.uid).collection("favourites").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              let newE = {
                id: doc.id,
                title: doc.data().title,
                imageURL: doc.data().imageURL
              }
              this.setState(prevState =>({
                favs  : [ ...prevState.favs , newE]
              })) 
          })
        })
        .catch((error) => console.log(error));

      })


    
    }
    
    render() {
      console.log(this.state.favs);

      return(
        <>
        
        <Header />        
        <div class = "flex-row gap"> 
            <div class = "flex-column  item-1">
               <img class = "pic" src = {this.state.piclink} alt = "img not found"></img>
               <h1 class = "name">
                  {this.state.name}
                </h1>
            </div>
            <div class = "cards-1">
            {this.state.favs.map(item => (
              <>
               <FavouritesList image={item.imageURL} title={item.title} key={item.index} className = "item-list"/>
              </>
              )
            )
          }
          </div>
        </div>
          
        <Footer className = "bot"/>

        </>

      )
    }
  }



export default Profile