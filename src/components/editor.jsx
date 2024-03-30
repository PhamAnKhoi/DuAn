import { Editor } from '@tinymce/tinymce-react';
import React from 'react';
const TinyEditor = ({ initialValue, onChange, height }) => {
    // useEffect(() => {
    //     Editor.init({
    //         selector: '#tiny-editor',
    //         plugins: 'advlist autolink lists link image charmap print preview anchor',
    //         toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
    //         height: 300,
    // setup: (editor) => {
    //     editor.on('change', () => {
    //         const content = editor.getContent();
    //         onChange(content);
    //     });
    // },
    //         init_instance_callback: function (editor) {
    //             editor.setContent(initialValue || '');
    //         }
    //     });
    // }, [initialValue, onChange]);

    return (
        <div>
            <Editor
                apiKey='5z0v8wlcxssb07530vl9zk1m5g0hu4e5gdtkr0lxgpq9e3vt'
                init={{
                    selector: 'textarea#content',
                    height: height || 250,
                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat', setup: (editor) => {
                        editor.on('change', () => {
                            const content = editor.getContent();
                            onChange(content);
                        });
                    },
                    init_instance_callback: function (editor) {
                        editor.setContent(initialValue || '');
                    }
                }}
                initialValue=""
            />
        </div>
    );
};

export default TinyEditor;