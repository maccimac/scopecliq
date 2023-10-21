http://scopecliq.com

Laravel + React

# Dev Instructions

## Run backend
1. Ensure that XAMPP Apache and PHPMyAdmin are open
2. `cd scopecliq-app`
3. `composer install`
4. `php artisan serve`
5. `php artisan migrate:fresh --seed` 
    or alternatively you can paste `scopecliq-app\master-demo.sql` on your PHPMyAdmin 
6. Open browser at localhost:8000

## Run frontend
1. `cd scopecliq-ui`
2. `npm run start`
6. Open browser at localhost:3000