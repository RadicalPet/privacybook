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
  if (parseInt(localStorage.loggedIn) > -1 && (parseInt(localStorage.groupView) < 0)){
    $(".logged-in").show();
    $(".logged-out").hide();
    $(".group-view").hide();
    $("#bg1, #bg2, #bg3").css("background", "url(img/underwater4.png)repeat 0 0");
    _.throttle(loadProfileData(), 100);
  }
  else if (parseInt(localStorage.groupView) > -1){
    $(".logged-in").hide();
    $(".logged-out").hide();
    $(".group-view").show();
    $("#bg1, #bg2, #bg3").css("background", "url(img/rainbow.png)repeat 0 0");
    _.throttle(loadGroupData(), 100);
  }
  else{
    $(".logged-in").hide();
    $(".logged-out").show();
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

/**DISPLAY STUFF**/

function loadProfileData(){

  var i = parseInt(localStorage.getItem("loggedIn"));
  var userName = users.user[i].userName;
  $("#home").find("h2").html(userName);
  showUsers();
  showInfo();
  listMessages();
  showUserGroups();
  showPublicGroups();
}
function loadGroupData(){
  var i = parseInt(localStorage.getItem("groupView"));
  var groupName = groups[i].groupName;
  $("#group").find("h2").html(groupName);
  listPosts();
  showMembers();
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
  $('#edit-dismiss-btn').on('click', showInfo);
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

/**TAGS TAGS TAGS**/

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
  var senderId = localStorage.loggedIn;
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
  localStorage.users = JSON.stringify(users); 
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
function joinGroup(){

}
function showPublicGroups(){
  for (var i = 0; i < groups.length; i++){
    $("#public-group-list").append('<li><div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle"  data-index="'+ i +'" data-user="'+ groups[i].groupName +'" data-toggle="dropdown"><span class="caret"></span> ' + groups[i].groupName + '</button></div></li>');
    $("#public-group-list").find('li:last-child').find('div').append('<ul class="dropdown-menu" role="menu"><li><a href="#" data-toggle="modal" data-target="profile-modal">join&nbsp;group</a></li></ul>');
  }

}
function showUserGroups(){
  $("#group-list").empty();
  for (var i = 0; i < groups.length; i++){
    for (var j = 0; j < groups[i].members.length; j++){
      if (groups[i].members[j] == localStorage.loggedIn){
        $("#group-list").append('<h3 class="group-item">'+ groups[i].groupName + '<button type="button" title="leave&nbsp;group" class="leave-group-btn btn btn-default btn-sm icon-two"><span class="glyphicon glyphicon-remove"></span></button><button type="button" title="view&nbsp;group" class="btn view-group-btn btn-default btn-sm icon-two" data-index="'+i+'"><span class="glyphicon glyphicon-eye-open"></h3>');       
        
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

/**HANDLERS - duh! **/

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
$('.back-to-profile-btn').on("click", leaveGroupView);
$('#send-message-from-modal-confirm').on("click", $.fn.setModalMessageData);
$('#send-message-from-list-confirm').on("click", $.fn.setListMessageData);
$('#new-post-confirm').on("click", newPost);
