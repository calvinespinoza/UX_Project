import React from 'react';
import './Account.css';
import def from './def.jpg';
import $ from 'jquery';

const Account = () =>
  <div>
    <h1>Account</h1>
    <Profile />
  </div>



export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      inf_scroll: false,
      db: { img: {} },
      loaded: false,

      name:"",
      email:"",
      username:"",
      telephone:"",



    };
    this.init_images = this.init_images.bind(this);
    this.add_images = this.add_images.bind(this);
    this.fasterPreview = this.fasterPreview.bind(this);
    this.imageUp = this.fasterPreview.bind(this);

  }



componentDidMount(){


    this.setState({ 
      "name": "Jahaziel",
      "email": "puta@vida.suicide"

    })
}


  init_images() {
    var total_images = $('.image').length;
    for (var i = 0; i < total_images; i++) {
      $('.image').eq(i).addClass('image' + i);
      $('.image' + i).css('background', 'url("' + this.state.db.img[i].src + '") center no-repeat')
    }
  }

  add_images() {
    var total_images = $('.image').length; // Getting total number of images on the page.

    for (var i = 1; i < 13; i++) {
      var this_num = total_images + i;

      // Check for end of images
      if (this_num > Object.keys(this.state.db.img).length) { $('.more-images').addClass('inactive'); this.state.inf_scroll = false; return false; };

      $('.content').append('<div class="rela-inline image image' + this_num + '"></div>');
      $('.image' + this_num).css('background', 'url("' + this.state.db.img[this_num - 1].src + '") center no-repeat')
    };

    if ((total_images + 7) > Object.keys(this.state.db.img).length) {
      $('.more-images').addClass('inactive');
      this.state.inf_scroll = false;
    };
  };

  profImage() {
    $("#profileImage").click(function (e) {
      $("#imageUpload").click();
    });
  }

  fasterPreview(uploader) {
    if (uploader.files && uploader.files[0]) {
      $('#profileImage').attr('src',
        window.URL.createObjectURL(uploader.files[0]));
    }
  }

  imageUp() {
    $("#imageUpload").change(function () {
      this.fasterPreview(this);
    });
  }


  render() {
    return (
      <div className="container">
        <div className="rela-block container">
          <div className="rela-block profile-card">
            <div id="profile-container">
              <img id="profileImage" src={def} onClick={this.profImage} />
            </div>
            <input onClick={this.imageUp} id="imageUpload" type="file" name="profile_photo" placeholder="Photo" required capture />
            <div className="rela-block profile-name-container">
              <div className="rela-block user-name" id="user_name" >{this.state.name}</div>
              <div className="rela-block user-desc" id="user_description">The Space Invader</div>
            </div>
            <div className="rela-block profile-card-stats">
              <div className="floated profile-stat works" id="num_works">28
                        <br />
              </div>
              <div className="floated profile-stat followers" id="num_followers">112
                             <br />
              </div>
              <div className="floated profile-stat following" id="num_following">245
                             <br />
              </div>
            </div>
            <div className="rela-block profile-card-stats InfoExtra">
              <div className="rela-block user-name">Correo:</div>
              <div className="rela-block user-desc" id="InfoExtra">{this.state.email}</div>
            </div>
            <div className="rela-block profile-card-stats InfoExtra">
              <div className="rela-block user-name" >Amigos:</div>
              <div className="rela-block user-desc"  id="InfoExtra">Jahaziel</div>
            </div>
          </div>
        </div>
      </div>

    );
  }
};









export default Account;