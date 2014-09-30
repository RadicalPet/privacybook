var users;
var posts = [];

var tagList = ["nothing","something", "other stuff", "bullshit", "more garbage", "fuck that shit"
];
localStorage.setItem("tagList", JSON.stringify(tagList));

var groups = [
  {
    groupName : "public",
    members : [1, 3],
    tags : [0, 4],
    admin : [4]
  },
  {
    groupName : "whatever",
    members : [2, 4],
    tags : [3, 5],
    admin : [3]
  },
  {
    groupName : "one more group",
    members : [0, 1, 2, 4],
    tags : [3, 5, 1, 2],
    admin : [1]
  }
]
localStorage.setItem("groups", JSON.stringify(groups));



if(localStorage.users){
  users = JSON.parse(localStorage.users);
}
else{

  users = {
    "user": [
      { "userName" : "Sarah", 
        "email" : "sahara.braun@gmail.com", 
        "password" : "{\"iv\":\"J60o8sqG8sV1vmmm0otnGA\",\"v\":1,\"iter\":1000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"0CARliu/g7Y\",\"ct\":\"gaNMaWzPAZZ/nHn9rtSTOFOWONM\"}"
      },
      {
        "userName": "Holly", 
        "email" : "ominousomnivore@googlemail.com", 
        "password" : "{\"iv\":\"J60o8sqG8sV1vmmm0otnGA\",\"v\":1,\"iter\":1000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"0CARliu/g7Y\",\"ct\":\"gaNMaWzPAZZ/nHn9rtSTOFOWONM\"}"
      }
    ],
    "admin":[
      {
        "adminName" : "Admin",
        "password" : "{\"iv\":\"yyWA4e/OTfFypGtXL7DmWQ\",\"v\":1,\"iter\":1000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"KI1omqmb5YI\",\"ct\":\"dpPfpOk7kj1Ouko+HPwM8Iz70IU\"}"
      }
    ]
  };

  localStorage.setItem("users", JSON.stringify(users));
}

if (localStorage.posts){
  posts = JSON.parse(localStorage.posts);
}