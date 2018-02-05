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
		
		response.push({'descripiton':'Add restaurnats,hotels,parking','url':base_url+'/addsubcategories','parameter':'category_id:5a5472cf295b37083ce56011 category:Virgin Courtyard distance:200 m address:sector 7 type:pasta, green salad'});
		
		response.push({'descripiton':'Sub category list','url':base_url+'/subcatbyid','parameter':'category_id:5a5472cf295b37083ce56011'});
		
		response.push({'descripiton':'Search Sub category list by address','url':base_url+'/subcatbyaddress','parameter':'address:chandigarh'});
		
		response.push({'descripiton':'Add seats','url':base_url+'/seats','parameter':'title:2-4'});
		
		response.push({'descripiton':'Get seats list','url':base_url+'/seatlist'});
		
		response.push({'descripiton':'Delete seats','url':base_url+'/deleteseat','parameter':'id:5a619885f348b010dc39763f'});
                
                response.push({'descripiton':'Sort api','url':base_url+'/sortbydistance','parameter':'param:distance/ /endvalidity/ latitude:34.221 longitude:35.33233 distance:222 date:2018-02-01'});

                response.push({'descripiton':'Search Sub categories by using search form api','url':base_url+'/subcatbysearchvalues','parameter':'address: category:barbeque time: date: seat:'});
		
                response.push({'descripiton':'Stripe payment','url':base_url+'/payment/stripe','parameter':'price:20 token:ch_1Bs4PRCHppIr50QiE84k79q9'});   
                
                response.push({'descripiton':'Stripe payment retrieve','url':base_url+'/payment/stripedataretrieve','parameter':'id:ch_1Bs4PRCHppIr50QiE84k79q9'});


    $scope.base_url = base_url;
    $scope.data=response;
});
        