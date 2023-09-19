const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
                '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.path+'">'+
                '</div><div class="card-content">'+
                '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+
                '<div class="card-reveal">'+
                '<span class="card-title grey-text text-darken-4">'+item.subTitle+'<i class="material-icons right">close</i></span>'+
                '<p class="card-text">'+item.description+'</p>'+
                '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

const formSumitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.path = $('#path').val();
    formData.subTitle = $('#subTitle').val();
    formData.description = $('#description').val();

    console.log(formData);
    postItem(formData);
}

function postItem(item) {
    $.ajax({
        url:'/api/item',
        type:'POST',
        data:item,
        success: (result) => {
            if (result.statusCode === 201) {
            }
        }
    });
}

function getAllItem() {
    $.get('/api/item',(result)=>{
        if (result.statusCode === 200) {
            addCards(result.data);
        }
    });
}

let socket = io();
socket.on('number',(msg)=>{
    console.log('Random Number: ' + msg);
});

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        formSumitted();
    });
    $('.modal').modal();
    getAllItem();
    console.log('ready');
});

//Sign up submit form
const submitFormSignIn = () => {
    let formData = {};
    let email1 = $("#email").val();
    let pw1 = $("#password").val();
    let pw2 = $("#confirm_password").val();
  
    //email check
    let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email1)) {
      alert("Email is not valid");
      return;
    }

     //Password check
  if (pw1 !== pw2) {
    alert("Not matched");
    return;
  }

  //Submit form for login
const submitLoginForm = () => {
    let formData = {};
    let email = $("#email").val();
  
    //email check
    let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      alert("Email is not valid");
      return;
    }
  
    formData.email = $("#email").val();
    formData.password = $("#password").val();
    // Print for test
    console.log("form data: ", formData);
    // Server update
    loginUser(formData);
  };
  
  //Login function
  const loginUser = (user) => {
    $.ajax({
      url: "api/login",
      data: user,
      type: "POST",
      success: (result) => {
        if (result.statusCode === 200) {
          localStorage.setItem("user_email", user.email);
          alert(result.message);
          window.location.href = "main.html"; // Redirect to another page
        } else {
          alert(result.message);
        }
      },
    });
  };
  
  $(document).ready(function () {
    $("#login").click(() => {
      submitLoginForm();
    });
  });

}

setInterval(remindEventStart, 1000); // Call remindEventStart every 1 second
