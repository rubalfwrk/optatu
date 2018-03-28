
var subcategoriesModule = angular.module('fwrk.subcategories', []);

subcategoriesModule.service('Subcategory', function($http) {
    return {
        all: function() {
            return $http.get('/api/subcategory/categorylist').then(function(postList) {
                return postList.data;
            });
        },
         alls: function(subcat) {
                console.log(subcat);
            return $http({
                method: 'post',
                url: '/api/subcategorylist',
                data: subcat
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        add: function(newPost) {
            return $http({
                method: 'post',
                url: '/api/subcategories',
                data: newPost
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        addsubcategory: function(newPost) {
            return $http({
                method: 'post',
                url: '/api/add_subcategories_admin',
                data: newPost
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        remove: function(newPost) {
            return $http({
                method: 'post',
                url: '/api/subcategory/delete',
                data: newPost
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        update: function(newPost) {
            return $http({
                method: 'post',
                url: '/api/subcategory/editparmal',
                data: newPost
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
         sigledata: function(parmal) {
            console.log(parmal)
            console.log('simer')
            return $http({
                method: 'post',
                url: '/api/videos/moviebysubcatid',
                data: parmal
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
         singledatasub: function(parmal) {
            return $http({
                method: 'post',
                url: '/api/subcategory/subcategorybyid',
                data: parmal
            }).then(function(res) {
                // return the new post
                console.log(res);
                return res.data;
                
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        uploadimage: function(image) {
            
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", image);
           // console.log(fd);
            return $http({
                method: 'post',
                url: '/api/uploadimage',
                data: fd,
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
    
        findall: function(parmal) {
            console.log(parmal);
            return $http({
                method: 'post',
                url: '/api/subcatbyid',
                data: parmal
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        }
    };
});