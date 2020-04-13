<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function login(Request $request) 
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $userCredentials = request(["name", "email", "password"]);

        if(!Auth::attempt($userCredentials)) 
        {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $user = $request->user();

        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;

        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => "Bearer",
            // "expires_at" => Carbon::parse(
            //     $tokenResult->token->expires_at
            // )->toDateTimeString()
        ]);
    }

    public function user()
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->access_token()->revoke();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }


}
