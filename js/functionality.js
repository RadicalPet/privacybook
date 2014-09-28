$( document ).ready(function() {
  if (parseInt(localStorage.loggedIn) > -1){
    $(".logged-in").show();
    $(".logged-out").hide();
    loadProfileData();
  }
  else{
    $(".logged-in").hide();
    $(".logged-out").show();
  }
 $("[title]").tooltip({
        placement: 'top',
        animation: 'true'
    });
});

$.fn.valName = function(){
 
  var thisVal = $(this).val();

  if ((thisVal.length < 2) || (typeof thisVal !=="string")){
    
    $(this).closest('.form-group').removeClass("has-success");
    $(this).closest('.form-group').addClass("has-error");
    return false;
  }
  else{
    $(this).closest('.form-group').removeClass("has-error");
    $(this).closest('.form-group').addClass("has-success");
    return true;
  }
}
$.fn.valEmail = function(){

  var thisVal = $(this).val();

  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if (re.test(thisVal) == false){
    $(this).closest('.form-group').removeClass("has-success");
    $(this).closest('.form-group').addClass("has-error");
    return false;
  }
  else{
    $(this).closest('.form-group').removeClass("has-error");
    $(this).closest('.form-group').addClass("has-success");
    return true;
  }
}
$.fn.valPassword = function(){

  var thisVal = $(this).val();

  var re = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? \"]).*$/;
  if ((re.test(thisVal)) == false || (typeof thisVal !=="string")){
    $(this).closest('.form-group').removeClass("has-success");
    $(this).closest('.form-group').addClass("has-error");
    return false;
  }
  else{
    $(this).closest('.form-group').removeClass("has-error");
    $(this).closest('.form-group').addClass("has-success");
    return true;
  }
}
$.fn.valRepeat = function(){

  var passwordVal =  $(this).closest(".form-group").prev().find("input").val();
  var thisVal = $(this).val();

  if (passwordVal !== thisVal){
    $(this).closest('.form-group').removeClass("has-success");
    $(this).closest('.form-group').addClass("has-error");
    return false;
  }
  else{
    $(this).closest('.form-group').removeClass("has-error");
    $(this).closest('.form-group').addClass("has-success");
    return true;
  }
}
function register(){

  var name = $("#reg-name").val();
  var email = $("#reg-email").val();
  var password = $("#reg-password").val();

  var noSubmit = false;
  var nameExists = false;
 
  if ($("#reg-name").valName() == false){
    noSubmit = true;
  }
  if ($("#reg-password").valPassword() == false){
    noSubmit = true;
  }
  if ($("#reg-repeat").valRepeat() == false){
    noSubmit = true;
  }
  if (users.user.length > 0){
    for (var i = 0; i < users.user.length; i++){
      if (users.user[i].userName == name){
        noSubmit = true;
        nameExists = true;
        userNameExists();
      }       
    }
  }
  if (noSubmit == false && nameExists == false){
    var passwordCrypt = sjcl.encrypt("password", password);
    users.user.push( 
      {
        userName: name, 
        email : email, 
        password : passwordCrypt
      }
    );
    localStorage.users = JSON.stringify(users);
    registerSuccess();  
  }
}
function registerSuccess(){
  $('#register-modal').modal('hide');
  $('#log-in-label').html("Successfully registered :) Log In");
  $('#log-in-modal').modal('show'); 
}
function userNameExists(){
  alert("This user name is already taken!");
}
function login(){

  var name = $("#user-name").val();
  var password = $("#user-password").val();

  var registeredUser = -1;


  for (var i = 0; i < users.user.length; i++){
    if (name == users.user[i].userName){
      registeredUser = i;
      $("#user-name").closest('.form-group').removeClass("has-error");
      $("#user-name").closest('.form-group').addClass("has-success");
    }
    else {
      if (i == users.user.length && registeredUser == -1)
      
        $("#user-name").closest('.form-group').removeClass("has-success");
        $("#user-name").closest('.form-group').addClass("has-error");
    
    }
  }
  if (registeredUser > -1){      
    if (password == sjcl.decrypt("password", users.user[registeredUser].password)){
      localStorage.setItem("loggedIn", registeredUser);

      loadProfileData();
      $('#log-in-modal').modal('hide');
      $('.logged-in').show();
      $('.logged-out').hide(); 
    }
    else{
      $("#user-name").closest('.form-group').removeClass("has-error");
      $("#user-password").closest('.form-group').addClass("has-error");
    }
  }
}
function logout(){
  localStorage.setItem("loggedIn", -1);
  $('#log-out-modal').modal('hide');
  $('.logged-in').hide();
  $('.logged-out').show(); 
}
function addInfoForm(){
  var thisUser = users.user[localStorage.loggedIn];
  if (!thisUser.userLocation || thisUser.userLocation.length < 1){
    $('#add-info-form').append('<div class="form-group"><label class="col-md-4 control-label" for="location">location</label><div class="col-md-6"><input id="location" name="location" type="text" placeholder="" class="form-control input-md"></div></div>');
  }
  if (!thisUser.about || thisUser.about.length < 1){
    $('#add-info-form').append('<div class="form-group"><label class="col-md-4 control-label" for="about">about yourself</label><div class="col-md-6"><textarea class="form-control" id="about" name="about"></textarea></div></div>');
  }
  if (!thisUser.interests || thisUser.interests.length < 1){
    $('#add-info-form').append('<div class="form-group"><label class="col-md-4 control-label" for="interests">general interests</label><div class="col-md-6"><textarea class="form-control" id="interests" name="interests"></textarea></div></div>');
  }
}
function addInfo(){
  var userLocation = $('#location').val();
  var about = $('#about').val();
  var interests = $('#interests').val();

  var tempObj =  {
    userLocation : userLocation, 
    about : about, 
    interests : interests
  }
  
  users.user[localStorage.loggedIn] = $.extend(users.user[localStorage.loggedIn], tempObj);
  localStorage.users = JSON.stringify(users); 
  $('#add-info-modal').modal('hide'); 
}
function submitEditedInfo(){

  var userLocation = $('#edit-user-location').val();
  var about = $('#edit-user-about').val();
  var interests = $('#edit-user-interests').val();

  var tempObj =  {
    userLocation : userLocation, 
    about : about, 
    interests : interests
  }

  users.user[localStorage.loggedIn] = $.extend(users.user[localStorage.loggedIn], tempObj);
  localStorage.users = JSON.stringify(users); 
  showInfo();
}
function loadProfileData(){

  var i = parseInt(localStorage.getItem("loggedIn"));
  var userName = users.user[i].userName;
  $("#home").find("h2").html(userName);
  showUsers();
  showInfo();
  listMessages();
}
function showUsers(){
  $("#public-users").children().find("ul").empty();
  $.each( users.user, function( key, value ) {
    $("#public-user-list").append('<li><div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle"  data-index="'+key+'" data-user="'+ users.user[key].userName +'" data-toggle="dropdown"><span class="caret"></span> ' + users.user[key].userName + '</button></div></li>');
    $("#public-user-list").find('li:last-child').find('div').append('<ul class="dropdown-menu" role="menu"><li><a href="#" data-toggle="modal" data-target="profile-modal">view profile</a></li><li><a href="#" data-toggle="modal" data-target="#send-message-modal">send message</a></li></ul>');
  });
  $('.dropdown-toggle').on("click", $.fn.addMessageDetails);
}
function showInfo(){
  var thisUser = users.user[localStorage.loggedIn];
    $("#show-edit-info").removeClass("disabled");
  $("#info").find(".content").empty();
  if (thisUser.userLocation){
    $("#info").find(".content").append('<h4>Location:</h4><div class="user-info" id="user-location">' + thisUser.userLocation + '</div>');  
    
  }
  if (thisUser.about){
    $("#info").find(".content").append('<h4>About me:</h4><div class="user-info" id="user-about">' + thisUser.about + '</div>');
  }
  if (thisUser.interests){
    $("#info").find(".content").append('<h4>Interests:</h4><div class="user-info" id="user-interests">' + thisUser.interests + '</div>');
  }
  if (thisUser.tagList){
    $("#info").find(".content").append('<h4>Tags:</h4><ul></ul>');

    $.each( thisUser.tagList, function( key, value ) {
      var i = parseInt(thisUser.tagList[key]);
      $("#info").find("ul").append('<li>' + tagList[i] + '</li>');
    });
  }
}
function showEditInfo(){
  $("#show-edit-info").addClass("disabled");
  var thisUser = users.user[localStorage.loggedIn];
  var infos = $("#info").find(".content").find("div");
  $("#info").find(".content").prepend('<form class="form-horizontal" id="edit-info-form"></form>');

  $.each( infos, function( key, value ) {
    var oldId = $(infos[key]).context.id;
    var oldValue = $(infos[key]).html();


    if ($(infos[key]).html().length < 20){
      $(infos[key]).html('<div class="form-group"><div class="col-md-8"><input id="edit-'+ oldId +'" name="location" type="text" value="' +  oldValue + '"class="form-control input-md"></div></div>');
    }
    else{
      $(infos[key]).html('<div class="form-group"><div class="col-md-8"><textarea id="edit-'+ oldId +'" class="form-control">' +  oldValue + '</textarea></div></div>');
    }
    $('#edit-info-form').append($(infos[key]).prev());
    $('#edit-info-form').append($(infos[key]));
  });
  $("#edit-info-form").append('<div class="form-group"><div class="col-md-8"><button id="edit-confirm-btn" type="button" class="btn btn-success">Save Changes</button><button id="edit-dismiss-btn" type="button" class="btn btn-danger">Dismiss</button></div></div>');
  $('#edit-confirm-btn').on("click", submitEditedInfo);
  $('#edit-dismiss-btn').on('click', showInfo);
}
function restOfTagsAsCheckboxes(){
  var thisUser = users.user[localStorage.loggedIn];
  $('#info').find(".content").append('<form id="tag-checkbox" class="form-horizontal"><fieldset><div class="form-group"></div></fieldset></form>');

  for (var i = 0; i < tagList.length; i++){
    var doNotAdd = false;
    var str = String(i);
    for (var j = 0; j < thisUser.tagList.length; j++){
      if (str == thisUser.tagList[j]){
        doNotAdd = true;
      }
    }
    if (!doNotAdd){
      $('#tag-checkbox').find(".form-group").append('<div class="checkbox"><label for="tags-'+ str +'">' + tagList[i] + '<input type="checkbox" class="tags" id="tags-'+ str +'" value="'+ str +'"></label></div>');   
    }
  }
  $('#tag-checkbox').append('<button id="add-tags-to-user" type="button" class="btn btn-primary">Submit</button>') 
  $('#add-tags-to-user').on("click", addTagsToUser);
}
function addTagsToUser(){
  var thisUser = users.user[localStorage.loggedIn];
  var tags = $('input:checkbox:checked').map(function() { return this.value;}).get();
  
  var tempObj =  {tagList : tags};

  users.user[localStorage.loggedIn] = $.extend(users.user[localStorage.loggedIn], tempObj);
  localStorage.users = JSON.stringify(users); 
}
$.fn.addMessageDetails = function(){
  $("#send-message-label").html("send message to " + $(this).data("user"));
  $("#send-message-confirm").data('index', $(this).data("index"));
}
$.fn.sendMessage = function(){
  var senderId = localStorage.loggedIn;
  var receiverId = $(this).data("index");
  var message = $("#message").val();
  var timestamp = Date.now();

  if (!users.user[parseInt(receiverId)][senderId]){

    var tempObj =  {};
    tempObj[senderId] = [{  
      message : message,
      timestamp : timestamp
    }];
    
    users.user[parseInt(receiverId)] = $.extend(users.user[parseInt(receiverId)], tempObj);
    localStorage.users = JSON.stringify(users); 
   
  }
  else{

    var tempObj = {
      message: message, 
      timestamp : timestamp
    }
    users.user[parseInt(receiverId)][senderId].push(tempObj);
   
  }
  if (!users.user[senderId][senderId]){
    
    var tempObj =  {};
    tempObj[senderId] = [{  
      message : message,
      timestamp : timestamp,
      receiverId : receiverId
    }];
    
    users.user[senderId] = $.extend(users.user[senderId], tempObj);
    localStorage.users = JSON.stringify(users); 
  }
  else{
    var tempObj = {
      message: message, 
      timestamp : timestamp,
      receiverId : receiverId
    }
    users.user[senderId][senderId].push(tempObj);
  }

  $('#send-message-modal').modal('hide');
}
function listMessages(){
  $("#accordion").empty();
  for (var i = 0; i < users.user.length; i++){
    if (users.user[i][localStorage.loggedIn] && i != parseInt(localStorage.loggedIn)){
      $("#accordion").append('<div class="panel panel-default"><div class="panel-heading"><h5 class="panel-title">'+ users.user[i].userName + '<button type="button" title="send&nbsp;message" id="send-message-btn" class="btn btn-default btn-sm icon-two"><span class="glyphicon glyphicon-send"></span></button><button type="button" title="view&nbsp;conversation" id="view-converstion-btn" class="btn btn-default btn-sm icon-two" data-toggle="collapse" data-target="#convo-'+ i +'" data-parent="#accordion"><span class="glyphicon glyphicon-eye-open"></h3></div></div>');
      $("#accordion").find(".panel-default:last-child").append('<div id="convo-'+ i +'" class="panel-collapse collapse convo"><div class="panel-body"></div></div>');
      var theseMessages = [];
      for (var j = 0; j < users.user[i][localStorage.loggedIn].length; j++){
        var tempObj = users.user[i][localStorage.loggedIn][j];
        var newProp = {senderId : i};
        tempObj = $.extend(tempObj, newProp);
        theseMessages.push(tempObj);
      }
      if(users.user[localStorage.loggedIn][i]){
        for (var k = 0; k < users.user[localStorage.loggedIn][i].length; k++){
          theseMessages.push(users.user[localStorage.loggedIn][i][k]);
        }
      }
      var realArray = $.makeArray(theseMessages);
      function sortByTimestamp(a, b){
        return a.timestamp - b.timestamp;
      }
      realArray.sort(sortByTimestamp);
      realArray.reverse();
      console.log(realArray);
      for (var l = 0; l < realArray.length; l++){
        if (realArray[l].senderId){
          var thisTimestamp = String(new Date(realArray[l].timestamp));
          thisTimestamp = thisTimestamp.substr(0, 24);
          $("#convo-"+ i +"").find(".panel-body").append('<div class="sender"><p class="timestamp">'+thisTimestamp+'</p>'+realArray[l].message+'</div><br>');
        }
        else{
          var thisTimestamp = String(new Date(realArray[l].timestamp));
          thisTimestamp = thisTimestamp.substr(0, 24);
          $("#convo-"+ i +"").find(".panel-body").append('<div class="receiver">'+thisTimestamp+'<br>'+realArray[l].message+'</div>');
        }
      }
    }
  }
}

$("#reg-name").keyup($.fn.valName);
$("#reg-password").keyup($.fn.valPassword);
$("#reg-repeat").keyup($.fn.valRepeat);
$("#reg-email").keyup($.fn.valEmail);
$('#register-confirm').on("click", register);
$('#log-in-confirm').on("click", login);
$('#log-out-confirm').on("click", logout);
$('#add-info-btn').on("click", addInfoForm);
$('#add-info-confirm').on("click", addInfo);
$('#show-edit-info').on("click", showEditInfo);
$('#send-message-confirm').on("click", $.fn.sendMessage);

