
var adminApp = angular.module('fwrk.admin', [ 
	'ui.router',
	'btford.markdown',
	'fwrk.pages',
        'fwrk.categories',
	'fwrk.users',
        'fwrk.subcategories',
        'fwrk.payments',
	'angularTrix'
	
	]).config(function($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise('/');
		
		$stateProvider
				
		.state('addHospitals', {
			url: '/addHospitals',
			templateUrl: '/admin/templates/addHospitals.html',
			controller: 'AddHospitalCtrl'
		})
		.state('pageslist', {
			url: '/pageslist',
			templateUrl: '/admin/templates/pageslist.html',
			controller: 'pageslistCtrl'
		})
		.state('editPage', {
			url: '/editPage/:paraml',
			templateUrl: '/admin/templates/editPage.html',
			controller: 'editPageCtrl'
		})
		
		.state('addUser', {
			url: '/addUser',
			templateUrl: '/admin/templates/addUser.html',
			controller: 'AddUserCtrl'
		})
		.state('userList', {
			url: '/userList',
			templateUrl: '/admin/templates/userList.html',
			resolve: {
				userList: function(Users){
					return Users.all().then(function(data){
						return data;
					});
				}
			},
			controller: 'userListCtrl'
		})
                .state('categoryList', {
			url: '/categoryList',
			templateUrl: '/admin/templates/categoryList.html',
                        controller: 'categoryListCtrl'
		})
                 .state('editCategory', {
			url: '/editCategory/:id',
			templateUrl: '/admin/templates/editCategory.html',
			controller: 'editCategoryCtrl'
		})
                .state('addCategory', {
			url: '/addCategory',
			templateUrl: '/admin/templates/addCategory.html',
                        controller: 'addCategoryCtrl'
		})
                .state('addSubcategory', {
			url: '/addSubcategory',
			templateUrl: '/admin/templates/addSubcategory.html',
			controller: 'addSubcategoryCtrl'
		})
                .state('editSubcategory', {
			url: '/editSubcategory/:id',
			templateUrl: '/admin/templates/editSubcategory.html',
			controller: 'editSubcategoryCtrl'
		})
                .state('subcategoryList', {
			url: '/subcategoryList',
			templateUrl: '/admin/templates/subcategoryList.html',
			controller: 'subcategoryListCtrl'
		})
                 .state('paymentList', {
			url: '/paymentList',
			templateUrl: '/admin/templates/paymentList.html',
			controller: 'paymentCtrl'  
		})
		.state('profile', {
			url: '/profile',
			templateUrl: '/admin/templates/profileUser.html',
			controller: 'profileCtrl'
		})
		.state('forgot', {  
			url: '/forgot',
			templateUrl: '/admin/templates/forgot.html',
			controller: 'AddPageCtrl'  
		})
		.state('dashboard', {
			url: '/',
			templateUrl: '/admin/templates/admin_index.html',
			controller: 'dashboardCtrl'
		}) 
		.state('editUser', {
			url: '/editUser/:id',
			templateUrl: '/admin/templates/editUser.html',
			controller: 'EditUsersCtrl'
		});
		
		
	}).directive('fileModel', ['$parse', function ($parse) { 
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;
				var isMultiple = attrs.multiple;
				if(isMultiple){
					element.bind('change', function () {
						var values = [];
						angular.forEach(element[0].files, function (item) {
							var value = {
                                                                        // File Name 
                                                                        name: item.name,
                                                                        //File Size 
                                                                        size: item.size,
                                                                        //File URL to view 
                                                                        url: URL.createObjectURL(item),
                                                                        // File Input Value 
                                                                        _file: item
                                                                        };
                                                                        values.push(value);
									});
						scope.$apply(function () {
							if (isMultiple) {
								modelSetter(scope, values);
							} else {
								modelSetter(scope, values[0]);
							}
						});
					});
				}else{
					element.bind('change', function(){
						scope.$apply(function(){
							modelSetter(scope, element[0].files[0]);
						});
					});
				}

			}
		};
	}]);  