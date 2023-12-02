<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{

    public function register(Request $request)
    {
        // Implement your custom registration logic here.
        // Create a new user, validate input, and save to the database.

        $this->validate($request, [
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = new User;
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Registration successful', 
            'user_id' => $user->id
        ]);
    }

    public function validateRegistration(Request $request){
        $validatedData = $this->validate($request, [
            // 'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        return response()->json(['message' => 'Validation successful', 'data' => $validatedData, 'status' => 'success']);
    }

    public function login(Request $request)
    {
        // Implement your custom authentication logic here.
        // Check the user's credentials, generate a token, or return a JSON response.

        if (auth()->attempt(['email' => $request->input('email'), 'password' => $request->input('password')])) {
            // Authentication successful
            $user = auth()->user();
            return response()->json([
                'message' => 'Login successful',
                'status'=>'success',
                'user_id' => $user->id
            ]);
        } else {
            // Authentication failed
            return response()->json([
                'message' => 'Login failed',
                'status' => 'error'
            ], 401); // You can adjust the status code as needed.
        }
    }
   
}
