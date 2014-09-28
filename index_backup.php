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
   <div class="container"> 
    <div class="navbar-header"></div>
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li class="active"><a  href="#home">Profile</a>
          </li>
          <li><a href="#info">Personal Info</a>
          </li>
          <li><a href="#groups">Groups</a>
          </li>
          </li>
          <li><a href="#settings">Settings</a>
          </li>
        </ul>

        <ul class="nav pull-right">
         <li>
          <button class="btn btn-default btn-sm btn-logout" data-toggle="modal" data-target="#myModal">
            Log Out
          </button>
          </li>
        </ul>
        
      </div><!--/.nav-collapse -->
    </div>
  </div>



<div class="row">
  <div class="container">

   
  
    <div id="layer" class="col-md-8">
      <div id="home" class="page" data-menu-offset="-100">
        <div class="well well-lg" data-0="background-color:rgb(0, 108, 124); opacity:1;" data-100="background-color:rgb(250,250,250); opacity: 0;" >
          <h2 data-0="opacity:1" data-100="opacity: 0">Profile Page</h2>
       </div>
      </div>
      <div id="info" class="page" data-menu-offset="-100">
        <div class="well well-sm">
          <h3>Personal Info</h3>
        </div>
        <div class="content">
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        </div>
      </div>
      <div id="groups" class="page" data-menu-offset="-100">
        <div class="well well-sm">
          <h3>Groups</h3>
        </div>
        <div class="content">
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        </div>
      </div>
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
     
    </div>
    
    <div id="uhm" class="col-md-4 page">
      <div class="well well-lg users" data-0="opacity:1;" data-100="opacity: 0;" >
        <h2 data-0="opacity:1" data-100="opacity: 0">Users</h2>
      </div>

    <div id="public" class="page" data-menu-offset="-100">
      <div class="well well-sm">
        <h3>Public Users</h3>
      </div>
        <div class="content">
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        </div>
      </div>
    </div>
     </div>

  </div><!-- /.container -->

   

  </div>
</div>
    <div id="bg1" data-0="background-position:0px 0px;" data-end="background-position: 0px -800px;"></div>
  <!--  <div id="bg2" data-0="background-position:0px 0px;" data-end="background-position: 0px -1000px;"></div>-->
    <div id="bg3" data-0="background-position:0px 0px; background-color:rgb(104, 214, 255)" data-end="background-position: 0px -1000px; background-color:rgb(0, 78, 89);"></div>

  <div class="navbar navbar-default navbar-fixed-bottom" data-menu-offset="-100" role="navigation">
    <div class="container">
      <div id="progress" data-0="width:0%;" data-end="width:100%;" data-menu-offset="-100"></div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" 
               data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="myModalLabel">
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
            <button type="button" class="btn btn-primary">
               Yes
            </button>
         </div>
      </div><!-- /.modal-content -->
</div><!-- /.modal -->

  <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/underscore.js"></script>
    <script src="js/skrollr.js"></script>
    <script src="js/skrollr-menu.js"></script>
    <script src="js/skrollrinit.js"></script>
    <script src="js/my.js"></script>
  </body>
</html>