<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Userlogic {

 private $CI;

    public function __construct()
    {
        $this->CI =& get_instance();
        $this->CI->load->model('user_model');
    }
  
   
    public function getUserById($id)
    {
        $newdata= new stdClass();
        $result=$this->CI->user_model->getUserById($id);
        if(isset($result)){
        $newdata = array(
                'id'       => $result->id,
                'name'     => $result->name,
                'username'     => $result->login,
                'email'    => $result->email,
                'password'    => $result->password,
                'isAdmin'    => $result->isAdmin, 
                'canChangePassword'    => $result->canChangePassword
           );
        }
        return $newdata;
    }

    public function login()
    {
 
        $params = json_decode(file_get_contents('php://input'), TRUE);
 
        $result=null;
        $result= $this->CI->user_model->login($params["username"], $params["password"]);

        if($result != null){
            $this->addUserSession($result);
            return array(
                'status'       => 200,
                'user'     => $result,
            );
        }
        return array(
            'status'       => 404,
            'msg'     => "Invalid username or password.",
       );
    }  

    function addUserSession($result){
        $newdata = array(
            'id'       => $result->id,
            'name'     => $result->name,
            'email'    => $result->email,
            'login'    => $result->login,
            'isAdmin'    => $result->isAdmin
        );
        $this->CI->session->set_userdata($newdata);
    }

  
    public function logout(){
        $newdata = array(
            'user_id'   =>'',
            'user_name'  =>'',
            'user_email'     => '',
            'logged_in' => FALSE
        );
        $this->CI->session->unset_userdata($newdata );
        $this->CI->session->sess_destroy();
    }

     

    public function changePassword($postData){


        // $postData = json_decode(file_get_contents("php://input"));
        $user = $this->isSessionExist();
        if($user != null){

            if(($user->password == md5($postData->oldPassword)) and 
                ($postData->newPassword1 == $postData->newPassword2)){
                // print $user->email;       
                // print $postData->newPassword1; 
                $data=array(
                    'password'=>md5($postData->newPassword1),
                    'email' => $user->email,
                    'passwordChangeDate' =>time(),
                    );
                // $this->db->where("email",$userEmail);
                $this->CI->user_model->changePassword($data);

                print json_encode(array(
                            'status'       => 1,
                            'msg'     => "Password has been updated successfully!",
                       ));
            }
            else{
                print json_encode(array(
                        'status'       => "0",
                        'msg'     => "Password does not match.",
                   ));   
            }
        }
        else{
         print json_encode(array(
                        'status'       => "0",
                        'msg'     => "Not a valid user.",
                   ));   
        }
    }

    function forgotPassword(){

        // $postData = json_decode(file_get_contents("php://input"));
        $userEmail = $_REQUEST["email"];

        // var_dump($postData);
        $user = $this->CI->user_model->isUserExist($userEmail,"");
        // $user = $this->isSessionExist();
        if($user != null){

            // print "2";
            $this->CI->load->model('forgot_password');

            $key = $this->CI->forgot_password->forgotPassword($userEmail);

            $this->CI->load->library("emailhelper");

// print $key;
            $message = "Follow this link to reset your password. \r\n\r\n \
            http://localhost/user/resetPasswordPage/".$key;
            $result = $this->CI->emailhelper->forgot_password_email($userEmail, $message, "gvs");
        }
    }

    public function resetPassword($postData){
        $key = $_REQUEST['key'];

        $this->CI->load->model('forgot_password');
        $forgot_password = $this->CI->forgot_password->isKeyExist($key);
        
        if($forgot_password != null){
            $user = $this->CI->user_model->isUserExist($forgot_password->email,"");
        }
        else{
            return json_encode(array(
                            'status'       => 0,
                            'msg'     => "Invalid request.",
                       ));
        }
        if($user != null){
            
            if($_REQUEST['newPassword1'] == $_REQUEST['newPassword2']){
                // print $user->email;       
                // print $postData->newPassword1; 
                $data=array(
                    'password'=>md5($_REQUEST['newPassword1']),
                    'email' => $user->email,
                    );
                // $this->db->where("email",$userEmail);
                $this->CI->user_model->changePassword($data);
                $this->CI->forgot_password->deleteByEmail($user->email);

                return json_encode(array(
                            'status'       => 1,
                            'msg'     => "Password has been reset successfully!",
                       ));
            }
            else{
                return json_encode(array(
                        'status'       => "0",
                        'msg'     => "Password does not match.",
                   ));   
            }
        }
        else{
         return json_encode(array(
                        'status'       => "0",
                        'msg'     => "Invalid request.",
                   ));   
        }
// */
    }

    
    public function isSessionExist(){
        $userEmail = $this->CI->session->userdata('email');

        $user = $this->CI->user_model->isUserExist($userEmail,"");
        if(strlen($userEmail) > 0 and $user != null){
            return $user;
        }
        return null;
    }

    public function isValidUser(){
        $user = $this->isSessionExist();
        if($user == null){
            show_error("Sign in required.", 401);
        }
    }

    
    public function isUserSignin(){
        $user = $this->isSessionExist();
        if($user !== null){
            return json_encode(array(
                        'status'       => "1",
                        'msg'     => "Session Exists",
                   )); 
        }

        return json_encode(array(
                        'status'       => "0",
                        'msg'     => "Session doesn't exist",
                   )); 
    }
}
 