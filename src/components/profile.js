import React from 'react'
import "./profile.css"
import Header from './Header'
import Footer from './Footer'
import db, { auth } from '../firebase'
import {getAuth} from "firebase/auth"
import RecipeCard1 from './RecipeCard1'
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
        db.collection("users").doc(user.uid).collection("favourites").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if(this.state.favs.length < 3){
              this.setState(this.state.favs.push({
                id: doc.id,
                title: doc.data().title,
                imageURL: doc.data().imageURL
              }));
            }    
          });
        })
        .catch((error) => console.log(error));

      })

    
    }
    
    render() {
      console.log(this.state.favs)
      return(
        <>
        
        <Header />        
        <div class = "flex-row gap"> 
            <div class = "flex-column item-1">
               <img class = "pic" src = {this.state.piclink} alt = "img not found"></img>
               <div class = "name">
                  {this.state.name}
                </div>
            </div>
            {this.state.favs.map((item, i) => {
                console.log(item,  i)
              //  <RecipeCard1 image={item.image} title={item.title} key={index}/>

              }
            )
          }
        </div>
          
        <Footer className = "bot"/>

        </>

      )
    }
  }



export default Profile