<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class User extends REST_Controller{
	public function __construct()
	{
		parent::__construct();
		$this->load->library("userlogic");
        $this->load->helper('url');		
	}
	public function index()
	{
		 
	}

    public function test_get(){
    	echo "If you can see this page, you can start adding your own methods in this controller";
	}
	 
	public function login_post()
	{
		$result=$this->userlogic->login();
		$this->response($result, $result["status"]);
	}

	public function logout()
	{
		$result=$this->userlogic->logout();

	}

	public function getUserById($id){
		$this->userlogic->isValidUser();
		$user =$this->userlogic->getUserById($id);
		print json_encode($user);
	}
 
}
?>