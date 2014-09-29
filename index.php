<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Privacy Book</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
      <!-- Custom styles for this template -->
    <link href='http://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' type='text/css'>
    <link href="css/my.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

  </head>
  <body>
      
  <div class="navbar navbar-default navbar-fixed-top" data-menu-offset="-100" role="navigation">
   
    <div class="container logged-in"> <!--.logged-in -->
      <div class="navbar-header"></div>
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
         <span class="sr-only">Toggle navigation</span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
       </button>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav profile-nav">
          <li class="active"><a  href="#home">Profile</a>
           </li>
           <li><a href="#info">Personal Info</a>
           </li>
           <li><a href="#groups">Groups</a>
           </li>
           <li><a href="#messages">Messages</a>
           </li>
           </li>
           <li><a href="#settings">Settings</a>
           </li>
         </ul>
         <ul class="logged-in nav pull-right">
          <li>
           <button class="btn btn-default btn-sm btn-logout" data-toggle="modal" data-target="#log-out-modal">
            Log Out
          </button>
          </li>
         </ul>
          
      </div><!--/.nav-collapse -->
    
    </div><!--/.logged-out -->
    <div class="container logged-out"> <!--.logged-in -->
      <div class="navbar-header"></div>
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
         <span class="sr-only">Toggle navigation</span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
       </button>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li class="active"><a href="#start">Home</a>
           </li>
           <li><a href="#about">About</a>
           </li>
           <li><a href="#public">Public</a>
           </li>           
         </ul>
         <ul class="logged-out nav pull-right">
          <li>
            <div class="btn-group btn-group-sm">
              <button type="button" class="btn btn-default btn-login" data-toggle="modal" data-target="#log-in-modal">
                Log In
              </button>
              <button type="button" class="btn btn-default btn-register" data-toggle="modal" data-target="#register-modal">
                Register
              </button>
            </div>
          </li>
         </ul>
          
      </div><!--/.nav-collapse -->
    </div><!--/.logged-out -->  
  </div>

<!-- ROW / COLUMN BULLSHIT -->
<div class="logged-in"><!-- LOGGED IN -->
  <div class="row"><!-- ROW -->
    <div class="container">
      <div class="layer col-md-12"><!-- COLUMN-LEFT -->
        
        <div id="home" class="page" data-menu-offset="-100">
          <div class="well well-lg" data-0="background: rgba(0,0,0,0.25);" data-100="background: rgba(0,0,0,0);" >
            <h2 data-0="opacity:1" data-100="opacity: 0">Profile Page</h2>
         </div>
        </div> 
       
      </div><!-- / COLUMN-LEFT -->
      
    </div><!-- /.container -->
  </div><!-- /.row -->

  <div class="row"><!-- ROW -->
    <div class="container">
      
      <div class="layer col-md-8"><!-- COLUMN-LEFT -->
          <div id="info" class="page" data-menu-offset="-100">
            <div class="well well-sm">
              <h3>Personal Info
                <button title="add&nbsp;personal&nbsp;info" id="add-info-btn" class="btn btn-default btn-sm icon" data-toggle="modal" data-target="#add-info-modal"><span class="glyphicon glyphicon-plus"></span></button>
                <button id="show-edit-info" title="edit personal info" class="btn btn-default btn-sm icon"><span class="glyphicon glyphicon-pencil"></span></button>
              </h3>
            </div>     
            <div class="content">

            </div>
          </div>
      </div><!-- / COLUMN-LEFT -->
      
      <div class="layer col-md-4"><!-- COLUMN-RIGHT -->
        <div id="public-users" class="page" data-menu-offset="-100">
          <div class="well well-sm">
            <h3>Public Users</h3>
          </div>
          <div class="content">
           <ul id="public-user-list">
             
           </ul>
          </div>
        </div>

      </div><!-- /COLUMN-RIGHT -->  
    </div><!-- /.container -->
  </div><!-- /.row -->

  <div class="row"><!-- ROW -->
    <div class="container">
      
      <div class="layer col-md-8"><!-- COLUMN-LEFT -->
        <div id="groups" class="page" data-menu-offset="-100">
          <div class="well well-sm">
            <h3>Your Groups</h3>
          </div>
          <div class="content">
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
          </div>
        </div>
      </div><!-- / COLUMN-LEFT -->

      <div class="layer col-md-4 page"><!-- COLUMN-RIGHT -->
        
        <div id="group-users" data-menu-offset="-100">
          <div class="well well-sm">
            <h3>Public Groups</h3>
          </div>
          <div class="content">
            <br><br><br><br><br><br><br><br><br><br>
          </div>
        </div>

      </div><!-- /COLUMN-RIGHT -->  
    </div><!-- /.container -->
  </div><!-- /.row -->

  <div class="row"><!-- ROW -->
    <div class="container">
      <div class="layer col-md-12"><!-- COLUMN-LEFT -->
  
        <div id="messages" class="page" data-menu-offset="-100">
          <div class="well well-sm">
            <h3>Messages</h3>
          </div>
          <div class="content">
            <div class="row"><!-- ROW -->
              <div class="col-md-6"><!-- COLUMN-LEFT -->
                <div class="panel-group" id="accordion">
            
                </div>

              </div><!-- / COLUMN-LEFT -->
              
              <div class="message-form col-md-6"><!-- COLUMN-RIGHT -->
                <div class="collapse" id="send-message-from-list">
                    
                  <form class="form-horizontal">
                    <fieldset>
                    <legend id="legendary"></legend>

                      <div class="form-group">
                        
                          <div class="input-group message-input">
                            <textarea id="message-in-list" name="message" class="form-control"></textarea>
                              <button id="send-message-from-list-confirm" type="button" class="btn btn-sm form-control">
                                Send
                              </button>
                          </div>
                      </div>

                    </fieldset>
                  </form>
              
                </div><!-- / collapse -->
              </div><!-- / COLUMN-RIGHT -->
            
            </div><!-- /.row -->
          </div>
        </div>
      </div><!-- / COLUMN-LEFT -->
    </div><!-- /.container -->
  </div><!-- /.row -->

   <div class="row"><!-- ROW -->
    <div class="container">
       <div class="layer col-md-12"><!-- COLUMN-LEFT -->

        <div id="settings" class="page" data-menu-offset="-100">
            <div class="well well-sm">
              <h3>Settings</h3>
            </div>
            <div class="content"></div>
        </div>
        
        <div class="page" data-menu-offset="-100">
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        </div>
      
      </div><!-- / COLUMN-LEFT -->
    </div><!-- /.container -->
  </div><!-- /.row -->
</div><!-- /#logged-in-->




<!-- // ROW COLUMN BULLSHIT -->



  <div id="bg1" data-0="background-position:0px 0px;" data-end="background-position: 0px -800px;"></div>
  <!--  <div id="bg2" data-0="background-position:0px 0px;" data-end="background-position: 0px -1000px;"></div>-->
    <div id="bg3" data-0="background-position:0px 0px; background-color:rgb(104, 214, 255)" data-end="background-position: 0px -1000px; background-color:rgb(0, 78, 89);"></div>

  <div class="navbar navbar-default navbar-fixed-bottom" data-menu-offset="-100" role="navigation">
    <div class="container">
      <div id="progress" data-0="width:0%;" data-end="width:100%;" data-menu-offset="-100"></div>
    </div>
  </div>


 <!-- Modal LOGIN-->
  <div class="modal fade" id="log-in-modal" tabindex="-1" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="log-in-label">
                Log In
            </h4>
         </div>
         <div class="modal-body">
            <form class="form-horizontal">
              <fieldset>
              <!-- Text input-->
              <div class="form-group">
                <label class="col-md-4 control-label" for="textinput">Username</label>  
                <div class="col-md-4">
                <input id="user-name" name="textinput" type="text" class="form-control input-md">
                  
                </div>
              </div>

              <!-- Password input-->
              <div class="form-group">
                <label class="col-md-4 control-label" for="passwordinput">Password</label>
                <div class="col-md-4">
                  <input id="user-password" name="user-password" type="password" class="form-control input-md">
                  <span class="help-block">forgot password?</span>
                </div>
              </div>

              </fieldset>
            </form>
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-default" 
               data-dismiss="modal">Close
            </button>
            <button id="log-in-confirm" type="button" class="btn btn-primary">
               Log In
            </button>
         </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal -->  
   </div>

 

 <!-- Modal REGISTER-->
  <div class="modal fade" id="register-modal" tabindex="0" role="dialog" aria-labelledby="registerModal" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="register-label">
                Register
            </h4>
         </div>
         <div class="modal-body">
        
        <form class="form-horizontal">
        <fieldset>
    
          <!-- Prepended text-->
          <div class="form-group">
            <label class="col-md-4 control-label" for="reg-name"></label>
            <div class="col-md-6">
              <div class="input-group">
                <span class="input-group-addon">nickname</span>
                <input id="reg-name" name="reg-name" class="form-control" placeholder="" type="text" required="">
              </div>
              <p class="help-block">why using a nickname / alias ?</p>
            </div>
          </div>

          <!-- Prepended text-->
          <div class="form-group">
            <label class="col-md-4 control-label" for="reg-password"></label>
            <div class="col-md-6">
              <div class="input-group">
                <span class="input-group-addon">password</span>
                <input id="reg-password" type="password" name="reg-password" class="form-control" placeholder="" required="">
              </div>
              <p class="help-block">how to choose a secure password ?</p>
            </div>
          </div>

          <!-- Prepended text-->
          <div class="form-group">
            <label class="col-md-4 control-label" for="reg-repeat">repeat</label>
            <div class="col-md-6">
              <div class="input-group">
                <span class="input-group-addon">password</span>
                <input id="reg-repeat" type="password" name="reg-password-repeat" class="form-control" placeholder="" required="">
              </div>
              
            </div>
          </div>

          <!-- Prepended text-->
          <div class="form-group">
            <label class="col-md-4 control-label" for="reg-email">(optional)</label>
            <div class="col-md-6">
              <div class="input-group">
                <span class="input-group-addon">email</span>
                <input id="reg-email" name="reg-email" class="form-control" placeholder="" type="text">
              </div>
              <p class="help-block">what is the email used for?</p>
            </div>
          </div>

          </fieldset>
          </form>

         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-default" 
               data-dismiss="modal">Close
            </button>
            <button id="register-confirm" type="button" class="btn btn-primary">
               Register
            </button>
         </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal -->
  </div>

  <!-- Modal LOGOUT-->
  <div class="modal fade" id="log-out-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="log-out-label">
                Do you really want to log out?
            </h4>
         </div>
         <div class="modal-body">
            Then see you next time :)
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-default" 
               data-dismiss="modal">Nope
            </button>
            <button id="log-out-confirm" type="button" class="btn btn-primary">
               Yes
            </button>
         </div>
      </div><!-- /.modal-content -->
</div><!-- /.modal -->
</div>

 <!-- Modal ADD INFO-->

  <div class="modal fade" id="add-info-modal" tabindex="0" role="dialog" aria-labelledby="addInfoModal" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="register-label">
              Add some Info about yourself
            </h4>
         </div>
         <div class="modal-body">

          <form id="add-info-form" class="form-horizontal" enctype="multipart/form-data">
          <fieldset>

     
     
          </fieldset>
          </form>
          </div>
       
          <div class="modal-footer">
            <button type="button" class="btn btn-default" 
               data-dismiss="modal">Dismiss
            </button>
            <button id="add-info-confirm" type="button" class="btn btn-primary">
                Add
            </button>
         </div>
      </div>

      <!-- /.modal-content -->
    </div><!-- /.modal -->
  </div>

 <div class="modal fade" id="send-message-modal" tabindex="0" role="dialog" aria-labelledby="sendMessageModal" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="send-message-label">
              
            </h4>
         </div>
         <div class="modal-body">

          <form class="form-horizontal" enctype="multipart/form-data">
          <fieldset>

          <div class="form-group">
            <div class="col-md-8">
              <div class="input-group">
                <textarea id="message-in-modal" name="message" class="form-control"></textarea>
              </div>
            </div>
          </div>

     
     
          </fieldset>
          </form>
          </div>
       
          <div class="modal-footer">
            <button type="button" class="btn btn-default" 
               data-dismiss="modal">Dismiss
            </button>
            <button id="send-message-from-modal-confirm" type="button" class="btn btn-primary">
                Send
            </button>
         </div>
      </div>

      <!-- /.modal-content -->
    </div><!-- /.modal -->
  </div>


  <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/underscore.js"></script>
    
    <script src="js/style.js"></script>
    <script src="js/sjcl.js"></script>
    <script src="js/data.js"></script>
    <script src="js/functionality.js"></script>
    
    <script src="js/skrollr.js"></script>
    <script src="js/skrollr-menu.js"></script>
    <script src="js/skrollrinit.js"></script>
  </body>
</html>