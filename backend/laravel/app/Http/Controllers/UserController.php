<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\User;
use Mail;

class UserController extends Controller
{
    private function generateTempLoginCode($request)
    {
        $email = $request->email;
        $user = User::where('email', $email)->first();
        $digits = 3;
        $random_code = rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(100, 999);
        var_dump("random", $random_code);
        $user->password = bcrypt($random_code);
        $user->save();
        
        Mail::send('loginMail', ['random_code' => $random_code], function($message) use ($email) {
            $message->from('grejan.code@gmail.com', 'Login verification');
            $message->to($email)->subject('Login verification');
        });
        return 'simple_user';
    }

    public function register(Request $request)
    {
        $validationRequest = $request->validate([
            'email' => 'required|email|unique:users,email',
        ]);

        $user = new User();
        $user->email = $request->email;
        $user->save();
        $tokenResult = $user->where('email', $request->email)->first()->createToken('Personal Access Token');
        $token = $tokenResult->token;
        $token->save();
        return response()->json($tokenResult->accessToken, 200);
    }

    public function login(Request $request) 
    {
        $req_email = $request->email;
        $current_user = User::where('email', $req_email)->first();
        if(!isset($current_user))
        {
            $response = 'User with this email does not exist.';
            return response()->json($response, 404);
        }
        
        if($current_user->isAdmin)
        {
            $response = 'is_admin';
            return response()->json($response, 200);
        } 
        $response = $this->generateTempLoginCode($request);
        return response()->json($response, 200);
        // $request->validate([
        //     'name' => 'required|string',
        //     'email' => 'required|email',
        //     'password' => 'required',
        // ]);

        // $userCredentials = request(["name", "email", "password"]);

        // if(!Auth::attempt($userCredentials)) 
        // {
        //     return response()->json([
        //         'message' => 'Incorrect credentials. Please try again'
        //     ], 401);
        // }

        // $user = $request->user();

        // $tokenResult = $user->createToken('Personal Access Token');
        // $token = $tokenResult->token;

        // return response()->json([
        //     'access_token' => $tokenResult->accessToken,
        //     'token_type' => "Bearer",
        // ]);
    }

    
    public function loginAdmin(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $userCredentials = request(["name", "email", "password"]);

        if(!Auth::attempt($userCredentials)) 
        {
            return response()->json([
                'message' => 'Incorrect credentials. Please try again.'
            ], 401);
        }

        $user = $request->user();

        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        $token->save();
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => "Bearer",
        ]);
    }
    public function loginUser(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $user = User::where('email', $request->email)->first();
        if(password_verify($request->password, $user->password) == false)
        {
            $message = 'Access code is invalid. Please try again.';
            return response()->json($message, 401);
        } 
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        $token->save();
        $response = [
            'access_token' => $tokenResult->accessToken
        ];
        return response()->json($response, 200);
    }

    public function user()
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

}
