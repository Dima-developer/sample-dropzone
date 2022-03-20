import React, {useState} from 'react';
import UploadDropzone from '../components/UploadDropzone/UploadDropZone';


export default function Index() {
  const [name, setName] = useState('');
  const [file, setFile] = useState('');
  const [atachment, setAttachment] = useState([]);

  const nameHandler = (e) => {
    setName(e.target.value)
  };
  
  const atachmentHandle = (e) => {
    console.log('Attached file: ', e.target.files[0])
    setAttachment(e.target.files[0]);
  }

  console.log('name: ', name);
  console.log('file: ', file);
  console.log('attachment: ', atachment);

  // const encode = (data) => {
  //   // console.log('data: ', data)
  //   const formData = new FormData();
  //   Object.keys(data).forEach((k) => {
  //     formData.append(k, data[k])
  //   });
  //   return formData
  // };
  const encode = (data) => {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&');
  };


  const handleSubmit = e => {
    const data = { "form-name": "sampleform", name, atachment, file }
    console.log('Data: ', data);

    fetch("/", {
      method: "POST",
      // headers: { "Content-Type": 'multipart/form-data; boundary=random' },
      // headers: { "Content-Type": 'multipart/form-data' },
      body: encode(data)
    })
      .then(() => alert("Form Submission Successful!!"))
      .catch(err => alert("Form Submission Failed!", err));

    e.preventDefault();
  };

  return (
    <div>
      <form
        className="formContainer"
        name="sampleform"
        method="POST"
        data-netlify="true"
        // encType="multipart-form/data"
        // encType="multipart/form-data"
        onSubmit={handleSubmit} 
        >
        <input id='name' type="hidden" name="form-name" value="sampleform" />

        <label htmlFor='name'>Name: </label>
        <input type='text' name='name' value={name} onChange={(e) => nameHandler(e)} />

        <input id="file" type="file" name="Atachment" onChange={(e) => atachmentHandle(e)} />

        <UploadDropzone name="file" isDisabled={false} setFile={setFile} />
        
        <button style={{marginTop: '15px'}} type="submit">Submit</button>
     </form>
    </div>
  )
}
