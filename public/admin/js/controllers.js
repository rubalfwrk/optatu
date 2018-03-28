adminApp.controller('AllPostsCtrl', function($scope, postList,$interval,Posts,$timeout) {
  $scope.posts = postList;
  $scope.activePost = false;
  $scope.setActive = function(post) {
    $scope.activePost = post;
  }
$timeout(function() {
    $('#example1').DataTable();
    $('#example2').DataTable({
      'paging': true,
      'lengthChange': false,
      'searching': false,
      'ordering': true,
      'info': true,
      'autoWidth': false
    })
  }, 0.500);    

  $scope.deletepost = function(id) {
    $scope.data={};
    $scope.data.id=id;
    $('.'+id).css('display','none');
        // console.log($scope.data);
        Posts.remove($scope.data).then(function(res) {
           // console.log(res);
           if (res) {                
            $scope.del = res.message;
              } else {
                $scope.del = "error";
              }
            });
        }
    }).controller('Adminlogin', function($scope,Users) {        

      $scope.user ={};
      $scope.admin_login = function (){  

        if(this.user.password==''){

          $scope.loginerror="Password Required"; 
          return;
        }
        Users.adminlogin(this.user).then(function(res) {  
          if (res) {   
            if(res.success==true){
                    //$scope.loginerror= res.message; 
                    if(res.userinfo.role =='admin'){ 
                      $scope.loginerror="";
                      $scope.loginsuccess=res.message;
                      window.location.href='/admin/dashboard'; 	

                    }else{

                      $scope.loginerror= 'You are not admin!';  
                      console.log('You are not admin!');
                    }

                  }
                  else{
                    $scope.loginerror=res.message; 
                  } 

                } else { 
                  $scope.loginerror=res.message;  
                }
              });  

      }

    });  
    
    adminApp.controller('categoryListCtrl', function($scope,Category,$timeout,$window) {
     Category.all().then(function(res) {
        $scope.category = res.data;
        //console.log($scope.category);
    })
    
//     $scope.activeUser = false;
//      $scope.setActive = function(subcat) {
//        $scope.activeUser = subcat;
//        $scope.hideShow = false;
//      }
//      $scope.hideShow = true;
//      $scope.listShow = function(value){
//        if(value == true){
//          $scope.hideShow = false;
//        }else{
//          $scope.hideShow = true;
//        }
//      }  
      $timeout(function() {
        $('#category_list').DataTable({
          'paging': true,
          'lengthChange': false,
          'searching': false,
          'ordering': true,
          'info': true,
          'autoWidth': false
        })
      }, 0.500);
      
     ////delete category
    
    $scope.delete_cat = function(id) {
        if ($window.confirm("Are you sure you want to delete ?")) {     
        $scope.data={};
        $scope.data.id=id;
        $('.'+id).css('display','none');
        // console.log($scope.data);
        Category.remove($scope.data).then(function(res) {
          console.log(res);
          if (res) {
            $scope.del = res.message;
                //window.location.reload();
              } else {
                $scope.del = "error";
              }
            });
            
      }else{
          return false;
      }    
            
      } 
      
      
      
      
    });
    
   adminApp.controller('addCategoryCtrl', function($scope,Category) {
    
    $scope.fileNameChangedicon = function(input) {
        $scope.loadingicon = true;
        Category.uploadimageiocn(input.files[0]).then(function(res) {
        $scope.loadingicon = false;
            if(res){ $scope.imgshowicon = res[0].location; }
        });
    }
    $scope.fileNameChanged = function(input) {
        $scope.loading = true;
        Category.uploadimage(input.files[0]).then(function(res) {
        $scope.loading = false;
            if(res){ $scope.imgshow = res[0].location; }
        });
    }
    
    // add  category
    
    $scope.addCategory = function() {
        var category = {
            category: this.post.category,
            image :$scope.imgshow,
            icon : $scope.imgshowicon
        }
        console.log(category);
        //return false;
        Category.addcategory(category).then(function(res) {
            if (res) {
                $scope.update = res.message;
                alert("category added");
                window.location.href = '/admin/dashboard#/categoryList';
            } else {
                $scope.update = "error";
            }
        });
    }; 
    
    
    }); 
    
     adminApp.controller('editCategoryCtrl', function($scope,Category ,$stateParams) {
      
     $scope.cate = {};
     $scope.params = {};
     $scope.params.id = $stateParams.id;
     console.log($scope.params);
   Category.singledatacat($scope.params).then(function(res) {
    if (res == null) {
      window.location.href = '/404';
    } else {
      console.log(res);
      $scope.cate.category = res.subcatlist.category;
      $scope.cate.image = res.subcatlist.image;
      $scope.cate.icon  = res.subcatlist.icon;
      $scope.cate.id = res.subcatlist._id;
      console.log($scope.cate);
    }
  });
  
  $scope.fileNameChangedicon = function(input) {
        $scope.loadingicon = true;
        Category.uploadimageiocn(input.files[0]).then(function(res) {
        $scope.loadingicon = false;
            if(res){ $scope.cate.icon = res[0].location; }
        });
    }
    $scope.fileNameChanged = function(input) {
        $scope.loading = true;
        Category.uploadimage(input.files[0]).then(function(res) {
        $scope.loading = false;
            if(res){ $scope.cate.image = res[0].location; }
        });
    }
  
  
   $scope.editCategory = function() {
    $scope.newCate = {};
    $scope.newCate.category = this.cate.category;
    $scope.newCate.image = this.cate.image;
    $scope.newCate.icon = this.cate.icon;
    $scope.newCate.id = this.cate.id;
    console.log($scope.newCate);
    Category.update($scope.newCate).then(function(res) {
      if (res) {
        $scope.update = res.message;
        window.location.href = '/admin/dashboard#/categoryList';
      } else {
        $scope.update = "error";
      }
          });
  }
})
    
    
    
    adminApp.controller('AddUserCtrl', function($scope,Users) {

        $scope.message=false;
        $scope.addUser=function(){
        if(this.user.password!=this.user.cpassword){
          $scope.message="Incorrect confirm password";
          return;
        }
        Users.add(this.user).then(function(res) {

        if (res.error==0) {
          $scope.message="User registered successfully.";
          console.log(res);
        } else {
          $scope.message=res.message;
          console.log(res);
        }
        });  
        
        }    

    });
    adminApp.controller('dashboardCtrl', function($scope) {

    });
    adminApp.controller('profileCtrl', function($scope) {

    });

    adminApp.controller('userListCtrl', function($scope, $interval,Users,userList,$timeout,$window) {
        $scope.users = userList;
        $scope.activeUser = false;
        $scope.setActive = function(user) {
          console.log(user);
          $scope.activeUser = user;
          $scope.hideShow = false;
        }
        $scope.hideShow = true;
        $scope.listShow = function(value){
          if(value == true){
            $scope.hideShow = false;
          }else{
            $scope.hideShow = true;
          }
        }  
        $timeout(function() {
            $('#example1').DataTable();
            $('#example2').DataTable({
              'paging': true,
              'lengthChange': false,
              'searching': false,
              'ordering': true,
              'info': true,
              'autoWidth': false
            })
        }, 0.500);

        $scope.deleteUser = function(id) {
          
        if ($window.confirm("Are you sure you want to delete ?")) {     
        $scope.data={};
        $scope.data.id=id;
        $('.'+id).css('display','none');
        // console.log($scope.data);
        Users.remove($scope.data).then(function(res) {
          console.log(res);
          if (res) {
            $scope.del = res.message;
                //window.location.reload();
              } else {
                $scope.del = "error";
              }
            });
            
      }else{
          return false;
      }    
            
      }
    });




    /******************************Hospitals list*****************************************/

    adminApp.controller('hospitalListCtrl', function($scope, $interval,Hospitals,hospitalList,$timeout, $window) {

      $scope.hospitals = hospitalList;
      $scope.activeHospital = false;
      $scope.setActive = function(hospital) {
        console.log("get hospital id..");
        console.log(hospital);
        $scope.activeHospital = hospital;
        var img = hospital.image;
        if(img){
        console.log(img);
        var im = img.replace(/,\s*$/, "");
        $scope.galleryimgs = im.split(',');
          
        }
        else{
          $scope.galleryimgs="";
        }
        $scope.hideShow = false;
      }
      $scope.hideShow = true;
      $scope.listShow = function(value){
        if(value == true){
          $scope.hideShow = false;
        }else{
          $scope.hideShow = true;
        }
      }  
      $timeout(function() {
        $('#example1').DataTable();
        $('#example2').DataTable({
          'paging': true,
          'lengthChange': false,
          'searching': false,
          'ordering': true,
          'info': true,
          'autoWidth': false
        })
      }, 0.500);

      $scope.deleteHospital = function(id) {
          
        if ($window.confirm("Are you sure you want to delete ?")) {  
            
              $scope.data={};
        $scope.data.id=id;
        $('.'+id).css('display','none');
        // console.log($scope.data);
        Hospitals.remove($scope.data).then(function(res) {
          console.log(res);
          if (res) {
            $scope.del = res.message;
                //window.location.reload();
              } else {
                $scope.del = "error";
              }
            });   

        } else {

             return false 
         }

      }
      
    });




    /***************************add hospital*****************************/

    adminApp.controller('AddHospitalCtrl', function($scope, Hospitals,$rootScope) {

      console.log("AddHospitalCtrl in admin js controller..");	
      $scope.userlist = {};
      Hospitals.getusers().then(function(res) {
        console.log(res);
        if (res == null) {
          $scope.userlist = "";
        } else {
          $scope.userlist = res;
        }
      }); 


      $scope.addHospital = function(hospitalData) { 

        Hospitals.add(hospitalData).then(function(res) {             
          if (res.status === true) {
            var file = angular.element(document.querySelector('#banner_image')).prop("files")[0];
            $scope.files = [];
            $scope.files.push(file);
            Hospitals.onFileSelect($scope.files, res.data._id, 'add').then(function(response) {
            if (response) {

            var filesgallery = angular.element(document.querySelector('#gallery_image')).prop("files");
            console.log(filesgallery);
            $scope.filesg = [];
            $scope.filesg.push(filesgallery);

            console.log('multipletttt');
            //return false;
            console.log($scope.filesg);
            //return false;
            if($scope.filesg[0].length != 0){

                    Hospitals.onFileSelectgallery($scope.filesg, res.data._id, 'add').then(function(resp) {
                            if (resp) {
                                    $scope.message=res.message;
                                    window.location.href='/admin/dashboard#/hospitalList';
                            } else {
                                    $scope.message="error";
                            }
                    });
            }else{
                    $scope.message=res.message;
                    window.location.href='/admin/dashboard#/hospitalList';
            }		
            } else {
             $scope.message="error";
        }
        });

          } else {
            $scope.message=res.message;
          }
        });           
      };
    });

    adminApp.controller('EditHospitalCtrl', function($scope, Hospitals, $stateParams) {
     $scope.userlist = {};
     Hospitals.getusers().then(function(res) {
      console.log(res);
      if (res == null) {
        $scope.userlist = "";
      } else {
        $scope.userlist = res;
      }
    });
     $scope.hospital = {};
     $scope.hospital.id = $stateParams.id;

     Hospitals.sigledata($scope.hospital).then(function(res) {
      
       if (res == null) {
        window.location.href = '/404';
      } else {
       console.log(res);
       $scope.hospital.title = res.title;
       $scope.hospital.description = res.description;
       $scope.hospital.address = res.address;
       $scope.hospital.bannerimage = res.bannerimage;
       $scope.hospital.user_id = res.user_id;
       var img = res.image;
       var im = img.replace(/,\s*$/, "");
       $scope.galleryimgs = im.split(',');


     }
   });
     $scope.editHospital = function() {
      $scope.update=false;
      $scope.newHospital = {};
      $scope.newHospital.title = this.hospital.title;
      $scope.newHospital.description = this.hospital.description;
      $scope.newHospital.address = this.hospital.address;	
      $scope.newHospital.user_id = this.hospital.user_id;	
      $scope.newHospital.id = this.hospital.id;

      console.log(this.hospital);

    Hospitals.update($scope.newHospital).then(function(res) {
    console.log(res);
    if (res) {
    var file = angular.element(document.querySelector('#banner_image')).prop("files")[0];
    if (file == null){
      $scope.message=res.message;
    }else{
     $scope.files = [];
     $scope.files.push(file);
     Hospitals.onFileSelect($scope.files, res.data, 'update').then(function(response) {
       if (response) {

        var files = angular.element(document.querySelector('.banner_image')).prop("files");
        console.log(files);
        $scope.filesg = [];
        $scope.filesg.push(files);
        console.log('multiple');
        console.log($scope.filesg[0]);
        if($scope.filesg[0].length != 0){

          Hospitals.onFileSelectgallery($scope.filesg, res.data, 'update').then(function(resp) {
           if (resp) {
            $scope.message=res.message;
          } else {
            $scope.message='Error';
          }
        });

        }else{
          $scope.message=res.message;
        }
        } else {
          $scope.message='Error';
        }
          });
         }
        } else {
        $scope.update = "error";
      }
            // console.log(res);
          });
}
})


    adminApp.controller('EditUsersCtrl', function($scope, Users, $stateParams) {
     $scope.user = {};
     $scope.params = {};
     $scope.params.id = $stateParams.id;
   // console.log( $scope.params.path);
   Users.sigledata($scope.params).then(function(res) {
    if (res == null) {
      window.location.href = '/404';
    } else {
      console.log(res);
      $scope.user = res;
      $scope.user.firstname = res.firstname;
      $scope.user.lastname = res.lastname;
      $scope.user.role = res.role;
      if(res.status){
        $scope.user.status = res.status;
      }else{
        $scope.user.status = 0;
      }
      $scope.user.email = res.email;
      $scope.user.dob = new Date(res.dob);
      $scope.user.id = res._id;
      console.log($scope.user);
    }
  });
   $scope.editUser = function() {

    $scope.update=false;
     if(this.user.role == '2'){
         $scope.update = "Please select role"; 
         return false; 
     }
    
    $scope.newUser = {};
    $scope.newUser.username = this.user.username; 
    $scope.newUser.status = this.user.status;
    if(this.user.role =='Doctor' || this.user.role =='Nurse' || this.user.role =='Helper' || this.user.role =='1'){
       $scope.newUser.role = this.user.role;  
    }  
    
    $scope.newUser.id = this.user.id;
 
    Users.update($scope.newUser).then(function(res) {
      console.log(res);
      if (res) {
        $scope.update = res;
      } else {
        $scope.update = "error";
      }
            // console.log(res);
          });
  }
})


//page list ctrl

adminApp.controller('pageslistCtrl', function($scope,Pages,$rootScope,$sce,$stateParams) {
  $("#mydiv").hide(); 

  Pages.alllist().then(function(res) {



   $scope.pages = res.data;
   console.log($scope.pages);

   $(document).ready(function() {
     $('#example1').DataTable();
   } );

 });
  $scope.setActive = function(post) {
    $scope.active = true;

    $scope.activePost = post;
    
  }

})

adminApp.controller('editPageCtrl', function($scope,Pages,$rootScope,$sce,$stateParams) {
 $scope.data = {};
 $scope.newdata = {};
 $scope.data.id = $stateParams.paraml;
 Pages.singledata($scope.data).then(function(data){

   $scope.post = data.data;
 });
 $scope.editpage = function(){
   $scope.newdata.id = $scope.data.id;
   $scope.newdata.title = this.post.title;
   $scope.newdata.description = this.post.description;

   Pages.editdata($scope.newdata).then(function(data){

    alert(data.message);
    window.location.href = '/admin/dashboard#/pageslist'; 
  });

 }
})


adminApp.controller('subcategoryListCtrl', function($scope,Subcategory,Category,$timeout,$window,Payments) {
    
 
    
    
    
    Subcategory.all().then(function(res) {
        $scope.subcategory = res.data;
    })
    
     $scope.activeUser = false;
      $scope.setActive = function(subcat) {
        $scope.activeUser = subcat;
        $scope.hideShow = false;
      }
      $scope.hideShow = true;
      $scope.listShow = function(value){
        if(value == true){
          $scope.hideShow = false;
        }else{
          $scope.hideShow = true;
        }
      }  
      $timeout(function() {
        $('#subcategory').DataTable({
          'paging': true,
          'lengthChange': false,
          'searching': false,
          'ordering': true,
          'info': true,
          'autoWidth': false
        })
      }, 0.500);
      
      
      ////delete sub category
    
    $scope.deletesub_cat = function(id) {
        if ($window.confirm("Are you sure you want to delete ?")) {     
        $scope.data={};
        $scope.data.id=id;
        $('.'+id).css('display','none');
        // console.log($scope.data);
        Subcategory.remove($scope.data).then(function(res) {
          console.log(res);
          if (res) {
            $scope.del = res.message;
                //window.location.reload();
              } else {
                $scope.del = "error";
              }
            });
            
      }else{
          return false;
      }    
            
      }
    
    

});


adminApp.controller('addSubcategoryCtrl', function($scope,Subcategory,Category) {
    
    
    Category.all().then(function(res) {
        $scope.subcategory = res.data;
    })
    
    $scope.fileNameChanged = function(input) {
        $scope.loading = true;
        Subcategory.uploadimage(input.files[0]).then(function(res) {
        $scope.loading = false;
            if(res){ $scope.imgshow = res[0].location; }
        });
    }
    
    // add sub category
    
    $scope.addSubCategory = function() {
      var category_data =  JSON.parse(this.post.category);
        var sub_category = {
            category_id : category_data._id,
            category : category_data.category,
            category_name: this.post.subcategory,
            location_type : this.post.type,
            address :this.post.address,
            //loc : this.post.location,
            city : this.post.city,
            start_date: this.post.sdate,
            end_date : this.post.edate,
            start_time :this.post.stime,
            end_time : this.post.etime,
            image :$scope.imgshow
        }
        console.log(sub_category);
        Subcategory.addsubcategory(sub_category).then(function(res) {
            if (res) {
                $scope.update = res.message;
                alert("sub category added");
            } else {
                $scope.update = "error";
            }
        });
    }; 
    
    
    });
    
     adminApp.controller('editSubcategoryCtrl', function($scope,Subcategory,Category ,$stateParams) {
      
         Category.all().then(function(res) {
        $scope.subcategory = res.data;
    })   
         
         
     $scope.subcat = {};
     $scope.params = {};
     $scope.params.id = $stateParams.id;
   Subcategory.singledatasub($scope.params).then(function(res) {
    if (res == null) {
      window.location.href = '/404';
    } else {
      console.log(res);
      $scope.subcat.category_id = res.subcatlist.category_id;
      $scope.subcat.category = res.subcatlist.category;
      $scope.subcat.category_name = res.subcatlist.category_name;
      $scope.subcat.location_type = res.subcatlist.location_type;
      $scope.subcat.address = res.subcatlist.address;
      $scope.subcat.city = res.subcatlist.city;
      $scope.subcat.start_date = new Date(res.subcatlist.start_date);
      $scope.subcat.end_date = new Date(res.subcatlist.end_date);
      $scope.subcat.start_time = res.subcatlist.start_time;
      $scope.subcat.end_time = res.subcatlist.end_time;
      $scope.subcat.image = res.subcatlist.image;
      $scope.subcat.id = res.subcatlist._id;
      console.log($scope.subcat);
    }
  });
  
  $scope.fileNameChanged = function(input) {
        $scope.loading = true;
        Subcategory.uploadimage(input.files[0]).then(function(res) {
        $scope.loading = false;
            if(res){ $scope.subcat.imgshow = res[0].location; }
        });
    }
  
   
  
   $scope.editSubCategory = function() {
    $scope.newSubCate = {};
    $scope.newSubCate.category_id = this.subcat.category_id;
    $scope.newSubCate.category = this.subcat.category;
    $scope.newSubCate.category_name = this.subcat.category_name;
    $scope.newSubCate.location_type = this.subcat.location_type;
    $scope.newSubCate.address = this.subcat.address;
    $scope.newSubCate.city = this.subcat.city;
    $scope.newSubCate.start_date = this.subcat.start_date;
    $scope.newSubCate.end_date = this.subcat.end_date;
    $scope.newSubCate.start_time = this.subcat.start_time;
    $scope.newSubCate.end_time = this.subcat.end_time;
    $scope.newSubCate.image = this.subcat.image;
    $scope.newSubCate.id = this.subcat.id;
    Subcategory.update($scope.newSubCate).then(function(res) {
      if (res) {
        $scope.update = res.message;
        window.location.href = '/admin/dashboard#/subcategoryList';
      } else {
        $scope.update = "error";
      }
          });
  }
  


});



adminApp.controller('paymentCtrl', function($scope,$timeout,$window,Payments) {
      
     Payments.all().then(function(res) {
        $scope.payment = res.data;
        console.log('rubu');
    })
    
    

});