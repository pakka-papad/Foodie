import React from 'react'
import "./profile.css"
import Header from './Header'
import Footer from './Footer'
import db, { auth } from '../firebase'
import {getAuth} from "firebase/auth"
import FavouritesList from './FavouritesList'
import ReactStars from "react-rating-stars-component";
import { Button } from '@mui/material'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name : "na" , //displayName of the user from database
      piclink : "none", //img_url of the user from database
      favs : [], // list of favourites from the database
      userid : "", //user_id(uid) from the database
      mounted : false,
    };
    // Binding method
    this.componentDidMount = this.componentDidMount.bind(this);
    
  }
    async componentDidMount(){
      this.mounted = true;
      if(this.mounted){
        getAuth().onAuthStateChanged(async(user)=>{
          if(user){
            await db.collection("users").doc(user.uid).get()
            .then(doc => {
              console.log(doc.data())
              // console.log(this.state.name);
              this.setState(() =>({name : doc.data().displayName, piclink : doc.data().photoURL, userid: user.uid}));
            }).catch((err) => {
              console.log(err)
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
              console.log(this.state.favs)
            })
            .catch((error) => console.log(error));
          }
        })
      }
    }

    componentWillUnmount = () => {
      this.mounted = false;
    }

    //clearAll() function
    clearFavourites = async() => {
      await db.collection("users").doc(this.state.userid).collection("favourites")
      .get()
      .then(res => {
        res.forEach(element => {
          element.ref.delete();
        });
        this.setState({favs : []})
      });
    }

    //deleteFromFavourites() function
    deleteFav = async(id) => {
      await db.collection("users").doc(this.state.userid).collection("favourites")
      .get()
      .then(res => {
        res.forEach(element => {
          console.log(element);
          if(element.id === id){
            element.ref.delete();
          }
        });
        var filtered = this.state.favs.filter(function(element){
          return element.id !== id;
        })
        this.setState({favs : filtered})
      });
    }
    
    render() {
      // console.log(this.state.favs);

      return(
        <>
        <Header />        
        <div className = "flex-row gap"> 
            <div className = "flex-column  item-1">
               <img className = "pic" src = {this.state.piclink} alt = "img not found"></img>
               <h2 className = "name">
                  {this.state.name}
               </h2>
               <Button color="primary" onClick={this.clearFavourites}>Clear All Favourites</Button>
            </div>
            <div className = "cards-1">
            {this.state.favs.map(item => (
              <>
               <FavouritesList id={item.id} image={item.imageURL} title={item.title} key={item.index} deleteFav={() => this.deleteFav(item.id)} className = "item-list"/>
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