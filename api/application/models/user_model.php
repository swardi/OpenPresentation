<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class user_model extends CI_Model {
    

    public function __construct()
    {
        parent::__construct();
        
    }
    function getSlide($pre_id){

   $array = array('id' => $pre_id);    
    $this->db->where($array);  
      $query = $this->db->get('slides');
    
     if($query->num_rows()>0){

            return $query->row();
        }
        return null;
    }

    function saveSlide($title,$userid,$elements){
        $array = array('user_id'=> $userid,'presentation'=>$elements);
         $this->db->insert('slides',$array);
         $id = $this->db->insert_id();

         if($id!=null){
            
            return $id;
         }

        return null;
    }

 function updateSlide($pid,$elements){
        $array = array('presentation'=>$elements);
         $this->db->where('id',$pid);
         $this->db->update('slides',$array);
         $id = $pid;

         if($id!=null){
            
            return $id;
         }

        return;
    }

    function login($login, $password)
    {
     
      
       $array = array('username' => $login,'password'=>$password);    
    $this->db->where($array);  
      $query = $this->db->get('user');
    
 
        if($query->num_rows()>0){

            return $query->row();
        }
        return null;


    }

    function signUp($username,$password,$email,$profilePic){

            $array = array('username' => $username,'password'=>$password,'email'=>$email);    
     $this->db->insert('user',$array); 
     $id=$this->db->insert_id();
     
      $this->db->where("id",$id);
        $query=$this->db->get("user");
        if($query->num_rows()>0){

            return $query->row();
        }
        return null;
    }
    

        
       

     
     function getUserById($id)
    {
        $this->db->where("id",$id);
        $query=$this->db->get("user");
        if($query->num_rows()>0){
            // var_dump($query->row());
            return $query->row();
        }
        return null;
    }
    function isUserLoginNameExist($name){


        // print $email;
        if(strlen($name) > 0){
            $this->db->where("username",$name);
        
            $query=$this->db->get("user");
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