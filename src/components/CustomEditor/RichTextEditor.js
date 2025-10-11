// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// const RichTextEditor = () => (
//   <CKEditor
//     editor={ClassicEditor}
//     data="<p>Hello from CKEditor 5!</p>"
//     onChange={(event, editor) => {
//       console.log(editor.getData());
//     }}
//   />
// );

// export default RichTextEditor;
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const RichTextEditor = () => {
  const editorConfiguration = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'fontFamily',
      'fontSize',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'alignment',
      '|',
      'numberedList',
      'bulletedList',
      '|',
      'link',
      'blockQuote',
      'insertTable',
      '|',
      'undo',
      'redo'
    ],
    fontColor: {
      colors: [
        {
          color: 'hsl(0, 0%, 0%)',
          label: 'Black'
        },
        {
          color: 'hsl(0, 0%, 30%)',
          label: 'Dim grey'
        },
        {
          color: 'hsl(0, 0%, 60%)',
          label: 'Grey'
        },
        {
          color: 'hsl(0, 0%, 90%)',
          label: 'Light grey'
        },
        {
          color: 'hsl(0, 75%, 60%)',
          label: 'Red'
        },
        {
          color: 'hsl(30, 75%, 60%)',
          label: 'Orange'
        },
        {
          color: 'hsl(60, 75%, 60%)',
          label: 'Yellow'
        },
        {
          color: 'hsl(120, 75%, 60%)',
          label: 'Green'
        },
        {
          color: 'hsl(240, 75%, 60%)',
          label: 'Blue'
        },
        {
          color: 'hsl(300, 75%, 60%)',
          label: 'Purple'
        }
      ]
    },
    fontBackgroundColor: {
      colors: [
        {
          color: 'hsl(0, 0%, 0%)',
          label: 'Black'
        },
        {
          color: 'hsl(0, 0%, 90%)',
          label: 'Light grey'
        },
        {
          color: 'hsl(60, 75%, 85%)',
          label: 'Light Yellow'
        },
        {
          color: 'hsl(120, 75%, 85%)',
          label: 'Light Green'
        },
        {
          color: 'hsl(240, 75%, 85%)',
          label: 'Light Blue'
        }
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableProperties',
        'tableCellProperties'
      ]
    },
    removePlugins: [
      'Image',
      'ImageToolbar',
      'ImageCaption',
      'ImageStyle',
      'ImageUpload',
      'MediaEmbed',
      'EasyImage',
      'CKFinderUploadAdapter',
      'CKFinder'
    ]
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfiguration}
      data="<p>Hello from CKEditor 5!</p>"
      onChange={(event, editor) => {
        console.log(editor.getData());
      }}
    />
  );
};

export default RichTextEditor;