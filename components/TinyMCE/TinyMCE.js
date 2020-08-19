import React, { Component } from 'react';
import { Editor } from "@tinymce/tinymce-react";

class TinyMCE extends Component {
    render() {
        const defaultToolbar = 'bold italic  underline | blocks | mathjax | formatselect | undo redo | image '
        const defaultHeight = 200
        const { content, handleChange, toolbar ,height} = this.props;
        console.log("TinyMCE Content Value : ",content)
        return (
            <Editor  
                init={{     
                    height: height || defaultHeight,               
                    oninit: "setPlainText",                    
                    paste_data_images: true,
                    plugins:["paste","image"],
                    image_advtab: true,
                    images_upload_url: 'upload.js',
                    images_upload_credentials: true,
                    file_picker_callback: 
                    function(callback, value, meta) {                        
                        if (meta.filetype == 'image') {
                            console.log("test");
                          $('#upload').trigger('click');
                          $('#upload').on('change', function() {
                            var file = this.files[0];
                            var reader = new FileReader();
                            reader.onload = function(e) {
                              callback(e.target.result, {
                                alt: ''
                              });
                            };
                            reader.readAsDataURL(file);
                          });
                        }
                    }, 
                    images_upload_base_path: '/static/images',                  
                    paste_as_text: true,
                    external_plugins: {
                        mathjax: "/js/tinymce-plugin/mathjax/plugin.min.js",
                    },
                    menubar: false,
                    toolbar: toolbar || defaultToolbar,
                    // paste_enable_default_filters: false,
                    // paste_webkit_styles: "black 15px",
                    // paste_merge_formats: false,
                    mathjax: {
                        lib:
                            "https://cdn.jsdelivr.net/npm/mathjax@3.0.5/es5/tex-mml-chtml.js", //required path to mathjax                        
                        configUrl: "/js/tinymce-plugin/mathjax/config.js", //optional: mathjax config js
                    },
                }}
                value={content}
                onEditorChange={handleChange}
            />
        );
    }
}
export default TinyMCE;