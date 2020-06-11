import React, { Component } from 'react';
import { Editor } from "@tinymce/tinymce-react";

class TinyMCE extends Component {
    render() {
        const defaultToolbar = 'bold italic  underline | blocks | mathjax | formatselect '
        const { content, handleChange, toolbar } = this.props;

        return (
            <Editor
                init={{
                    oninit: "setPlainText",
                    plugins: "paste",
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