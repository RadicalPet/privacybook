var users;
var tagList = ["nothing","something", "other stuff", "bullshit", "more garbage", "fuck that shit"
];

localStorage.setItem("tagList", JSON.stringify(tagList));

if(localStorage.users){
  users = JSON.parse(localStorage.users);
}
else{

  users = {"user": [
    { "userName" : "Sarah", 
      "email" : "sahara.braun@gmail.com", 
      "password" : "{\"iv\":\"J60o8sqG8sV1vmmm0otnGA\",\"v\":1,\"iter\":1000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"0CARliu/g7Y\",\"ct\":\"gaNMaWzPAZZ/nHn9rtSTOFOWONM\"}"
    },
    {
      "userName": "Holly", 
      "email" : "ominousomnivore@googlemail.com", 
      "password" : "{\"iv\":\"J60o8sqG8sV1vmmm0otnGA\",\"v\":1,\"iter\":1000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"0CARliu/g7Y\",\"ct\":\"gaNMaWzPAZZ/nHn9rtSTOFOWONM\"}"
    }
  ]};

  localStorage.setItem("users", JSON.stringify(users));
}
