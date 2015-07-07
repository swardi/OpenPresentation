<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class user_model extends CI_Model {
    

    public function __construct()
    {
        parent::__construct();
        
    }
    function login($login, $password)
    {
     
        $this->db->where("login",$login);
        $this->db->where("password",$password);
            
        $query=$this->db->get("users");

        if($query->num_rows()>0){
                // var_dump($query->row());
            return $query->row();
        }
        return null;
    }

     
    public function getUserById($id)
    {
        $this->db->where("id",$id);
        $query=$this->db->get("users");
        if($query->num_rows()>0){
            // var_dump($query->row());
            return $query->row();
        }
        return null;
    }

    function isUserLoginNameExist($name){

        // print $email;
        if(strlen($name) > 0){
            $this->db->where("login",$name);
        
            $query=$this->db->get("users");
            if($query->num_rows()>0){
                // var_dump($query->row());
                return $query->row();
            }
        }
            // print "isUserExist not";
        
        return null;
    }

   
}
?>