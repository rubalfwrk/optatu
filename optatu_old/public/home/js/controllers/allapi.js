/**
 * post controller
 * @param {type} param1
 * @param {type} param2
 */
app.controller('allapiCtr', function($scope,$rootScope) {
    
    var response = [];
    
    var base_url = window.location.origin+'/api';
    
        response.push({'descripiton':'User Register Api','url':base_url+'/users/register','parameter':'name:rubal surname:gupta phone:8556863435 email:rubal@gmail.com password:123456 role:user'});
	
        response.push({'descripiton':'Vendor Register Api','url':base_url+'/users/registervendor','parameter':'category:hotels name:neha surname:gupta activityname: location:It park chandigarh postalcode:160101 province: city:chandigarh nation:India telephone:8556863435 email:neha@avainfotech.com companyname:futureworktechnologies vat:10% billingaddress:old grain market muktsar billingprovince: billingcity:muktsar billingnation:india iban: ibanname:gaurav ibansurname: paypalemail:gaurav@gmail.com role:vendor password:123456'});
	
        response.push({'descripiton':'User Login Api','url':base_url+'/users/login','parameter':'email:rubal@gmail.com password:123456'});   

        response.push({'descripiton':'Get User Detail By id','url':base_url+'/users/userdetailbyid','parameter':'id:5a4f73df79d0ce084008bf42'});

        response.push({'descripiton':'Add category','url':base_url+'/categories','parameter':'title:Hotels image:ghwhekkeqjhke ico:hgehwehej'});

        response.push({'descripiton':'Get Categories list','url':base_url+'/categorylist'});

        response.push({'descripiton':'Edit user Api','url':base_url+'/users/edituser','parameter':'id:5a54630fedd8e40a8c20aead name:rubal surname:gupta phone:8556863435 email:rubal@gmail.com password:123456 image:'});

        response.push({'descripiton':'Change Password','url':base_url+'/changePassword','parameter':'email:rubal@gmail.com password:12345678 newpassword:123456'});

        response.push({'descripiton':'Forgot Password','url':base_url+'/forgetpassword','parameter':'email:rubal@gmail.com'});

        response.push({'descripiton':'Add Manager category','url':base_url+'/managercategories','parameter':'title:Mushroom'});

        response.push({'descripiton':'Manager category list','url':base_url+'/managercategorylist'});

        response.push({'descripiton':'Add restaurnats,hotels,parking','url':base_url+'/addsubcategories','parameter':'category_id:5a61bc4adf6f1101acf32337 category:Danio Lungomare address:Via Roma, 23, 17021 Alassio SV, Italy type:Caprese salad,Bruschetta latitude:44.001429 longitude:8.168815 category_name:restaurant seat:2-4,3-5,6-8 start_date:2018-02-01 end_date:2018-05-31 end_time:22.00 menu_type:salad,italian menu_price:200,400 location_type:sea view start_time:10.01'});

        response.push({'descripiton':'Sub category list','url':base_url+'/subcatbyid','parameter':'category_id:5a5472cf295b37083ce56011'});

        response.push({'descripiton':'Search Sub category list by address','url':base_url+'/subcatbyaddress','parameter':'address:chandigarh'});

        response.push({'descripiton':'Add seats','url':base_url+'/seats','parameter':'title:2-4'});

        response.push({'descripiton':'Get seats list','url':base_url+'/seatlist'});

        response.push({'descripiton':'Delete seats','url':base_url+'/deleteseat','parameter':'id:5a619885f348b010dc39763f'});

        response.push({'descripiton':'Sort api','url':base_url+'/sortbydistance','parameter':'res_type:price menu_type: location_type: min_menu_price: max_menu_price: latitude:30.4564 seats:2-4 address: category: time:11.15 param: distance: subcat_date:2018-02-16 longitude:76.6556'});

        response.push({'descripiton':'Search Sub categories by using search form api','url':base_url+'/subcatbysearchvalues','parameter':'address: category:barbeque time: date: seat:'});

        response.push({'descripiton':'Stripe payment','url':base_url+'/payment/stripe','parameter':'price:20 token:ch_1Bs4PRCHppIr50QiE84k79q9'});   

        response.push({'descripiton':'Stripe payment retrieve','url':base_url+'/payment/stripedataretrieve','parameter':'id:ch_1Bs4PRCHppIr50QiE84k79q9'});  
        
        response.push({'descripiton':'Filters','url':base_url+'/subcategory/filters','parameter':'res_type:price menu_type: location_type: min_menu_price: max_menu_price: latitude:30.4564 seats:2-4 address: category: time:11.15 param: distance: subcat_date:2018-02-16 longitude:76.6556'});

        response.push({'descripiton':'My reservations','url':base_url+'/payment/myreservations','parameter':'userid:5a6723dd7d1e5e63ac1e2a75'});
        
        response.push({'descripiton':'Add stripe payment data','url':base_url+'/payment/reservations','parameter':'transactionid:ch_1Bs4PRCHppIr50QiE84k79q9 price:100 subcategoryid:5a7be28fdf6fd611e01b3b01 category:Sail Inn category_name:Restaurant date_time:2018-02-14 05:00:01 userid:5a6723dd7d1e5e63ac1e2a75 paymentmethod:stripe image:https://s3.us-east-2.amazonaws.com/optatu/At4MIWatq7GmWIc6.jpg'});
           
        response.push({'descripiton':'Search by name','url':base_url+'/subcatbynames','parameter':'id:5a7b12c9f36d283d3de76653 seats: time: date: location_type: min_menu_price: menu_type: res_type:'});

    $scope.base_url = base_url;
    $scope.data=response;
});
        