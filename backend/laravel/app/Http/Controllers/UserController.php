<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\User;
use App\Account;
use Mail;
use Carbon\Carbon;

class UserController extends Controller
{
    private function generateTempLoginCode($request)
    {
        $email = $request->email;
        $user = User::where('email', $email)->first();
        $digits = 3;
        $random_code = rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(100, 999);
        $user->password = bcrypt($random_code);
        $user->save();
        
        Mail::send('loginMail', ['random_code' => $random_code], function($message) use ($email) {
            $message->from('grejan.code@gmail.com', 'Login verification');
            $message->to($email)->subject('Login verification');
        });
        $response = [
            'type' => 'simple_user',
            'user' => $user
        ];
        return $response;
    }

    private function register($request)
    {
        $validationRequest = $request->validate([
            'email' => 'required|email|unique:users,email',
        ]);
        $user = new User();
        $user->email = $request->email;
        $user->save();
        // $new_account = Account::create(['user_id' => $user->id,'name' => 'default']);
        // $user->current_account = $new_account->id;
        // $user->save();
        $tokenResult = $user->where('email', $request->email)->first()->createToken('Personal Access Token');
        $token = $tokenResult->token;
        $token->save();
        $response = [
            'user' => $user,
            'token' => $token
        ];
        return $response;
    }

    public function login(Request $request) 
    {
        $validationRequest = $request->validate([
            'email' => 'required|email',
        ]);
        $req_email = $request->email;
        $current_user = User::where('email', $req_email)->first();
        if(!isset($current_user))
        {
            $response = $this->register($request);
            return response()->json($response, 200);
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
            'token' => $tokenResult->accessToken,
            'user' => $user,
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
        if (Carbon::parse($user->updated_at)->addMinutes(5)->isPast()) {
            $user->password = NULL;
            $user->save();
            $message = 'Access code has expired. Please try again.';
            return response()->json($message, 405);
        }
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        $token->save();
        $response = [
            'token' => $tokenResult->accessToken,
            'user' => $user
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
