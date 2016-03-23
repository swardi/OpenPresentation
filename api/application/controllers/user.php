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
    	$this->db->where('username','osama');

    	$abc=$this->db->get('user');
    
    	 $abc = $abc->result_array();    // var_dump($query->row());
          $result = array_shift($abc);
    	echo $result['username'];
    	echo $result['email'];
	}
	 
	public function login_post()
	{
		$result=$this->userlogic->login();
		$this->response($result, $result["status"]);
		//echo $result;
	}

public function getSlide_post()
	{
		$result=$this->userlogic->getSlide();
		$this->response($result, $result["status"]);
		//echo $result;
	}
public function saveSlide_post()
	{
		$result=$this->userlogic->saveSlide();
		$this->response($result, $result["status"]);
		//echo $result;
	}

	public function updateSlide_post()
	{
		$result=$this->userlogic->updateSlide();
		$this->response($result, $result["status"]);
		//echo $result;
	}


	public function signUp_post(){
		$result=$this->userlogic->signUp();
		$this->response($result, $result["status"]);


	}

	public function isUserExist_post(){
		$result=$this->userlogic->isUserExist();
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