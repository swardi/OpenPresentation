<?php
require APPPATH . '/libraries/REST_Controller.php'; 

class Upload extends REST_Controller { 
    function __construct()
    {
        parent::__construct();
        $this->load->helper(array('form', 'url')); 
        $this->load->library("upload_logic"); 

    }

    public function index()
    {
        $this->load->view('upload_form', array('error' => ' ' ));
    }

    public function upload_post()
    {
        if ( !empty( $_FILES ) ) {
            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
            $uploadPath = dirname( __FILE__ ) . '/' . $_FILES[ 'file' ][ 'name' ];
            move_uploaded_file( $tempPath, $uploadPath );
            $answer = array( 'answer' => 'File transfer completed' );
            $json = json_encode( $answer );
           echo $json;
        } else {
            echo 'No files';
        }
    }

    public function test_get(){
        echo "If you can see this page, you can start adding your own methods in this controller";
    }
  
}
?>