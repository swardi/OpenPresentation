<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class upload_logic {

 private $CI;

    public function __construct()
    {
        $this->CI =& get_instance();
        $this->CI->load->model('upload_model');
    }
  
   
   
}
 