import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

const BASE_URL = "https://practiceapi.devmountain.com/api";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`${BASE_URL}/posts`).then( response => {
      this.setState({ posts: response.data });
      console.log("componentDidMount: GET success");
    }).catch( () => {
      console.log("componentDidMount: failed to GET");
    });
  }

  updatePost(id, text) {
    axios.put(`${BASE_URL}/posts?id=${ id }`, {text}).then( response => {
      this.setState({posts: response.data});
      console.log("updatePost: PUT success");
    }).catch( () => {
      console.log("updatePost: failed to PUT");
    });
  }

  deletePost(id) {
    axios.delete(`${BASE_URL}/posts?id=${ id }`).then( response => {
      this.setState({ posts: response.data });
      console.log("deletePost: DELETE success");
    }).catch( () => {
      console.log("deletePost: failed to DELETE");
    });
  }

  createPost(text) {
    axios.post(`${BASE_URL}/posts`, { text }).then( response => {
      this.setState({ posts: response.data });
      console.log("createPost: POST success");
    }).catch( () => {
      console.log("createPost: failed to POST");
    });
  }

  filterPosts() {
    // black diamond for later
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={ this.createPost }/>
          {
            posts.map(post => {
              return <Post key={ post.id }
                           text={ post.text }
                           date={ post.date }
                           id={ post.id }
                           updatePostFn={ this.updatePost }
                           deletePostFn={ this.deletePost } />
            })
          }
          
        </section>
      </div>
    );
  }
}

export default App;
