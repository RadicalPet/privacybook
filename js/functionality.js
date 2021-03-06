/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
 
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {

  var pluses = /\+/g;

  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }

  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
      // Replace server-side written pluses with spaces.
      // If we can't decode the cookie, ignore it, it's unusable.
      // If we can't parse the cookie, ignore it, it's unusable.
      s = decodeURIComponent(s.replace(pluses, ' '));
      return config.json ? JSON.parse(s) : s;
    } catch(e) {}
  }

  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }

  var config = $.cookie = function (key, value, options) {

    // Write

    if (arguments.length > 1 && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setTime(+t + days * 864e+5);
      }

      return (document.cookie = [
        encode(key), '=', stringifyCookieValue(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        options.secure  ? '; secure' : ''
      ].join(''));
    }

    // Read

    var result = key ? undefined : {};

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling $.cookie().
    var cookies = document.cookie ? document.cookie.split('; ') : [];

    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = decode(parts.shift());
      var cookie = parts.join('=');

      if (key && key === name) {
        // If second argument (value) is a function it's a converter...
        result = read(cookie, value);
        break;
      }

      // Prevent storing a cookie that we couldn't decode.
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }

    return result;
  };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    if ($.cookie(key) === undefined) {
      return false;
    }

    // Must not alter options, thus extending a fresh object...
    $.cookie(key, '', $.extend({}, options, { expires: -1 }));
    return !$.cookie(key);
  };
}));

$( document ).ready(function() {
  if (parseInt(localStorage.loggedIn) > -1 && (parseInt(localStorage.groupView) < 0 || !localStorage.groupView)){
    $(".logged-in").show();
    $(".logged-out").hide();
    $(".group-view").hide();
    $(".admin").hide();
    $("#bg1, #bg2, #bg3").css("background", "url(img/underwater4.png)repeat 0 0");
    _.throttle(loadProfileData(), 100);
  }
  else if (parseInt(localStorage.groupView) > -1){
    $(".logged-in").hide();
    $(".logged-out").hide();
    $(".admin").hide();
    $(".group-view").show();
    $("#bg1, #bg2, #bg3").css("background", "url(img/rainbow.png)repeat 0 0");
    _.throttle(loadGroupData(), 100);
  }
  else if ((parseInt(localStorage.admin) > -1)){
    $(".logged-in").hide();
    $(".logged-out").hide();
    $(".admin").show();
    $(".group-view").hide();
    $("#bg1, #bg2, #bg3").css("background", "none");
    if (localStorage.viewing > -1){
      $.fn.viewUserAdmin(localStorage.viewing);
    }
    else{
      _.throttle(loadAdminData(), 100);
    }
   
  }
  else{
    $(".logged-in").hide();
    $(".logged-out").show();
    $(".admin").hide();
    $(".group-view").hide();
  }

/**TOOLTIP**/  
  $("[title]").tooltip({
    placement: 'top',
    animation: 'true'
  });

/**SCROLLSPY**/
  $('.navbar-fixed-top').scrollspy();
  var offsetHeight = $(window).height() * 0.2;

  $('body').scrollspy({
    offset: offsetHeight
  });

  $('[data-spy="scroll"]').each(function () {
    var $spy = $(this).scrollspy('refresh');
  })

/**ACCORDION**/
  $("#accordion").on('shown.bs.collapse', function () {
    var active = $("#accordion .in").attr('id');
    $.cookie('activeAccordionGroup', active);
          //  alert(active);
    });
    $("#accordion").on('hidden.bs.collapse', function () {
      $.removeCookie('activeAccordionGroup');
    });
    var last = $.cookie('activeAccordionGroup');
    if (last != null) {
    //remove default collapse settings
    $("#accordion .panel-collapse").removeClass('in');
            //show the account_last visible group
    $("#" + last).addClass("in");
  }
});

_.throttle($( window ).resize(function() {
  location.reload();
}), 100);

/**$('.navbar-fixed-top').on('activate.bs.scrollspy', function () {
  window.location.hash = $(".navbar-fixed-top").find(".active").find("a").attr("href");
});**/


/**REGISTER / LOGIN / LOGOUT**/

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
        password : passwordCrypt,
        blocked : false,
        deleted : false
      }
    );
    localStorage.users = JSON.stringify(users);
    groups[0].members.push(users.user.length - 1);
    localStorage.groups = JSON.stringify(groups);
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
  var isAdmin = -1;

  for (var i = 0; i < users.user.length; i++){

    if (name == users.user[i].userName && users.user[i].deleted == false){
      registeredUser = i;
      $("#user-name").closest('.form-group').removeClass("has-error");
      $("#user-name").closest('.form-group').addClass("has-success");
    }
    else {

      if (i == users.user.length - 1 && registeredUser == -1){
        $("#user-name").closest('.form-group').removeClass("has-success");
        $("#user-name").closest('.form-group').addClass("has-error");
        
        for (var j = 0; j < users.admin.length; j++){

          if (name == users.admin[j].adminName){
            isAdmin = j;
            $("#user-name").closest('.form-group').removeClass("has-error");
            $("#user-name").closest('.form-group').addClass("has-success");
          }
        }
      }
    }
  }
  if (registeredUser > -1){      
    if (password == sjcl.decrypt("password", users.user[registeredUser].password)){
      localStorage.setItem("loggedIn", registeredUser);

      loadProfileData();

      if (users.user[registeredUser].blocked == true){
         alert("You have been blocked! Check your messages for the reason!");
      }
      $('#log-in-modal').modal('hide');
      $('.logged-in').show();
      $('.logged-out').hide(); 
    }
    else{
      $("#user-name").closest('.form-group').removeClass("has-error");
      $("#user-password").closest('.form-group').addClass("has-error");
    }
  }
  else if(isAdmin > -1){
     if (password == sjcl.decrypt("password", users.admin[isAdmin].password)){
      localStorage.setItem("admin", isAdmin);

      $('#log-in-modal').modal('hide');
      $('.admin').show();
      $('.logged-out').hide(); 
       _.throttle(loadAdminData(), 100);
       location.reload();

    }
    else{
      $("#user-name").closest('.form-group').removeClass("has-error");
      $("#user-password").closest('.form-group').addClass("has-error");
    }
  }
}
function logout(){
  localStorage.setItem("loggedIn", -1);
  localStorage.setItem("admin", -1);
  localStorage.setItem("viewing", -1);
  $('#log-out-modal').modal('hide');
  $('.logged-in').hide();
  $('.admin').hide();
  $('.logged-out').show(); 
}

/**DISPLAY STUFF**/

function loadProfileData(){


  var i = parseInt(localStorage.getItem("loggedIn"));
  var thisUser = users.user[localStorage.loggedIn];
  var userName = users.user[i].userName;
  $("#home").find("h2").html(userName);
  if (thisUser.avatar){
    $("#home").find(".well-lg").append('<img src="'+thisUser.avatar+'" class="avatar-img" height="100" />');
  }

  if (thisUser.blocked == true){
    $("#home").find("h2").append("<span class='blocked'>&nbsp;&nbsp;&nbsp;(BLOCKED! If you want to appeal the block write an email to admin@privacybook.net)</span>");
  }
  showUsers();
  showInfo(thisUser);
  listMessages();
  showUserGroups();
  showPublicGroups();
  showSettings();
}
function loadGroupData(){
  var i = parseInt(localStorage.getItem("groupView"));
  var groupName = groups[i].groupName;
  $("#group").find("h2").html(groupName);
  listPosts();
  showMembers();
  listUserPosts();
}
function loadAdminData(){
 listUsersAdmin();
  listAllAdmins();
  if (users.admin[parseInt(localStorage.admin)].newAdmin == true){
    users.admin[parseInt(localStorage.admin)].newAdmin = false;
    localStorage.users = JSON.stringify(users);
    alert("Please change your password! (that's not implemented :P )");

  }
}
function showUsers(){
  $("#public-users").children().find("ul").empty();
  $.each( users.user, function( key, value ) {
    if (users.user[key].avatar){
      $("#public-user-list").append('<li><img src="'+users.user[key].avatar+'" class="avatar-tiny" height="25" /><div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle"  data-index="'+key+'" data-user="'+ users.user[key].userName +'" data-toggle="dropdown"><span class="caret"></span> ' + users.user[key].userName + '</button></div></li>');
    }
    else{
      $("#public-user-list").append('<li><img src="img/black.jpg" class="avatar-tiny" height="25" /><div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle"  data-index="'+key+'" data-user="'+ users.user[key].userName +'" data-toggle="dropdown"><span class="caret"></span> ' + users.user[key].userName + '</button></div></li>');
    }
    $("#public-user-list").find('li:last-child').find('div').append('<ul class="dropdown-menu" role="menu"><li><a href="#" class="profile-link" data-index="'+key+'" data-toggle="modal" data-target="#view-profile-modal">view profile</a></li><li><a href="#" data-toggle="modal" data-target="#send-message-modal">send message</a></li></ul>');
  });
  $('.dropdown-toggle').on("click", $.fn.addMessageDetails);
  $('.profile-link').on("click", $.fn.addProfileDetails);
}
function showInfo(thisUser){
  
  if (localStorage.loggedIn > -1){
    $("#show-edit-info").removeClass("disabled");
    $(".info").find(".content").empty();
  }
  if (thisUser.userLocation){
    $(".info").find(".content").append('<h4>Location:</h4><div class="user-info" id="user-location">' + thisUser.userLocation + '</div>');  
    
  }
  if (thisUser.about){
    $(".info").find(".content").append('<h4>About me:</h4><div class="user-info" id="user-about">' + thisUser.about + '</div>');
  }
  if (thisUser.interests){
    $(".info").find(".content").append('<h4>Interests:</h4><div class="user-info" id="user-interests">' + thisUser.interests + '</div>');
  }
  if (thisUser.tagList){
    $(".info").find(".content").append('<hr><h4>Tags:<button title="add&nbsp;tags" class="btn btn-default btn-sm icon-two add-tags-btn" onclick="restOfTagsAsCheckboxes()"><span class="glyphicon glyphicon-plus"></span></button></h4><ul></ul>');

    $.each( thisUser.tagList, function( key, value ) {
      var i = parseInt(thisUser.tagList[key]);
      $(".info").find("ul").append('<li class="col-xs-3"><span class="taggy">' + tagList[i] + '<span class="remove-tag" onclick="removeTag('+key+')">&nbsp;&nbsp;X</span></span></li>');
    });
  }
  if (!thisUser.tagList){
     $(".info").find(".content").append('<hr><h4>Tags:<button title="add&nbsp;tags" class="btn btn-default btn-sm icon-two add-tags-btn" onclick="restOfTagsAsCheckboxes()"><span class="glyphicon glyphicon-plus"></span></button></h4><ul></ul>');
  }
}
function listAdminMessages(){
  if (users.user[localStorage.loggedIn].admin){
    for (var i = 0; i < users.user[localStorage.loggedIn].admin.length; i++){
      var thisTimestamp = String(new Date(users.user[localStorage.loggedIn].admin[i].timestamp));
          thisTimestamp = thisTimestamp.substr(0, 24);
      if (users.user[localStorage.loggedIn].admin[i].read == false){
        $("#accordion").prepend('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><span class="admin-msg">ADMIN</span><button type="button" title="view&nbsp;conversation" class="btn btn-default btn-sm icon-two view-admin-msg view-convo" data-toggle="collapse" data-target="#convo-admin-'+i+'" data-parent="#accordion"><span class="glyphicon glyphicon-eye-open"></h3></div></div>');
        $("#accordion").find(".panel-default:first-child").append('<div id="convo-admin-'+i+'" class="panel-collapse collapse convo"><div class="panel-body"></div></div>');
        $("#convo-admin-"+ i +"").find(".panel-body").append('<div class="sender"><p class="timestamp">'+thisTimestamp+'</p>'+users.user[localStorage.loggedIn].admin[i].message+'</div>');      
      }
      else{
        $("#accordion").append('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><span class="admin-msg">ADMIN</span><button type="button" title="view&nbsp;conversation" class="btn btn-default btn-sm icon-two view-convo" data-toggle="collapse" data-target="#convo-admin-'+i+'" data-parent="#accordion"><span class="glyphicon glyphicon-eye-open"></h3></div></div>');
        $("#accordion").find(".panel-default:last-child").append('<div id="convo-admin-'+i+'" class="panel-collapse collapse convo"><div class="panel-body"></div></div>');
        $("#convo-admin-"+ i +"").find(".panel-body").append('<div class="sender"><p class="timestamp">'+thisTimestamp+'</p>'+users.user[localStorage.loggedIn].admin[i].message+'</div>');      
      }
    }
  }
  $(".view-admin-msg").on("click", $.fn.adminMessageRead);
}
$.fn.adminMessageRead = function(){

  var target = $(this).data("target");
  target = target.substr(13, target.length);
  users.user[localStorage.loggedIn].admin[target].read = true;
  localStorage.users = JSON.stringify(users);
}
function listMessages(){

  $("#accordion").empty();
  //for the amount of users
  for (var i = 0; i < users.user.length; i++){
    
    //for the received messages (received messages have the sender-id as propertyname, sent messages the logged-in user id)
    if (users.user[localStorage.loggedIn][i] && i != localStorage.loggedIn){
      
      //create panel for this sender of the messages
      $("#accordion").append('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">'+ users.user[i].userName + '<button type="button" title="send&nbsp;message" class="message-from-list-btn btn btn-default btn-sm icon-two" data-toggle="collapse" data-target="#send-message-from-list"><span class="glyphicon glyphicon-send"></span></button><button type="button" title="view&nbsp;conversation" class="btn btn-default btn-sm icon-two view-convo" data-toggle="collapse" data-target="#convo-'+ i +'" data-parent="#accordion"><span class="glyphicon glyphicon-eye-open"></h3></div></div>');
      $("#accordion").find(".panel-default:last-child").append('<div id="convo-'+ i +'" class="panel-collapse collapse convo"><div class="panel-body"></div></div>');
      
      //create empty arrray for the messages
      var theseMessages = [];
     
      for (var j = 0; j < users.user[localStorage.loggedIn][i].length; j++){
        
        var tempObj = users.user[localStorage.loggedIn][i][j];
       
        var newProp = {senderId : i};
        tempObj = $.extend(tempObj, newProp);
        theseMessages.push(tempObj);
      
      }
      if (users.user[localStorage.loggedIn][localStorage.loggedIn]){
        for (var k = 0; k < users.user[localStorage.loggedIn][localStorage.loggedIn].length; k++){
           if (parseInt(users.user[localStorage.loggedIn][localStorage.loggedIn][k].receiverId) == i){
            theseMessages.push(users.user[localStorage.loggedIn][localStorage.loggedIn][k]);
            
          }
        }
      }   
      
      var realArray = $.makeArray(theseMessages);
      
      function sortByTimestamp(a, b){
        return a.timestamp - b.timestamp;
      }
      
      realArray.sort(sortByTimestamp); 
      realArray.reverse();
    
      
      for (var l = 0; l < realArray.length; l++){
        if (realArray[l].senderId){
  
          var thisTimestamp = String(new Date(realArray[l].timestamp));
          thisTimestamp = thisTimestamp.substr(0, 24);
          $("#convo-"+ i +"").find(".panel-body").append('<div class="sender"><p class="timestamp">'+thisTimestamp+'</p>'+realArray[l].message+'</div>');
        }
        else{
          var thisTimestamp = String(new Date(realArray[l].timestamp));
          thisTimestamp = thisTimestamp.substr(0, 24);
          $("#convo-"+ i +"").find(".panel-body").append('<div class="receiver"><p class="timestamp">'+thisTimestamp+'</p>'+realArray[l].message+'</div>');
        }
      }
    }
  }
  if (users.user[localStorage.loggedIn][localStorage.loggedIn]){
    var thoseMessages = [];
    for (var k = 0; k < users.user[localStorage.loggedIn][localStorage.loggedIn].length; k++){
      var oneWayConvo = users.user[localStorage.loggedIn][localStorage.loggedIn][k];
      
      thoseMessages.push(oneWayConvo);
            
      if ($("#convo-"+oneWayConvo.receiverId+"").length == 0){

        $("#accordion").append('<div class="panel panel-default"><div class="panel-heading"><h5 class="panel-title">'+ users.user[oneWayConvo.receiverId].userName + '<button type="button" title="send&nbsp;message" class="message-from-list-btn btn btn-default btn-sm icon-two" data-toggle="collapse" data-target="#send-message-from-list"><span class="glyphicon glyphicon-send"></span></button><button type="button" title="view&nbsp;conversation" class="btn btn-default btn-sm icon-two view-convo" data-toggle="collapse" data-target="#convo-'+ oneWayConvo.receiverId +'" data-parent="#accordion"><span class="glyphicon glyphicon-eye-open"></h3></div></div>');
        $("#accordion").find(".panel-default:last-child").append('<div id="convo-'+ oneWayConvo.receiverId +'" class="panel-collapse collapse convo oneway"><div class="panel-body"></div></div>');
    
      }
    }
    var realArrayAgain = $.makeArray(thoseMessages);
        realArrayAgain.sort(sortByTimestamp);
        realArrayAgain.reverse();

    for (var l = 0; l < realArrayAgain.length; l++){
      if ($("#convo-"+ realArrayAgain[l].receiverId +"").hasClass('oneway')){
        var thisTimestamp = String(new Date(realArrayAgain[l].timestamp));
            thisTimestamp = thisTimestamp.substr(0, 24);
        $("#convo-"+ realArrayAgain[l].receiverId +"").find(".panel-body").append('<div class="receiver"><p class="timestamp">'+thisTimestamp+'</p>'+realArrayAgain[l].message+'</div>');
      }    
    }
  }
  $('.message-from-list-btn').on("click", $.fn.addMessageData); 
   
  $("#accordion").on('shown.bs.collapse', function () {
    var active = $("#accordion .in").attr('id');
    $.cookie('activeAccordionGroup', active);
          //  alert(active);
    });
    $("#accordion").on('hidden.bs.collapse', function () {
      $.removeCookie('activeAccordionGroup');
    });
    var last = $.cookie('activeAccordionGroup');
    if (last != null) {
    //remove default collapse settings
    $("#accordion .panel-collapse").removeClass('in');
            //show the account_last visible group
    $("#" + last).addClass("in");
  }
  listAdminMessages();
}
/** VIEW PROFILE **/

$.fn.addProfileDetails = function(){
  var index = $(this).data("index");
  $("#view-profile-label").html(""+ users.user[index].userName +"");
  if (users.user[index].avatar){
    $("#view-profile-label").append('<img src="'+users.user[index].avatar+'" class="avatar-img" height="100" />');
  }
  showInfo(users.user[index]);
  if ($("#view-profile-modal").find(".content").is(':empty')){
    $("#view-profile-modal").find(".content").html(users.user[index].userName + " has no Info public!");
  }
  $("#view-profile-modal").find(".add-tags-btn").remove();
  $("#view-profile-modal").find(".remove-tag").remove();

}

/**ADD INFO**/

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
  location.reload();
}

/**EDITING**/


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
  $('#edit-dismiss-btn').on('click', loadProfileData);
}
function submitEditedInfo(){
  var thisUser = users.user[localStorage.loggedIn];
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
  showInfo(thisUser);
}

/**TAGS TAGS TAGS**/

function restOfTagsAsCheckboxes(){
  $(".add-tags-btn").addClass("disabled");

  var thisUser = users.user[localStorage.loggedIn];
  $('#info').find(".content").append('<hr><form id="tag-checkbox" class="form-horizontal"><fieldset><div class="form-group"></div></fieldset></form>');

  for (var i = 0; i < tagList.length; i++){
    var doNotAdd = false;
    var str = String(i);
    if (thisUser.tagList){
      for (var j = 0; j < thisUser.tagList.length; j++){
        if (str == thisUser.tagList[j]){
          doNotAdd = true;
        }
      }
    }
    if (!doNotAdd){
      $('#tag-checkbox').find(".form-group").append('<div class="checkbox col-xs-4"><label for="tags-'+ str +'">' + tagList[i] + '<input type="checkbox" class="tags" id="tags-'+ str +'" value="'+ str +'"></label></div>');   
    }
  }
  $('#tag-checkbox').append('<button id="add-tags-to-user" type="button" class="btn btn-primary">Submit</button>') 
  $('#add-tags-to-user').on("click", addTagsToUser);
}
function addTagsToUser(){
  $("#add-tags-btn").removeClass("disabled");
  var thisUser = users.user[localStorage.loggedIn];
  var tags = $('input:checkbox:checked').map(function() { return this.value;}).get();
  
  var tempObj =  {tagList : tags};
  if (tags.length > 0){
    if (!thisUser.tagList){
      users.user[localStorage.loggedIn] = $.extend(users.user[localStorage.loggedIn], tempObj);
    }
    else{
      console.log(tags);
      console.log(users.user[localStorage.loggedIn].tagList);
      users.user[localStorage.loggedIn].tagList = users.user[localStorage.loggedIn].tagList.concat(tags);
    }
    localStorage.users = JSON.stringify(users); 
  }
  $('#tag-checkbox').remove();
  showInfo(thisUser);
}
function removeTag(index){
  console.log(index);
  users.user[localStorage.loggedIn].tagList.splice(index, 1);
  localStorage.users = JSON.stringify(users);
  showInfo(users.user[localStorage.loggedIn]);
}

/**MESSAGING STUFF**/

$.fn.addMessageDetails = function(){
  $("#send-message-label").html("send message to " + $(this).data("user"));
  $("#send-message-from-modal-confirm").data('index', $(this).data("index"));
}
$.fn.addMessageData = function(){
  var target = $(this).parent().find(".view-convo").data("target");
  var receiverId = target.slice(7, target.length);
  
  var currentDiv = $(target).selector;
  

  $("#send-message-from-list-confirm").data('index', receiverId);
  $("#legendary").html("Send message to "+users.user[receiverId].userName+"");
  var offset = $(target).parent().offset().top;
  //console.log(offset);
  var parentOffset = $("#messages").find(".content").offset().top;
  var relativeOffset = offset - parentOffset +9;
  $("#messages").find("fieldset").css("margin-top", ""+relativeOffset+"px");
  resizeMessageInput(currentDiv);
}
$.fn.setModalMessageData = function(){
  if (localStorage.loggedIn > -1){
    var senderId = localStorage.loggedIn;
  }
  if (localStorage.admin > -1){
    var senderId = "admin";
  }
  var receiverId = $(this).data("index");
  var message = $("#message-in-modal").val();
  var timestamp = Date.now();

  $.fn.sendMessage(senderId, receiverId, message, timestamp);
}
$.fn.setListMessageData = function(){

  var senderId = localStorage.loggedIn;
  var receiverId = $(this).data("index");
 
  var message = $("#message-in-list").val();
  var timestamp = Date.now();

  $.fn.sendMessage(senderId, receiverId, message, timestamp);
  $("#message-in-list").val('');
  listMessages();
}
$.fn.sendMessage = function(senderId, receiverId, message, timestamp){
  var sendable = true;
  if (localStorage.loggedIn > -1){
    if(message == "" || users.user[senderId].blocked == true){
      sendable = false;
    }
  }
  if (sendable == true){
    if (!users.user[parseInt(receiverId)][senderId]){
      var tempObj =  {};
    
      tempObj[senderId] = [{  
        message : message,
        timestamp : timestamp
      }];
      if (senderId == "admin"){
        tempObj[senderId].push({read : false});
      }
    
      users.user[parseInt(receiverId)] = $.extend(users.user[parseInt(receiverId)], tempObj);
      localStorage.users = JSON.stringify(users); 
   
    }
    else{

      var tempObj = {
        message: message, 
        timestamp : timestamp
      }
      if (senderId == "admin"){
        tempObj = $.extend(tempObj, {read : false});
      }
      users.user[parseInt(receiverId)][senderId].push(tempObj);
    }
    if (localStorage.loggedIn > -1){
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
      }
      users.user[senderId][senderId].push(tempObj);

    }
    localStorage.users = JSON.stringify(users); 
  }
  if (localStorage.loggedIn > -1){
    if (users.user[senderId].blocked == true){
      alert("You can not send messages!");
    }
  }
  $('#send-message-modal').modal('hide');
}
function resizeMessageInput(currentDiv){
  if (window.innerWidth < 992){
    $("#messages").find(".message-form").prependTo(""+currentDiv +"");
    $("#messages").find("fieldset").css("margin-top", "0px");
    $("#messages").find("fieldset").css("margin-left", "4%");
  }
}

/**GROUPS**/
function startNewGroup(){
  
}
function setJoinGroupData(groupId){
  if(groups[groupId].privacyStatus == "public"){
    $("#join-group-label").html('The group <span class="group-name">' + groups[groupId].groupName + '</span> is open, so you will be seen by all members right away. Do you want to join?');
    $("#join-group-confirm").data("group-id", groupId);
    $("#join-group-confirm").on("click", $.fn.joinOpenGroup);
  }
}
$.fn.setLeaveGroupData = function(){
    var groupId = $(this).data("index");
    $("#leave-group-label").html('Do you really want to leave <span class="group-name">' + groups[groupId].groupName + '</span> ?');
    $("#leave-group-confirm").data("group-id", groupId);
}
$.fn.joinOpenGroup = function(){
  var groupId = $(this).data("group-id");
  var memberId = localStorage.loggedIn;

  groups[groupId].members.push(parseInt(memberId));
  localStorage.groups = JSON.stringify(groups);

  showUserGroups();
  showPublicGroups();
  $("#join-group-modal").modal('hide');
}
$.fn.leaveGroup = function(){
  
  var groupId = $(this).data("group-id");
  var memberId = localStorage.loggedIn;
  var memberIndex = groups[groupId].members.indexOf(parseInt(memberId));

  groups[groupId].members.splice(memberIndex, 1);
  localStorage.groups = JSON.stringify(groups);

  showUserGroups();
  showPublicGroups();
  $("#leave-group-modal").modal('hide');
}
function showPublicGroups(){
  $("#public-group-list").empty();
  for (var i = 0; i < groups.length; i++){
    var isMember = false;
    for (var j = 0; j < groups[i].members.length; j++){
      if (groups[i].members[j] == localStorage.loggedIn){
        isMember = true;
      }
    }  
    if (isMember == false){
      $("#public-group-list").append('<li><div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle"  data-index="'+ i +'" data-user="'+ groups[i].groupName +'" data-toggle="dropdown"><span class="caret"></span> ' + groups[i].groupName + '</button></div></li>');
      $("#public-group-list").find('li:last-child').find('div').append('<ul class="dropdown-menu" role="menu"><li><a href="javascript:void(0);" onclick="setJoinGroupData('+i+')" data-toggle="modal" data-target="#join-group-modal">join&nbsp;group</a></li></ul>');
    }
  }
}
function showUserGroups(){
  $("#group-list").empty();
  for (var i = 0; i < groups.length; i++){
    for (var j = 0; j < groups[i].members.length; j++){
      if (groups[i].members[j] == localStorage.loggedIn){
        $("#group-list").append('<h3 class="group-item">'+ groups[i].groupName + '<button type="button" title="leave&nbsp;group" class="leave-group-btn btn btn-default btn-sm icon-two" data-index="'+i+'" data-toggle="modal" data-target="#leave-group-modal"><span class="glyphicon glyphicon-remove"></span></button><button type="button" title="view&nbsp;group" class="btn view-group-btn btn-default btn-sm icon-two" data-index="'+i+'"><span class="glyphicon glyphicon-eye-open"></h3>');       
        $(".leave-group-btn").on("click", $.fn.setLeaveGroupData);
      }
    }
  }
  $('.view-group-btn').on("click", $.fn.viewGroup);
}
$.fn.viewGroup = function(){
  localStorage.setItem("groupView", $(this).data("index"));
  window.scrollTo(0, 0);
  location.reload();
}
function leaveGroupView(){
  localStorage.setItem("groupView", "-1");
  window.scrollTo(0, 0);
  location.reload();
}
function showMembers(){
 $("#member-list").empty();
  $.each( groups[localStorage.groupView].members, function( key, value ) {
    $("#member-list").append('<li><div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle"  data-index="'+key+'" data-user="'+ users.user[groups[localStorage.groupView].members[key]].userName +'" data-toggle="dropdown"><span class="caret"></span> ' + users.user[groups[localStorage.groupView].members[key]].userName + '</button></div></li>');
    $("#member-list").find('li:last-child').find('div').append('<ul class="dropdown-menu" role="menu"><li><a href="#" data-toggle="modal" data-target="profile-modal">view profile</a></li><li><a href="#" data-toggle="modal" data-target="#send-message-modal">send message</a></li></ul>');
    if (users.user[groups[localStorage.groupView].members[key]].avatar){
      $("#member-list").find('li:last-child').prepend('<img src="'+users.user[groups[localStorage.groupView].members[key]].avatar+'" class="avatar-tiny" height="25" />');
    }
    else{
      $("#member-list").find('li:last-child').prepend('<img src="img/black.jpg" class="avatar-tiny" height="25" />');
    }
  });
  $('.dropdown-toggle').on("click", $.fn.addMessageDetails);
}

/**POSTING**/
function newPost(){
  var memberId = localStorage.loggedIn;
  var groupId = localStorage.groupView;
  var title = $("#new-post-title").val();
  var post = $("#new-post-form").val();
  var timestamp = Date.now();

  var tempObj =  {
    memberId : memberId, 
    groupId : groupId,
    title : title, 
    post : post,
    timestamp : timestamp
  }

  posts.push(tempObj);
  localStorage.posts = JSON.stringify(posts);
  $("#new-post-form").val(''); 
  $("#new-post").removeClass("in");
  loadGroupData();
}
$.fn.newReply = function(){
  var postId = $(this).parent()[0].id;
  postId = postId.slice(9, postId.length);
  var reply = $(this).parent().find("textarea").val();
  var memberId = localStorage.loggedIn;
  var timestamp = Date.now();

  var tempObj =  {
    postId : postId, 
    memberId : memberId, 
    reply : reply,
    timestamp : timestamp
  }
  if (posts[postId].replies){
    if (tempObj.reply != ""){
      posts[postId].replies.push(tempObj);
    }
  }
  else{
    if (tempObj.reply != ""){
      posts[postId] = $.extend(posts[postId], {replies : [tempObj]});
    }
  }
  localStorage.posts = JSON.stringify(posts);
  $(this).parent().find("textarea").val(''); 
  $(this).parent().removeClass("in");
  loadGroupData();
}
function listPosts(){
  $("#post-accordion").empty();

  var thesePosts = [];
  var theseReplies = [];
  for (var i = 0; i < posts.length; i++){
    if (posts[i].groupId == localStorage.groupView){
      posts[i] = $.extend(posts[i], {postId : i});
      thesePosts.push(posts[i]);
      if (posts[i].replies){
        for (var j = 0; j < posts[i].replies.length; j++ ){
          theseReplies.push(posts[i].replies[j]);
        }
      }
    }
  }

  var realArray = $.makeArray(thesePosts);    
  function sortByTimestamp(a, b){
    return a.timestamp - b.timestamp;
  }
  realArray.reverse();
  for (var j = 0; j < realArray.length; j++){
    $("#post-accordion").append('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">'+ realArray[j].title + '&nbsp;&nbsp;&nbsp;<span class="author">by '+users.user[realArray[j].memberId].userName+'</span><button type="button" title="reply" class="btn btn-default btn-sm icon-two view-post" data-toggle="collapse" data-target="#reply-to-'+realArray[j].postId+'" ><span class="glyphicon glyphicon-share-alt"></button><button type="button" title="view&nbsp;post" class="btn btn-default btn-sm icon-two view-post" data-toggle="collapse" data-target="#post-'+ realArray[j].postId +'" data-parent="#post-accordion"><span class="glyphicon glyphicon-eye-open"></button></h3></div></div>');
    $("#post-accordion").find(".panel-default:last-child").append('<div id="post-'+ realArray[j].postId +'" class="panel-collapse collapse post"><div class="panel-body"></div></div>');  
    $("#post-"+ realArray[j].postId +"").append('<div class="post-body">' + realArray[j].post + '</div>');
    $("#post-"+ realArray[j].postId +"").append('<div id="reply-to-'+realArray[j].postId+'" class="collapse"><textarea name="message" class="form-control"></textarea><button type="button" class="reply-confirm btn btn-sm form-control">Reply</button></div>');
    $('.reply-confirm').on("click", $.fn.newReply);
     for (var k = 0; k < theseReplies.length; k++){
      if (theseReplies[k].postId == realArray[j].postId){
        $("#post-"+ realArray[j].postId +"").append('<div class="reply-body"><span class="reply-username">'+users.user[theseReplies[k].memberId].userName+':</span>&nbsp;&nbsp;&nbsp;'+ theseReplies[k].reply + '</div>');
      }
    }

  }  
}
function listUserPosts(){
  $("#own-post-accordion").empty();

  var thesePosts = [];
  var theseReplies = [];
  for (var i = 0; i < posts.length; i++){
    if (posts[i].groupId == localStorage.groupView && posts[i].memberId == localStorage.loggedIn){
      posts[i] = $.extend(posts[i], {postId : i});
      thesePosts.push(posts[i]);
      if (posts[i].replies){
        for (var j = 0; j < posts[i].replies.length; j++ ){
          theseReplies.push(posts[i].replies[j]);
        }
      }
    }
  }

  var realArray = $.makeArray(thesePosts);    
  function sortByTimestamp(a, b){
    return a.timestamp - b.timestamp;
  }
  realArray.reverse();
  for (var j = 0; j < realArray.length; j++){
    $("#own-post-accordion").append('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">'+ realArray[j].title + '<button type="button" title="delete" class="btn btn-default btn-sm icon-two delete-post" data-toggle="modal" data-target="#delete-post-modal" data-index="'+realArray[j].postId+'"><span class="glyphicon glyphicon-remove"></button><button type="button" title="view&nbsp;post" class="btn btn-default btn-sm icon-two view-post" data-toggle="collapse" data-target="#own-post-'+ realArray[j].postId +'" data-parent="#post-accordion"><span class="glyphicon glyphicon-eye-open"></button></h3></div></div>');
    $("#own-post-accordion").find(".panel-default:last-child").append('<div id="own-post-'+ realArray[j].postId +'" class="panel-collapse collapse post"><div class="panel-body"></div></div>');  
    $("#own-post-"+ realArray[j].postId +"").append('<div class="post-body">' + realArray[j].post + '</div>');
    $("#own-post-"+ realArray[j].postId +"").append('<div id="own-reply-to-'+realArray[j].postId+'" class="collapse"><textarea name="message" class="form-control"></textarea><button type="button" class="reply-confirm btn btn-sm form-control">Reply</button></div>');
    $('.reply-confirm').on("click", $.fn.newReply);
    for (var k = 0; k < theseReplies.length; k++){
      if (theseReplies[k].postId == realArray[j].postId){
        $("#own-post-"+ realArray[j].postId +"").append('<div class="reply-body"><span class="reply-username">'+users.user[theseReplies[k].memberId].userName+':</span>&nbsp;&nbsp;&nbsp;'+ theseReplies[k].reply + '</div>');
      }
    }
  }
  $(".delete-post").on("click", $.fn.addPostDeleteData);
}
$.fn.addPostDeleteData = function(){
  $("#delete-post-modal").find(".modal-body").html(posts[$(this).data("index")].title);
  $('#delete-post-confirm').data("index", $(this).data("index"));
}
$.fn.deletePost = function(){
  var postId = $(this).data("index");
  posts.splice(postId, 1);
  localStorage.posts = JSON.stringify(posts); 
  $('#delete-post-modal').modal('hide');
  if (localStorage.viewing < 0){
    loadGroupData();
  }
  else{
    listAllUserPosts();
  }  
}

/** SETTINGS **/
function showSettings(){
  avatarSetting();
  showEmail();
}
function avatarSetting(){
  $("#avatar").empty();
  if (users.user[localStorage.loggedIn].avatar){
    $("#avatar").prepend('<img src="'+users.user[localStorage.loggedIn].avatar+'" class="avatar-img" height="100" /><br><button type="button" id="change-avatar" class="btn btn-default settings">Change</button><div id="fileDisplayArea"></div>')
    $("#change-avatar").on("click", uploadAvatar);
  }
  else{
    uploadAvatar();
  }
}
function uploadAvatar(){
    
    $("#avatar").append('<div id="fileDisplayArea"></div><input type="file" id="avatar-input"><button type="button" id="set-avatar">set as avatar</button>'); 

    var fileInput = document.getElementById('avatar-input');
    var fileDisplayArea = document.getElementById('fileDisplayArea');

    fileInput.addEventListener('change', function(e) {
      var file = fileInput.files[0];
      var imageType = /image.*/

      if (file.type.match(imageType)) {
        var reader = new FileReader();

        reader.onload = function(e) {
          fileDisplayArea.innerHTML = "";

          var img = new Image();
          img.src = reader.result;
          img.width = 200;
          localStorage.setItem("img", reader.result);
          fileDisplayArea.appendChild(img);
        }
        reader.readAsDataURL(file);

      } 
      else {
        fileDisplayArea.innerHTML = "File not supported!"
      }
    });
    $("#set-avatar").on("click", setAvatar);
} 
function setAvatar(){
  if (localStorage.img){
    users.user[localStorage.loggedIn] = $.extend(users.user[localStorage.loggedIn], {avatar : localStorage.img});
    localStorage.users = JSON.stringify(users);
  }
  location.reload();
}
function showEmail(){
  $("#email").empty();
  if (users.user[localStorage.loggedIn].email.length > 3){
    $("#email").append("<p>"+users.user[localStorage.loggedIn].email+"</p><br><button type='button' class= 'btn btn-default settings' id='change-email'>change</button>")
    $("#change-email").on("click", showChangeEmail);
  }
  else{
    $("#email").append('<p>to retrieve a lost password in future, you can set an email address</p><div class="form-group"><div class="col-md-12"><input name="email" type="text" placeholder="" class="form-control input-md email-settings"></div></div><button type="button" class="set-email">submit</button>')
    $(".email-settings").keyup($.fn.valEmail);
    $(".set-email").on("click", setEmail);
  }
}
function setEmail(){
  var noSubmit = false;
  var email = $(".email-settings").val();
  if ($(".email-settings").valEmail() == false){
    noSubmit = true;
  }
  if (noSubmit == false){
    users.user[localStorage.loggedIn].email = email;
    localStorage.users = JSON.stringify(users);
    showSettings();
  }
}
function showChangeEmail(){
  var oldEmail = $("#email").find("p").html();
  $("#email").find("p").html('<div class="form-group"><div class="col-md-12"><input name="email" type="text" value="'+oldEmail+'" class="email-settings form-control input-md"></div></div><button type="button" class="set-email">submit</button>')
  $(".email-settings").keyup($.fn.valEmail);
  $(".set-email").on("click", setEmail);
}

/**ADMIN**/
function listUsersAdmin(){
  
  $("#admin-all-users").empty();
  $.each( users.user, function( key, value ) {
    $("#admin-all-users").append('<li class="col-xs-4"><div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle"  data-index="'+key+'" data-user="'+ users.user[key].userName +'" data-toggle="dropdown"><span class="caret"></span> ' + users.user[key].userName + '</button></div></li>');
    $("#admin-all-users").find('li:last-child').find('div').append('<ul class="dropdown-menu" role="menu"><li><a href="javascript:void(0);" onclick="$.fn.viewUserAdmin('+key+')">view user data</a></li><li><a href="#" data-toggle="modal" data-target="#send-message-modal">send message</a></li><li><a href="#" data-toggle="modal" data-target="#block-user-modal">block user</a></li><li><a href="#" data-toggle="modal" data-target="#delete-user-modal">delete user</a></li></ul>');
  });
  $('.dropdown-toggle').on("click", $.fn.sendMessageAdmin);
}
$.fn.viewUserAdmin = function(key){
  console.log("called");
  $("#admin-all-users").hide();
  $("#edit-info-form").remove();
  showInfo(users.user[key]);
  $("#users").find("h3").html('<button title="go&nbsp;back" id="back" class="btn btn-default btn-sm icon-three" onclick="leaveView()"><span class="glyphicon glyphicon-arrow-left"></span></button>&nbsp;&nbsp;&nbsp;'+users.user[key].userName+'<button title="edit user" id="edit-user-admin" class="btn btn-default btn-sm icon"><span class="glyphicon glyphicon-pencil"></span></button><button title="list&nbsp;all&nbsp;posts" id="list-all-posts-admin" class="btn btn-default btn-sm icon"><span class="glyphicon glyphicon-list"></span></button><button title="send&nbsp;message" id="send-message-admin" class="btn btn-default btn-sm icon" data-toggle="modal" data-target="#send-message-modal" data-user="'+users.user[key].userName+'" data-index="'+key+'"><span class="glyphicon glyphicon-envelope"></span></button><button title="block&nbsp;user" id="block-user" class="btn btn-default btn-sm icon" data-index="'+key+'"><span class="glyphicon glyphicon-ban-circle"></span></button><button title="delete&nbsp;user" id="delete-user" class="btn btn-default btn-sm icon" data-index="'+key+'"><span class="glyphicon glyphicon-remove"></span></button>');
  localStorage.setItem("viewing", key);
  $('#edit-user-admin').on("click", editUserAdmin);
  $('#list-all-posts-admin').on("click", listAllUserPosts);
  $('#send-message-admin').on("click", $.fn.addMessageDetails);
  $('#block-user').on("click", $.fn.blockUser);
  $('#delete-user').on("click", $.fn.deleteUser);
}
function dismissEdit(){
  $("#edit-info-form").remove();
  $.fn.viewUserAdmin(localStorage.viewing);
}
function editUserAdmin(){
  $("#edit-user-admin").addClass("disabled");
  var thisUser = users.user[localStorage.viewing];
  var infos = $("#users").find(".content").find("div");
  
  $("#users").find(".content").prepend('<form class="form-horizontal" id="edit-info-form"></form>');

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
  $('#edit-confirm-btn').on("click", submitEditedInfoAdmin);
  $('#edit-dismiss-btn').on('click', dismissEdit);
}
function submitEditedInfoAdmin(){
  var thisUser = users.user[localStorage.viewing];
  var userLocation = $('#edit-user-location').val();
  var about = $('#edit-user-about').val();
  var interests = $('#edit-user-interests').val();

  var tempObj =  {
    userLocation : userLocation, 
    about : about, 
    interests : interests
  }

  users.user[localStorage.viewing] = $.extend(users.user[localStorage.viewing], tempObj);
  localStorage.users = JSON.stringify(users); 
  $.fn.viewUserAdmin(localStorage.viewing);
}
function listAllUserPosts(){
  $("#list-all-posts-admin").addClass("disabled");
  $("#user-posts-accordion").remove();
  $("#users").find(".content").append("<hr>");
  $("#users").find(".content").append('<div class="panel-group" id="user-posts-accordion">');
  var thesePosts = [];
  for (var i = 0; i < posts.length; i++){
    if (posts[i].memberId == localStorage.viewing){
       thesePosts.push(posts[i]);
    }
  }

  var realArray = $.makeArray(thesePosts);    
  function sortByTimestamp(a, b){
    return a.timestamp - b.timestamp;
  }
  realArray.reverse();
  for (var j = 0; j < realArray.length; j++){
    $("#user-posts-accordion").append('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">'+ realArray[j].title + '<button type="button" title="delete" class="btn btn-default btn-sm icon-two delete-post" data-toggle="modal" data-target="#delete-post-modal" data-index="'+realArray[j].postId+'"><span class="glyphicon glyphicon-remove"></button><button type="button" title="view&nbsp;post" class="btn btn-default btn-sm icon-two view-post" data-toggle="collapse" data-target="#own-post-'+ realArray[j].postId +'" data-parent="#user-posts-accordion"><span class="glyphicon glyphicon-eye-open"></button></h3></div></div>');
    //$("#user-posts-accordion").append("hrrrm");
    $("#user-posts-accordion").find(".panel-default:last-child").append('<div id="own-post-'+ realArray[j].postId +'" class="panel-collapse collapse post"><div class="panel-body"></div></div>');  
    $("#own-post-"+ realArray[j].postId +"").append('<div class="post-body">' + realArray[j].post + '</div>');
  }
  $('.delete-post').on("click", $.fn.addPostDeleteData);
}
function leaveView(){
  localStorage.viewing = -1;
  loadAdminData();
  location.reload();
}
$.fn.blockUser = function(){
  var i = $(this).data("index");
  if (confirm('do you really want to block ' + users.user[i].userName + ' ?')){
    users.user[i].blocked = true;
    localStorage.users = JSON.stringify(users); 

  }
}
$.fn.deleteUser = function(){
  var i = $(this).data("index");
  if (confirm('Do you really want to delete ' + users.user[i].userName + ' permanently?')){
    users.user[i].deleted = true;
    users.user[i].userName = "";
    localStorage.users = JSON.stringify(users); 
  }
}
function listAllAdmins(){
  $("#all-admins").empty();
  $.each( users.admin, function( key, value ) {
    $("#all-admins").append("<li class='col-xs-4'>"+users.admin[key].adminName+"</li>");
  });
}
function registerAdmin(){
  var name = $("#reg-admin-name").val();
  var password = $("#reg-admin-password").val();

  var noSubmit = false;
  var nameExists = false;
 
  if ($("#reg-admin-name").valName() == false){
    noSubmit = true;
  }
  if ($("#reg-admin-password").valPassword() == false){
    noSubmit = true;
  }
  if ($("#reg-admin-repeat").valRepeat() == false){
    noSubmit = true;
  }
  if (users.admin.length > 0){
    for (var i = 0; i < users.admin.length; i++){
      if (users.admin[i].adminName == name){
        noSubmit = true;
        nameExists = true;
        userNameExists();
      }       
    }
  }
  if (noSubmit == false && nameExists == false){
    var passwordCrypt = sjcl.encrypt("password", password);
    users.admin.push( 
      {
        adminName: name, 
        password : passwordCrypt,
        newAdmin : true
      }
    );
    localStorage.users = JSON.stringify(users); 
  }
  listAllAdmins();
  $('#register-admin-modal').modal('hide');
}
/**HANDLERS - duh! **/

$("#reg-name").keyup($.fn.valName);
$("#reg-password").keyup($.fn.valPassword);
$("#reg-repeat").keyup($.fn.valRepeat);
$("#reg-email").keyup($.fn.valEmail);
$('#register-confirm').on("click", register);

$("#reg-admin-name").keyup($.fn.valName);
$("#reg-admin-password").keyup($.fn.valPassword);
$("#reg-admin-repeat").keyup($.fn.valRepeat);
$("#reg-admin-email").keyup($.fn.valEmail);
$('#register-admin-confirm').on("click", registerAdmin);

$('#log-in-confirm').on("click", login);
$('#log-out-confirm').on("click", logout);
$('#add-info-btn').on("click", addInfoForm);
$('#add-info-confirm').on("click", addInfo);
$('#show-edit-info').on("click", showEditInfo);
$('.back-to-profile-btn').on("click", leaveGroupView);
$('#send-message-from-modal-confirm').on("click", $.fn.setModalMessageData);
$('#send-message-from-list-confirm').on("click", $.fn.setListMessageData);
$('#new-post-confirm').on("click", newPost);
$('#delete-post-confirm').on("click", $.fn.deletePost);
$("#leave-group-confirm").on("click", $.fn.leaveGroup);


