http://scopecliq.com

Laravel + React

# Dev Instructions

## Run backend
1. Ensure that XAMPP Apache and PHPMyAdmin are open
2. Ensure your `.env` file is up to date with correct database username and password. 
    ex:
    ``` 
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=scopecliq_v1
        DB_USERNAME=root
        DB_PASSWORD=
    ```

3. `cd scopecliq-app`
4. `composer install`
5. `php artisan serve`
6. Run `php artisan migrate --seed` for first time installers
    or run  `php artisan migrate:fresh --seed`
    or import
7. Open browser at localhost:8000

## Run frontend
1. `cd scopecliq-ui`
2. `npm run start`
6. Open browser at localhost:3000