<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class CustomUserController extends Controller
{
    public function login(Request $request)
    {
        // Implement your custom authentication logic here.
        // Check the user's credentials, generate a token, or return a JSON response.

        if (auth()->attempt(['email' => $request->input('email'), 'password' => $request->input('password')])) {
            // Authentication successful
            return response()->json([
                'message' => 'Login successful',
            ]);
        } else {
            // Authentication failed
            return response()->json(['message' => 'Login failed'], 401); // You can adjust the status code as needed.
        }
    }

    public function register(Request $request)
    {
        // Implement your custom registration logic here.
        // Create a new user, validate input, and save to the database.

        $this->validate($request, [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = new User;
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));
        $user->save();

        return response()->json(['message' => 'Registration successful', 'user_id' => $user->id]);
    }
}