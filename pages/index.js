import React, {useState} from 'react';
import UploadDropzone from '../components/UploadDropzone/UploadDropZone';


export default function Index() {
  const [name, setName] = useState('');
  const [file, setFile] = useState({});

  const nameHandler = (e) => {
    setName(e.target.value)
  }

  console.log('name: ', name);
  console.log('file: ', file);

  const encode = (data) => {
    console.log('data: ', data)
    const formData = new FormData();
    Object.keys(data).forEach((k)=>{
      formData.append(k,data[k])
    });
    return formData
  }
  const handleSubmit = e => {
    const data = { "form-name": "sampleForm", name, file }
    
    fetch("/", {
      method: "POST",
      // headers: { "Content-Type": 'multipart/form-data; boundary=random' },
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
        name="sampleForm"
        method="POST"
        action="/thank-you/"
        // data-netlify="true"
        onSubmit={handleSubmit} 
      >
        {/* <input id='name' type="hidden" name="form-name" value="sampleForm" /> */}

        <input type='text' name='Name' onChange={(e) => nameHandler(e)} />
        <label htmlFor='name'>Name: </label>

        <UploadDropzone isDisabled={false} setFile={setFile} />
        
        <button style={{marginTop: '15px'}} type="submit" >Submit</button>
     </form>
    </div>
  )
}
