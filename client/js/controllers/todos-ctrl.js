angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
	        $scope.doneList = [];
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
			        console.log(' { status : success, function : $scope.createTodo } '); 
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

	        $scope.snooze = function(id) {

		    console.log($scope.formData[id]);
		    $scope.formData[id] = "snooze";
		    console.log($scope.formData[id]);
		    var index = $scope.doneList.indexOf({id:id});
                    $scope.doneList.splice(index,1);
		    $scope.completed = $scope.doneList.length;
		    if($scope.completed === 0) {
			$scope.doneList = [];
			$scope.checked = false;
		    }

		};

	        $scope.doneTodo = function(id) {

		    if($scope.formData[id]) {
			
			var matches = $scope.doneList.filter( function(todo) {
			    return todo.id === id
			});
			if(!matches.length) {
			    $scope.doneList.push({
				id: id
			    });
			}
		    } else {
			var index = $scope.doneList.indexOf({id:id});
			$scope.doneList.splice(index,1);
		    }

		    if($scope.doneList.length > 0) {

			$scope.checked = true;

		    } else {

			$scope.checked = false;

		    }

		console.log($scope.doneList);
		$scope.completed = $scope.doneList.length;
		};

	        $scope.deleteTodo = function() {
		    
		    if($scope.formData !== undefined) {
			console.log( '{ status : success, function : $scope.deleteTodo }');
			$scope.loading = true;

			Todos.delete($scope.doneList)

			.success(function(data) {
			    $scope.loading = false;
			    $scope.doneList = [];
			    $scope.checked = false;
			    $scope.formData = {};
			    $scope.todos = data;
			});
		    }
		};

	}]);
